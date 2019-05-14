import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const Card = props => {
  const [answerIsVisible, setAnswerIsVisible] = useState(false);

  const { _id, question, answer, topic } = props.card;
  const cardTransition = useSpring({ opacity: 1, from: { opacity: 0 } });

  const topicBadge = (
    <span className={`topic ${topic.toLowerCase()}`}>{topic}</span>
  );

  const questionText = <p style={{ fontWeight: "Bold" }}>{question}</p>;
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
    <animated.div
      key={_id}
      className="card"
      style={cardTransition}
      // tabIndex="0"
      // onKeyDown={handleArrowKeys}
    >
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
