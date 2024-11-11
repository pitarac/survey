// src/components/ChartList.js
import React from 'react';
import questions from '../utils/questions';
import ChartContainer from './ChartContainer';

function ChartList({ data }) {
  // Definindo quais perguntas devem ser exibidas como gráfico de pizza
  const pieChartQuestions = [3, 4, 7, 9]; // IDs das perguntas que devem ser apresentadas como gráficos de pizza

  return (
    <div className="chart-list">
      {data.length === 0 ? (
        <div className="no-data">Nenhum dado encontrado.</div>
      ) : (
        data.map((questionData) => {
          // Encontrar o título da pergunta correspondente
          const questionInfo = questions.find(q => q.id === parseInt(questionData.questionId));
          const questionTitle = questionInfo ? questionInfo.question : `Pergunta ${questionData.questionId}`;

          // Verificar se a pergunta deve ser exibida como gráfico de pizza
          const isPieChart = pieChartQuestions.includes(parseInt(questionData.questionId));

          return (
            <ChartContainer
              key={questionData.questionId}
              questionTitle={questionTitle}
              questionData={questionData}
              isPieChart={isPieChart}
            />
          );
        })
      )}
    </div>
  );
}

export default ChartList;
