// src/pages/Survey.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import Question from "../components/Question";
import Layout from "../components/Layout";
import '../styles/Survey.css';
import useSurveyNavigation from '../hooks/useSurveyNavigation';
import Swal from 'sweetalert2';
import ProgressBar from '../components/ProgressBar';


const Survey = () => {
  const navigate = useNavigate();
  const {
    responses,
    currentQuestionIndex,
    handleNext,
    handlePrevious,
    handleAnswer,
    progressPercentage,
    getSectionTitle,
    setResponses,
    setCurrentQuestionIndex,
    handleComment,
    comments,
    setComments
  } = useSurveyNavigation(questions);

  const [token, setToken] = useState("");

  // Load saved responses and token from localStorage
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Algo deu errado! :( ',
        text: 'Essa pesquisa é destinada a pessoas vinculadas ao CEU das artes, parece que o seu link tá errado. Por favor, acesse o link fornecido.',
        confirmButtonText: 'Responder mesmo assim.'
      });
    }

    // Load saved responses from localStorage
    const savedResponses = localStorage.getItem('surveyResponses');
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    const savedComments = localStorage.getItem('surveyComments');
    const completedToken = localStorage.getItem('completedToken');

    if (savedResponses && savedIndex && (!completedToken || completedToken !== tokenParam)) {
      setResponses(JSON.parse(savedResponses));
      setCurrentQuestionIndex(parseInt(savedIndex));
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    } else if (completedToken && completedToken === tokenParam) {
      navigate('/thank-you');
    }
  }, [navigate, setCurrentQuestionIndex, setResponses, setComments]);

  // Save responses and current question index to localStorage
  useEffect(() => {
    localStorage.setItem('surveyResponses', JSON.stringify(responses));
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    localStorage.setItem('surveyComments', JSON.stringify(comments)); // Salvando comentários no localStorage
  }, [responses, currentQuestionIndex, comments]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Verificar se todas as perguntas obrigatórias foram respondidas
    const unansweredQuestions = questions.filter((q) => !responses[q.id] && q.type !== "text");
    if (unansweredQuestions.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Por favor, responda todas as perguntas antes de enviar.',
            confirmButtonText: 'Ok'
        });
        return;
    }

    // Log dos dados que estamos enviando
    console.log("Token enviado:", token);
    console.log("Respostas enviadas:", responses);
    console.log("Comentários enviados:", comments);

    try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "/api";
        
        // Verificar a estrutura do objeto que está sendo enviado ao backend
        const payload = {
            token,
            responses,
            comments
        };

        console.log("Payload a ser enviado ao backend:", payload);

        // Enviar o payload ao backend
        const response = await axios.post(`${backendUrl}/submit`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            // Armazenar o token para indicar que a pesquisa foi concluída
            localStorage.setItem('completedToken', token);
            navigate("/thank-you");
        } else {
            throw new Error('Falha ao salvar as respostas no servidor.');
        }
    } catch (error) {
        console.error("Erro ao enviar as respostas:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao enviar suas respostas. Por favor, tente novamente.',
            confirmButtonText: 'Ok'
        });
    }
  };

  return (
    <Layout>
      <div className="survey">
        <h1 className="survey-title">Pesquisa de Satisfação do CEU</h1>
        <h3 className="survey-question">O questionário a seguir é anônimo, rápido e fácil de responder. Suas respostas serão utilizadas exclusivamente para fins de melhoria dos serviços. Agradecemos imensamente por dedicar um pouco do seu tempo para contribuir com essa importante iniciativa!</h3>
        <ProgressBar percentage={progressPercentage} />
        <form onSubmit={handleSubmit} className="survey-form">
          {currentQuestionIndex < questions.length ? (
            <div className="survey-question-container">
              <h2 className="survey-section-title">{getSectionTitle(currentQuestionIndex)}</h2>
              <Question
                key={questions[currentQuestionIndex].id}
                questionData={questions[currentQuestionIndex]}
                onAnswer={(questionId, answer) => {
                  handleAnswer(questionId, answer);
                  setResponses((prevResponses) => ({
                    ...prevResponses,
                    [questionId]: answer
                  }));
                }}
                onComment={(questionId, comment) => {
                  handleComment(questionId, comment);
                  setComments((prevComments) => ({
                    ...prevComments,
                    [questionId]: comment
                  }));
                }}
                className="survey-question"
                value={responses[questions[currentQuestionIndex].id] || ""} // Ensure the input displays the saved value
                commentValue={comments[questions[currentQuestionIndex].id] || ""} // Ensure the comment displays the saved value
              />
            </div>
          ) : (
            <button type="submit" className="survey-submit-button">Enviar</button>
          )}
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button type="button" onClick={handlePrevious} className="survey-nav-button">
                Anterior
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button type="button" onClick={handleNext} className="survey-nav-button">
                Próximo
              </button>
            ) : (
              <button type="submit" className="survey-submit-button">Enviar</button>
            )}
          </div>
        </form>
        

      </div>
    </Layout>
  );
};

export default Survey;