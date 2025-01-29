import React from 'react';
import './AnalysisSection.css';
import questions from '../utils/questions';

function AnalysisSection({ data, comments }) {
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

  // 2) Calcula índices de comentários (sugestões, elogios, reclamações, solicitações)
  const calculateCommentIndex = (questionId) => {
    const filteredComments = comments.filter(
      (c) => String(c.questionId) === String(questionId)
    );
    const totalComments = filteredComments.length;

    if (totalComments === 0) {
      return {
        sugestoes: 0,
        elogios: 0,
        reclamacoes: 0,
        solicitacoes: 0
      };
    }

    const sugestoesCount = filteredComments.filter(
      (c) => c.classification === 'sugestões de melhoria'
    ).length;

    const elogiosCount = filteredComments.filter(
      (c) => c.classification === 'elogios'
    ).length;

    const reclamacoesCount = filteredComments.filter(
      (c) => c.classification === 'reclamações'
    ).length;

    const solicitacoesCount = filteredComments.filter(
      (c) => c.classification === 'solicitações de serviços ou infraestrutura'
    ).length;

    return {
      sugestoes: ((sugestoesCount / totalComments) * 100).toFixed(2),
      elogios: ((elogiosCount / totalComments) * 100).toFixed(2),
      reclamacoes: ((reclamacoesCount / totalComments) * 100).toFixed(2),
      solicitacoes: ((solicitacoesCount / totalComments) * 100).toFixed(2),
    };
  };

  // 3) Define quais chaves contam como "positivas" e quais contam como "negativas"
  const getResponseKeys = (questionId) => {
    switch (questionId) {
      case 8: // "3.2 - Você sente que a equipe do CEU..."
        return {
          positiveKeys: ['Sempre', 'Na maioria das vezes'],
          negativeKeys: ['Às vezes', 'Raramente', 'Nunca'],
        };
      default:
        // "Regular" e "Parcialmente" como negativo, etc.
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

      // Se não encontrou, não exibe
      if (!response) return;

      // Cria/pega a "seção" no objeto results
      const section = question.section;
      if (!results[section]) {
        results[section] = { details: [] };
      }

      // Pega as chaves de positivo/negativo pra calcular índice
      const { positiveKeys, negativeKeys } = getResponseKeys(question.id);
      const indices = calculateIndex(response.options, positiveKeys, negativeKeys);
      const commentIndices = calculateCommentIndex(question.id);

      // Se a pergunta estiver em "5. Sugestões e Melhorias", pode não calcular satisfaction
      const satisfaction =
        section !== '5. Sugestões e Melhorias' ? indices : null;

      results[section].details.push({
        questionId: question.id, // Armazenar ID para uso na renderização
        question: question.question,
        responses: response.options,
        satisfaction,
        comments: commentIndices,
        interpretation: question.interpretation || null,
      });
    });

    return results;
  };

  // 5) Executa a análise e obtém objeto final
  const analysis = analyzeSections();

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
            // <-- Encontra a pergunta no array questions e pega as opções definidas
            const questionObj = questions.find(q => q.id === detail.questionId);
            // Se não achar, usa array vazio (p/evitar erro)
            const questionOptions = questionObj ? questionObj.options : [];

            // Monta o array de [opção, contagem] na ordem definida em questions.js
            const displayedResponses = questionOptions.map(option => [
              option,
              detail.responses[option] || 0
            ]);

            // Soma total para cálculo de percentuais
            const totalResponses = displayedResponses.reduce((acc, curr) => acc + curr[1], 0);

            return (
              <div key={idx} className="question-block">
                <p className="question-title">{detail.question}</p>

                {/* Lista de opções e contagens, na ordem do questionOptions */}
                <ul className="response-list">
                  {displayedResponses.map(([option, count], i) => {
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

                {/* Índice de satisfação/insatisfação (para perguntas que não estão na seção 5) */}
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

                {/* Índices de comentários (sugestões, elogios, reclamações, solicitações) */}
                <p className="comment-index">
                  Comentários —{" "}
                  <span className="praise">
                    Elogios: {detail.comments.elogios}%
                  </span>{" "}
                  |{" "}
                  <span className="request">
                    Solicitações: {detail.comments.solicitacoes}%
                  </span>{" "}
                  |{" "}
                  <span className="suggestion">
                    Sugestões de melhoria: {detail.comments.sugestoes}%
                  </span>{" "}
                  |{" "}
                  <span className="complaint">
                    Reclamações: {detail.comments.reclamacoes}%
                  </span>
                </p>

                {/* Interpretação, se existir */}
                {detail.interpretation && (
                  <p className="interpretation-text">
                    {detail.interpretation}
                  </p>
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
