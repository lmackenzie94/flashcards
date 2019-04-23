import React, { Component } from "react";
import "../../App.css";
import Form from "../Form/Form";

class Flashcards extends Component {
  state = {
    flashcards: []
  };

  componentDidMount() {
    fetch("/api/flashcards") // dont have to specify localhost becuase of the proxy we added in package.json
      .then(res => res.json())
      .then(flashcards => {
        this.setState({ flashcards });
      });
  }

  render() {
    return (
      <div>
        <h2>Flashcards</h2>
        <ul>
          {this.state.flashcards.map(flashcard => (
            <li key={flashcard.id}>
              Question: {flashcard.question} | Answer: {flashcard.answer}
            </li>
          ))}
        </ul>
        <Form />
      </div>
    );
  }
}

export default Flashcards;
