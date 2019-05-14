import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Components/Card/Card";
import Form from "./Components/Form/Form";
import Filter from "./Components/Filter/Filter";
import Button from "./Components/Button/Button";

const App = props => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    newQuestion: "",
    newAnswer: "",
    newTopic: "HTML"
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  const [filter, setFilter] = useState("noFilter");

  useEffect(() => {
    getFromDatabase();
  }, []);

  const getFromDatabase = () => {
    fetch("/api/cards") // dont have to specify localhost becuase of the proxy we added in package.json
      .then(res => res.json())
      .then(cards => {
        const reversedCards = cards.reverse(); // so more recently added cards appear first
        setCards(reversedCards);
      })
      .catch(err => console.log(`Oops, something went wrong: ${err}`));
  };

  const postToDatabase = () => {
    let { newQuestion, newAnswer, newTopic } = newCard;
    axios
      .post("/api/cards", {
        question: newQuestion,
        answer: newAnswer,
        topic: newTopic
      })
      .then(() => {
        getFromDatabase();
        setNewCard({
          newQuestion: "",
          newAnswer: "",
          newTopic: "HTML"
        });
        setVisibleCardIndex(0); //so that the new card is the one that's visible
      });
  };

  const deleteFromDatabase = id => {
    axios.delete(`/api/cards/${id}`).then(() => getFromDatabase());
  };

  const handleFormChange = e => {
    let currentInput = e.target.name;
    setNewCard({
      ...newCard,
      [currentInput]: e.target.value
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    postToDatabase();
    toggleModal();
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // const handleArrowKeys = e => {
  //   let keyPressed = e.key;
  // };

  const nextCard = () => {
    let currentCard = visibleCardIndex;
    setVisibleCardIndex(currentCard + 1);
  };

  const previousCard = () => {
    let currentCard = visibleCardIndex;
    setVisibleCardIndex(currentCard - 1);
  };

  const handleFilter = e => {
    let filter = e.target.value;
    setFilter(filter);
    setVisibleCardIndex(0);
  };

  const allCards = cards
    .filter(card => (filter !== "noFilter" ? card.topic === filter : card))
    .map(card => (
      <Card
        key={card._id}
        card={card}
        deleteFromDatabase={deleteFromDatabase}
        // handleArrowKeys={handleArrowKeys}
      />
    ));

  const visibleCard = allCards[visibleCardIndex];

  return (
    <div className="App">
      <header>
        <h1>Flashcards</h1>
        <Filter handleFilter={handleFilter} currentFilter={filter} />
        {modalIsOpen && (
          <div className="modalContainer">
            <div className="modal">
              <Button buttonStyle="close" click={toggleModal} name="&times;" />
              <Form
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
              />
            </div>
          </div>
        )}
        <div className="buttonContainer">
          <Button
            click={previousCard}
            disabled={visibleCardIndex <= 0}
            name="Previous Card"
            buttonStyle="changeCard"
          />
          <Button
            click={nextCard}
            disabled={visibleCardIndex === allCards.length - 1}
            name="Next Card"
            buttonStyle="changeCard"
          />
        </div>
      </header>
      <main className="cardContainer">{visibleCard}</main>
      {cards.length !== 0 && (
        <Button click={toggleModal} name="Add Card" buttonStyle="openModal" />
      )}
    </div>
  );
};

export default App;
