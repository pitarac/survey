// src/components/Question.js
import React from "react";

function Question({ questionData, onAnswer, onComment }) {
  const { id, question, type, options, allowComment } = questionData;

  const handleChange = (event) => {
    onAnswer(id, event.target.value);
  };

  const handleCommentChange = (event) => {
    onComment(id, event.target.value);
  };

  return (
    <div className="question">
      <p>{question}</p>

      {/* Renderização do campo de resposta dependendo do tipo da pergunta */}
      {type === "text" && (
        <input
          type="text"
          onChange={handleChange}
          className="text-input"
        />
      )}

      {type === "radio" && options && (
        <div className="options-list">
          {options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${id}`}
                value={option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {type === "select" && options && (
        <select onChange={handleChange} className="select-input">
          <option value="">Selecione uma opção</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Renderização do campo de comentário opcional */}
      {allowComment && (
        <div className="comment">
          <label>
            Comentário:
            <textarea onChange={handleCommentChange} className="comment-textarea" />
          </label>
        </div>
      )}
    </div>
  );
}

export default Question;
