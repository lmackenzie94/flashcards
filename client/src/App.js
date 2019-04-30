import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Form from "./Components/Form/Form";
import Flashcards from "./Components/Flashcards/Flashcards";
import Navbar from "./Components/Navbar/Navbar";

class App extends Component {
  state = {
    flashcards: [],
    newCardTopic: "HTML",
    answerIsVisible: false
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
  };

  toggleAnswerReveal = id => {
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

  render() {
    const {
      flashcards,
      newQuestion,
      newAnswer,
      newCardTopic,
      currentCardIndex
    } = this.state;

    return (
      <div className="App">
        <Navbar />
        <button onClick={this.previousCard} disabled={currentCardIndex <= 0}>
          Previous card
        </button>
        <button
          onClick={this.nextCard}
          disabled={currentCardIndex === flashcards.length - 1}
        >
          Next card
        </button>
        <Flashcards
          flashcards={flashcards}
          answerIsVisible={this.state.answerIsVisible}
          handleAnswerReveal={this.toggleAnswerReveal}
          deleteFromDatabase={this.deleteFromDatabase}
        />
        <Form
          handleFormChange={this.handleFormChange}
          handleFormSubmit={this.handleFormSubmit}
          newQuestion={newQuestion}
          newAnswer={newAnswer}
          newCardTopic={newCardTopic}
        />
        {/* <Card
          id={flashcard._id}
          question={flashcard.question}
          answer={flashcard.answer}
          answerIsVisible={props.answerIsVisible}
          handleAnswerReveal={props.handleAnswerReveal}
          deleteFromDatabase={props.deleteFromDatabase}
        /> */}
      </div>
    );
  }
}

export default App;
