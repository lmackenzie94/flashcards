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
        this.setState({ flashcards });
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

  render() {
    const { flashcards, newQuestion, newAnswer, newCardTopic } = this.state;

    // let randomCard =
    //   props.flashcards[Math.floor(Math.random() * props.flashcards.length)];

    return (
      <div className="App">
        <Navbar />
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
