import React, { Component } from "react";
import axios from "axios";
import "./App.css";
// import Flashcard from "./Components/Card/Flashcard";
import Card from "./Components/Card/Card";
import Modal from "./Components/Modal/Modal";
import Navbar from "./Components/Navbar/Navbar";

class App extends Component {
  state = {
    flashcards: [],
    newCardTopic: "HTML",
    answerIsVisible: false,
    modalIsOpen: false
  };

  componentDidMount() {
    this.getFromDatabase();
  }

  getFromDatabase = () => {
    fetch("/api/cards") // dont have to specify localhost becuase of the proxy we added in package.json
      .then(res => res.json())
      .then(flashcards => {
        this.setState({
          flashcards,
          currentCard: flashcards[0],
          currentCardIndex: 0
        });
      })
      .catch(err => console.log(`Oops, something went wrong: ${err}`));
  };

  postToDatabase = () => {
    let { newQuestion, newAnswer, newCardTopic } = this.state;
    axios
      .post("/api/cards", {
        question: newQuestion,
        answer: newAnswer,
        topic: newCardTopic
      })
      .then(() => {
        this.getFromDatabase();
        this.setState({
          newQuestion: "",
          newAnswer: "",
          newCardTopic: "HTML"
        });
      });
  };

  deleteFromDatabase = id => {
    axios.delete(`/api/cards/${id}`).then(() => this.getFromDatabase());
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.postToDatabase();
    this.toggleModal();
  };

  toggleAnswerReveal = () => {
    this.setState({
      answerIsVisible: !this.state.answerIsVisible
    });
  };

  nextCard = () => {
    const { currentCardIndex, flashcards } = this.state;
    if (currentCardIndex === flashcards.length - 1) {
      return;
    }
    this.setState({
      currentCard: flashcards[currentCardIndex + 1],
      currentCardIndex: currentCardIndex + 1
    });
  };

  previousCard = () => {
    const { currentCardIndex, flashcards } = this.state;

    if (currentCardIndex <= 0) {
      return;
    }
    this.setState({
      currentCard: flashcards[currentCardIndex - 1],
      currentCardIndex: currentCardIndex - 1
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  render() {
    const {
      flashcards,
      newQuestion,
      newAnswer,
      newCardTopic,
      currentCard,
      currentCardIndex,
      answerIsVisible,
      modalIsOpen
    } = this.state;

    return (
      <div className="App">
        <header>
          <Navbar toggleModal={this.toggleModal} />
          {modalIsOpen && (
            <Modal
              handleFormChange={this.handleFormChange}
              handleFormSubmit={this.handleFormSubmit}
              toggleModal={this.toggleModal}
              newQuestion={newQuestion}
              newAnswer={newAnswer}
              newCardTopic={newCardTopic}
            />
          )}
          <button
            onClick={this.previousCard}
            disabled={currentCardIndex <= 0}
            className="changeCard"
          >
            Previous card
          </button>
          <button
            onClick={this.nextCard}
            disabled={currentCardIndex === flashcards.length - 1}
            className="changeCard"
          >
            Next card
          </button>
        </header>
        <div className="cardContainer">
          {flashcards.map(
            flashcard =>
              currentCard._id === flashcard._id && (
                <Card
                  key={flashcard._id}
                  flashcard={flashcard}
                  answerIsVisible={answerIsVisible}
                  toggleAnswerReveal={this.toggleAnswerReveal}
                  deleteFromDatabase={this.deleteFromDatabase}
                />
              )
          )}
        </div>
        {/* <Flashcard 
          currentCard={currentCard}
          answerIsVisible={answerIsVisible}
          handleAnswerReveal={this.toggleAnswerReveal}
          deleteFromDatabase={this.deleteFromDatabase}
        /> */}
      </div>
    );
  }
}

export default App;
