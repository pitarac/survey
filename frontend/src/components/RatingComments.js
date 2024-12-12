import React, { useEffect, useState } from "react";

const RatingComments = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [classificationFilter, setClassificationFilter] = useState("");
    const [questionFilter, setQuestionFilter] = useState(""); // Filtro para o número da pergunta
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc"); // 'asc' ou 'desc'

    useEffect(() => {
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
    }, []);

    // Atualizar dados filtrados com base nos filtros ativos
    useEffect(() => {
        let filtered = data;

        // Filtrar por classificação
        if (classificationFilter) {
            filtered = filtered.filter((item) => item.classification === classificationFilter);
        }

        // Filtrar por número da pergunta
        if (questionFilter) {
            filtered = filtered.filter((item) => item.questionId === questionFilter);
        }

        // Filtrar por termo de busca
        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.comment.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenar por confiança
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

            {/* Filtros */}
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

            {/* Tabela com scroll interno */}
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
