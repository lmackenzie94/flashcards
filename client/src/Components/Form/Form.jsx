import React from "react";
import "../../App.css";

const Form = props => {
  const {
    handleFormChange,
    handleFormSubmit,
    newQuestion,
    newAnswer,
    newCardTopic
  } = props;

  return (
    <div className="wrapper">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="newQuestion"
          placeholder="Enter a question..."
          onChange={handleFormChange}
          value={newQuestion}
          required
        />
        <input
          type="text"
          name="newAnswer"
          placeholder="Enter the answer..."
          onChange={handleFormChange}
          value={newAnswer}
          required
        />
        <select
          required
          name="newCardTopic"
          value={newCardTopic}
          onChange={handleFormChange}
        >
          <option value="HTML" defaultValue>
            HTML
          </option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <button className="addCard">Add Card!</button>
      </form>
    </div>
  );
};

export default Form;
