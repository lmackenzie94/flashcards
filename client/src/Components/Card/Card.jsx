import React from "react";

const Card = props => {
  return (
    <div key={props.id} className="card">
      <button
        className="close"
        onClick={() => props.deleteFromDatabase(props.id)}
      >
        &times;
      </button>
      <p style={{ fontWeight: "Bold" }}>{props.question}</p>

      {props.answerIsVisible ? <p>{props.answer}</p> : null}

      {props.answerIsVisible ? (
        <button
          className="toggleAnswer"
          onClick={() => props.handleAnswerReveal(props.id)}
        >
          Hide Answer
        </button>
      ) : (
        <button
          className="toggleAnswer"
          onClick={() => props.handleAnswerReveal(props.id)}
        >
          Reveal Answer
        </button>
      )}
    </div>
  );
};
export default Card;
