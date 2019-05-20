import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Filter from "../components/Filter/Filter";
import Button from "../components/Button/Button";
import Cards from "../components/Cards/Cards";
import Modal from "../components/Modal/Modal";

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
      })
      .catch(err => console.log(`Oops, something went wrong: ${err}`));
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

  return (
    <div className="App">
      <header>
        <h1>CodeCards</h1>
        <Filter handleFilter={handleFilter} currentFilter={filter} />
        <Modal
          toggleModal={toggleModal}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          modalIsOpen={modalIsOpen}
        />
        <div className="buttonContainer">
          <Button
            click={previousCard}
            disabled={visibleCardIndex <= 0}
            name="Previous Card"
            buttonStyle="changeCard"
          />
          <Button
            click={nextCard}
            // disabled={visibleCardIndex === allCards.length - 1}
            name="Next Card"
            buttonStyle="changeCard"
          />
        </div>
      </header>
      <Cards
        deleteFromDatabase={deleteFromDatabase}
        nextCard={nextCard}
        previousCard={previousCard}
        visibleCardIndex={visibleCardIndex}
        cards={cards}
        filter={filter}
      />
      {cards.length !== 0 && (
        <Button click={toggleModal} name="Add Card" buttonStyle="openModal" />
      )}
    </div>
  );
};

export default App;
