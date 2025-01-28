import React from 'react';
import './AnalysisSection.css';
import questions from '../utils/questions'; // Ajuste o caminho conforme sua estrutura

function AnalysisSection({ data, comments }) {
  // Ordem desejada para exibição das opções
  const responseOrder = ['Excelente', 'Boa', 'Regular', 'Ruim', 'Muito Ruim'];

  // 1) Calcula índices (porcentagem) de satisfação e insatisfação
  const calculateIndex = (options, positiveKeys, negativeKeys) => {
    const totalResponses = Object.values(options).reduce((sum, val) => sum + val, 0);
    if (totalResponses === 0) {
      return { positive: 0, negative: 0 };
    }
    const positiveResponses = positiveKeys.reduce((sum, key) => sum + (options[key] || 0), 0);
    const negativeResponses = negativeKeys.reduce((sum, key) => sum + (options[key] || 0), 0);

    return {
      positive: ((positiveResponses / totalResponses) * 100).toFixed(2),
      negative: ((negativeResponses / totalResponses) * 100).toFixed(2),
    };
  };

  // 2) Calcula índices de comentários (positivos, neutros, negativos)
  const calculateCommentIndex = (questionId) => {
    const filteredComments = comments.filter(
      (c) => String(c.questionId) === String(questionId)
    );
    const totalComments = filteredComments.length;

    if (totalComments === 0) {
      return { positive: 0, neutral: 0, negative: 0 };
    }

    const positive = filteredComments.filter((c) => c.classification === 'POSITIVE').length;
    const neutral = filteredComments.filter((c) => c.classification === 'NEUTRAL').length;
    const negative = filteredComments.filter((c) => c.classification === 'NEGATIVE').length;

    return {
      positive: ((positive / totalComments) * 100).toFixed(2),
      neutral: ((neutral / totalComments) * 100).toFixed(2),
      negative: ((negative / totalComments) * 100).toFixed(2),
    };
  };

  // 3) Define quais chaves contam como "positivas" e quais contam como "negativas"
  //    Caso precise de outras lógicas específicas para perguntas diferentes.
  const getResponseKeys = (questionId) => {
    switch (questionId) {
      case 8: // Exemplo para "3.2 - Você sente que a equipe do CEU..."
        return {
          positiveKeys: ['Sempre', 'Na maioria das vezes'],
          negativeKeys: ['Às vezes', 'Raramente', 'Nunca'],
        };
      default:
        // Aqui consideramos 'Regular' e 'Parcialmente' como "negativo" para fins de cálculo.
        // Se quiser tratá-los como "neutros", seria preciso alterar a lógica.
        return {
          positiveKeys: ['Excelente', 'Boa', 'Sim'],
          negativeKeys: ['Ruim', 'Muito Ruim', 'Não', 'Regular', 'Parcialmente']
        };
    }
  };

  // 4) Agrupa as respostas por seção, ignorando APENAS a pergunta de id=1
  const analyzeSections = () => {
    const results = {};

    questions.forEach((question) => {
      // Ignora apenas se for id=1
      if (question.id === 1) return;

      // Busca o objeto de respostas em 'data' com questionId igual
      const response = data.find(
        (item) => parseInt(item.questionId) === parseInt(question.id)
      );

      // Se não encontrou, não exibe. (Se quiser exibir perguntas sem resposta,
      // crie um response vazio, ex.: { options: {} })
      if (!response) return;

      // Cria/pega a "seção" no objeto results
      const section = question.section;
      if (!results[section]) {
        results[section] = { details: [] };
      }

      const { positiveKeys, negativeKeys } = getResponseKeys(question.id);
      const indices = calculateIndex(response.options, positiveKeys, negativeKeys);
      const commentIndices = calculateCommentIndex(question.id);

      // Some perguntas podem estar na seção "5. Sugestões e Melhorias"
      // e, se preferir, podemos não calcular satisfaction para elas, como no exemplo original.
      const satisfaction =
        section !== '5. Sugestões e Melhorias' ? indices : null;

      results[section].details.push({
        question: question.question,
        responses: response.options,
        satisfaction,
        comments: commentIndices,
        interpretation: question.interpretation || null, // exibe interpretação
      });
    });

    return results;
  };

  // 5) Executa a análise e obtém objeto final
  const analysis = analyzeSections();

  // Função auxiliar para ordenar as opções conforme a sequência desejada
  const sortResponses = (responses) => {
    return responseOrder
      .filter(option => responses.hasOwnProperty(option)) // Garante que a opção exista nas respostas
      .map(option => [option, responses[option]]);
  };

  // 6) Renderização do componente
  return (
    <div className="analysis-container">
      <h2 className="section-title">Análise por Seções</h2>
      <p>
        A seguir, apresenta-se a análise detalhada das respostas obtidas em diferentes seções da pesquisa.
      </p>

      {Object.entries(analysis).map(([section, values], index) => (
        <div key={index}>
          <h3 className="section-title">{section}</h3>
          {values.details.map((detail, idx) => {
            // Ordena as respostas conforme a sequência desejada
            const orderedResponses = sortResponses(detail.responses);
            const totalResponses = orderedResponses.reduce((a, b) => a + b[1], 0);
            return (
              <div key={idx} className="question-block">
                <p className="question-title">{detail.question}</p>

                {/* Lista de opções e contagens ordenadas */}
                <ul className="response-list">
                  {orderedResponses.map(([option, count], i) => {
                    const percentage = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
                    return (
                      <li key={i}>
                        {option}: <strong>{count}</strong>
                        <div className="response-bar">
                          <div
                            className={`response-bar-inner ${option
                              .toLowerCase()
                              .replace(/\s/g, '-')}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Índice de satisfação/insatisfação */}
                {detail.satisfaction && (
                  <p>
                    Índice de Satisfação:{' '}
                    <span
                      className="index-value"
                      style={{
                        color:
                          detail.satisfaction.positive > 70
                            ? '#28a745'
                            : detail.satisfaction.positive > 50
                            ? '#ffc107'
                            : '#dc3545',
                      }}
                    >
                      {detail.satisfaction.positive}%
                    </span>{' '}
                    | Insatisfação:{' '}
                    <span
                      className="index-value"
                      style={{
                        color: detail.satisfaction.negative > 50 ? '#dc3545' : '#ffc107',
                      }}
                    >
                      {detail.satisfaction.negative}%
                    </span>
                  </p>
                )}

                {/* Índices de comentários (positivos, neutros, negativos) */}
                <p className="comment-index">
                  Comentários —{' '}
                  <span className="positive">Positivos: {detail.comments.positive}%</span> |{' '}
                  <span className="neutral">Neutros: {detail.comments.neutral}%</span> |{' '}
                  <span className="negative">Negativos: {detail.comments.negative}%</span>
                </p>

                {/* Interpretação, se existir */}
                {detail.interpretation && (
                  <p className="interpretation-text">{detail.interpretation}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default AnalysisSection;
