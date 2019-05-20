import React from "react";
import Card from "./Card/Card";

const Cards = props => {
  const {
    deleteFromDatabase,
    nextCard,
    previousCard,
    visibleCardIndex,
    cards,
    filter
  } = props;

  const allCards = cards
    .filter(card => (filter !== "noFilter" ? card.topic === filter : card))
    .map(card => (
      <Card
        key={card._id}
        card={card}
        deleteFromDatabase={deleteFromDatabase}
        nextCard={nextCard}
        previousCard={previousCard}
        visibleCardIndex={visibleCardIndex}
      />
    ));

  // should probably make filter update cards state

  const visibleCard = allCards[visibleCardIndex];

  return <main className="cardContainer">{visibleCard}</main>;
};

export default Cards;
