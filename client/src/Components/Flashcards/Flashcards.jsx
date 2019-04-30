import React from "react";
import Card from "../Card/Card";

const Flashcards = props => {
  return (
    <div className="cardContainer wrapper">
      {props.flashcards.map(flashcard => (
        <Card
          id={flashcard._id}
          question={flashcard.question}
          answer={flashcard.answer}
          answerIsVisible={props.answerIsVisible}
          handleAnswerReveal={props.handleAnswerReveal}
          deleteFromDatabase={props.deleteFromDatabase}
        />
      ))}
    </div>
  );
};

export default Flashcards;
