import React from "react";

const Flashcard = props => {
  return (
    //   const {
    //     handleAnswerReveal,
    //     deleteFromDatabase,
    //     answerIsVisible,
    //     currentCard
    // } = props;

    <div key={props.currentCard._id} className="card">
      <button
        className="close"
        onClick={() => props.deleteFromDatabase(props.currentCard._id)}
      >
        &times;
      </button>
      <p style={{ fontWeight: "Bold" }}>{props.currentCard.question}</p>

      {props.answerIsVisible ? <p>{props.currentCard.answer}</p> : null}

      {props.answerIsVisible ? (
        <button
          className="toggleAnswer"
          onClick={() => props.handleAnswerReveal(props.currentCard._id)}
        >
          Hide Answer
        </button>
      ) : (
        <button
          className="toggleAnswer"
          onClick={() => props.handleAnswerReveal(props.currentCard._id)}
        >
          Reveal Answer
        </button>
      )}
    </div>
  );
};
export default Flashcard;
