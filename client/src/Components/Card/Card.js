import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const Card = props => {
  const [answerIsVisible, setAnswerIsVisible] = useState(false);
  const { nextCard, previousCard, visibleCardIndex } = props;
  const { _id, question, answer, topic } = props.card;
  const cardTransition = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(
    () => {
      document.addEventListener("keydown", handleKeyPress);
    },
    () => document.removeEventListener("keydown")
  );

  const handleKeyPress = e => {
    let keyPressed = e.key;
    if (keyPressed === "ArrowLeft" && visibleCardIndex > 0) {
      previousCard();
    } else if (keyPressed === "ArrowRight") {
      //need to block arrow press when there are no more cards to show
      nextCard();
    } else return;
  };

  const topicBadge = (
    <span className={`topic ${topic.toLowerCase()}`}>{topic}</span>
  );

  const questionText = (
    <p style={{ fontWeight: "Bold", marginTop: "25px", textAlign: "center" }}>
      {question}
    </p>
  );
  const answerText = answerIsVisible ? (
    <p>{answer}</p>
  ) : (
    <p className="blur">{answer}</p>
  );

  const toggleAnswerButton = (
    <button
      className="toggleAnswer"
      onClick={() => setAnswerIsVisible(!answerIsVisible)}
    >
      {answerIsVisible ? "Hide Answer" : "Reveal Answer"}
    </button>
  );

  return (
    <animated.div key={_id} className="card" style={cardTransition}>
      <button className="close" onClick={() => props.deleteFromDatabase(_id)}>
        &times;
      </button>
      {topicBadge}
      {questionText}
      {answerText}
      {toggleAnswerButton}
    </animated.div>
  );
};
export default Card;
