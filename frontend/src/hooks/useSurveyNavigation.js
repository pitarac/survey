// src/hooks/useSurveyNavigation.js
import Swal from 'sweetalert2';
import { useState } from 'react';

const useSurveyNavigation = (questions) => {
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [comments, setComments] = useState({});

  const handleAnswer = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const handleComment = (questionId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [questionId]: comment,
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!responses[currentQuestion.id] && currentQuestion.type !== "text") {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, responda a pergunta antes de continuar.',
        confirmButtonText: 'Ok'
      });
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const getSectionTitle = (index) => {
    if (index < 2) return "1. Informações Gerais";
    if (index < 6) return "2. Avaliação Geral";
    if (index < 9) return "3. Atendimento e Qualidade do Serviço";
    if (index < 11) return "4. Impacto e Satisfação Pessoal";
    return "5. Sugestões e Melhorias";
  };

  return {
    handleComment,
    setComments,
    comments,
    responses,
    setResponses,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleNext,
    handlePrevious,
    handleAnswer,
    progressPercentage,
    getSectionTitle
  };
};

export default useSurveyNavigation;
