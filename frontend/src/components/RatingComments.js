import React, { useEffect, useState } from "react";

const RatingComments = () => {
    const [data, setData] = useState([]);

    // Carregar dados do arquivo JSON
    useEffect(() => {
        fetch("./classified_comments.json")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    return (
        <div>
            <h1>Classificação dos comentários</h1>
            {data.length > 0 ? (
                <table border="1" style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                        <tr>
                            <th>ID do Respondente</th>
                            <th>Numero da Pergunta</th>
                            <th>Resposta</th>
                            <th>Comentário</th>
                            <th>Classificação</th>
                            <th>Score da Classificação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
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
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default RatingComments;
