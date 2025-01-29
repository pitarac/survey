import React, { useEffect, useState } from "react";
import styles from '../styles/RatingComments.module.css';

const RatingComments = ({ comments: propComments }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classificationFilter, setClassificationFilter] = useState("");
  const [questionFilter, setQuestionFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (propComments) {
      setData(propComments);
      setFilteredData(propComments);
      setLoading(false);
    } else {
      fetch("./classified_comments.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao buscar o arquivo: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setFilteredData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao carregar dados:", error);
          setLoading(false);
        });
    }
  }, [propComments]);

  useEffect(() => {
    let filtered = data;

    // Filtro por classificação
    if (classificationFilter) {
      filtered = filtered.filter(
        (item) => item.classification === classificationFilter
      );
    }

    // Filtro por pergunta
    if (questionFilter) {
      filtered = filtered.filter((item) => item.questionId === questionFilter);
    }

    // Filtro por termo de busca no comentário
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenação por score de confiança
    filtered = filtered.sort((a, b) =>
      sortOrder === "asc" ? a.confidence - b.confidence : b.confidence - a.confidence
    );

    setFilteredData(filtered);
  }, [classificationFilter, questionFilter, searchTerm, sortOrder, data]);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (filteredData.length === 0) {
    return <p>Nenhum dado encontrado com os filtros aplicados.</p>;
  }

  return (
    <div className={styles["rating-comments-container"]}>
      <h1 className={styles["rating-comments-title"]}>Comentários das perguntas</h1>
      <p className={styles["rating-comments-description"]}>
  Este painel apresenta os resultados das análises automáticas realizadas sobre os comentários fornecidos pelos usuários. Utilizamos um modelo avançado de <strong>Inteligência Artificial</strong> desenvolvido com a biblioteca <strong>Transformers</strong> em Python, que processa linguagem natural para classificar os comentários em quatro categorias distintas: <strong>sugestões de melhoria</strong>, <strong>elogios</strong>, <strong>reclamações</strong> e <strong>solicitações de serviços ou infraestrutura</strong>.
  
  O processo de classificação é realizado através de um pipeline de <em>zero-shot classification</em>, que permite categorizar os comentários sem a necessidade de um treinamento prévio específico para essas categorias. Para isso, utilizamos o modelo <strong>xlm-roberta-large-xnli</strong>, um modelo multilíngue robusto que suporta o português, garantindo precisão na análise dos textos.

  As seguintes bibliotecas são essenciais para o funcionamento deste sistema:
  <ul>
    <li><strong>Streamlit</strong>: Utilizado para criar a interface web interativa, permitindo uma visualização dinâmica e em tempo real dos resultados.</li>
    <li><strong>Requests</strong>: Responsável por realizar chamadas à API que fornece os dados dos comentários.</li>
    <li><strong>Transformers</strong>: Biblioteca da Hugging Face que facilita o uso de modelos de linguagem pré-treinados para diversas tarefas de processamento de linguagem natural.</li>
    <li><strong>PyTorch (torch)</strong>: Backend de aprendizado de máquina que suporta o treinamento e a inferência dos modelos utilizados.</li>
    <li><strong>SentencePiece</strong>: Biblioteca utilizada para a tokenização eficiente dos textos, fundamental para o processamento adequado pelo modelo de IA.</li>
  </ul>
  
  O fluxo de trabalho é o seguinte:
  <ol>
    <li><strong>Coleta de Dados:</strong> Os comentários são obtidos através de uma API, garantindo que os dados estejam sempre atualizados.</li>
    <li><strong>Processamento:</strong> Utilizamos a biblioteca <strong>Transformers</strong> juntamente com <strong>PyTorch</strong> para carregar o modelo <strong>xlm-roberta-large-xnli</strong> e realizar a classificação dos comentários.</li>
    <li><strong>Classificação:</strong> O modelo analisa cada comentário e o categoriza de acordo com as quatro categorias estabelecidas, utilizando técnicas avançadas de processamento de linguagem natural.</li>
    <li><strong>Visualização:</strong> Os resultados são exibidos de forma intuitiva na interface web criada com <strong>Streamlit</strong>, permitindo uma fácil interpretação e tomada de decisão baseada nos insights gerados.</li>
  </ol>
  
  Este sistema automatizado não apenas agiliza a análise dos feedbacks recebidos, mas também proporciona uma visão abrangente das áreas que requerem atenção, destacando os pontos fortes e as oportunidades de melhoria na infraestrutura e nos serviços oferecidos pelo CEU DAS ARTES.
</p>
      <div className={styles["filters-container"]}>
        <label>
          Classificação:
          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="sugestões de melhoria">Sugestões de melhoria</option>
            <option value="elogios">Elogios</option>
            <option value="reclamações">Reclamações</option>
            <option value="solicitações de serviços ou infraestrutura">
              Solicitações de serviços ou infraestrutura
            </option>
          </select>
        </label>
        <label>
          Número da Pergunta:
          <select
            value={questionFilter}
            onChange={(e) => setQuestionFilter(e.target.value)}
          >
            <option value="">Todas</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 3} value={`${i + 3}`}>
                Pergunta {i + 3}
              </option>
            ))}
          </select>
        </label>
        <label>
          Buscar comentário:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite uma palavra-chave"
          />
        </label>
        <label>
          Ordenar por confiança:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Maior para menor</option>
            <option value="asc">Menor para maior</option>
          </select>
        </label>
      </div>
      <div className={styles["table-container"]}>
        <table>
          <thead>
            <tr>
              <th>ID do Respondente</th>
              <th>Número da Pergunta</th>
              <th>Resposta</th>
              <th>Comentário</th>
              <th>Classificação</th>
              <th>Score da Classificação</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.studentId}</td>
                <td>{item.questionId}</td>
                <td>{item.answer}</td>
                <td>{item.comment}</td>
                <td
                  className={
                    // Ajuste de estilo conforme a classificação
                    item.classification === "elogios"
                      ? styles["classification-positive"]
                      : item.classification === "sugestões de melhoria"
                      ? styles["classification-neutral"]
                      : item.classification === "reclamações"
                      ? styles["classification-negative"]
                      : item.classification === "solicitações de serviços ou infraestrutura"
                      ? styles["classification-neutral"] // ou crie outra cor específica
                      : ""
                  }
                >
                  {item.classification}
                </td>
                <td>{item.confidence.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingComments;
