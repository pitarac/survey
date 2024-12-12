import React, { useEffect, useState } from "react";

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
            fetch("/classified_comments.json")
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

        if (classificationFilter) {
            filtered = filtered.filter((item) => item.classification === classificationFilter);
        }

        if (questionFilter) {
            filtered = filtered.filter((item) => item.questionId === questionFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.comment.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

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
        <div>
            <h1>Resultados Classificados</h1>
            <p style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
                Este painel apresenta os resultados de análises automáticas realizadas sobre os comentários fornecidos. 
                Utilizamos um modelo de <strong>Inteligência Artificial</strong> baseado na biblioteca <strong>Transformers</strong> em Python, 
                que processa linguagem natural para identificar o sentimento predominante em cada comentário, como <strong>positivo</strong>, 
                <strong>negativo</strong> ou <strong>neutro</strong>. 
            </p>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Classificação:
                    <select
                        value={classificationFilter}
                        onChange={(e) => setClassificationFilter(e.target.value)}
                    >
                        <option value="">Todas</option>
                        <option value="POSITIVE">Positivo</option>
                        <option value="NEGATIVE">Negativo</option>
                        <option value="NEUTRAL">Neutro</option>
                    </select>
                </label>
                <label style={{ marginLeft: "20px" }}>
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
                <label style={{ marginLeft: "20px" }}>
                    Buscar comentário:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Digite uma palavra-chave"
                    />
                </label>
                <label style={{ marginLeft: "20px" }}>
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
            <div style={{ maxHeight: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
                <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
                                <td>{item.classification}</td>
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
