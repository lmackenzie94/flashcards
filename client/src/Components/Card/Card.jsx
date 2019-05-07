import React from "react";
import { useSpring, animated } from "react-spring";

const Card = props => {
  const { _id, question, answer, topic } = props.flashcard;
  const { answerIsVisible, deleteFromDatabase, toggleAnswerReveal } = props;
  const cardTransition = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div key={_id} className="card" style={cardTransition}>
      <button className="close" onClick={() => deleteFromDatabase(_id)}>
        &times;
      </button>
      <span className={`topic ${topic.toLowerCase()}`}>{topic}</span>
      <p style={{ fontWeight: "Bold" }}>{question}</p>

      {answerIsVisible ? <p>{answer}</p> : <p className="blur">{answer}</p>}

      {answerIsVisible ? (
        <button
          className="toggleAnswer"
          onClick={() => toggleAnswerReveal(_id)}
        >
          Hide Answer
        </button>
      ) : (
        <button
          className="toggleAnswer"
          onClick={() => toggleAnswerReveal(_id)}
        >
          Reveal Answer
        </button>
      )}
    </animated.div>
  );
};
export default Card;
