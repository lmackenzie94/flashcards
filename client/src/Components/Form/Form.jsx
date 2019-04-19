import React from "react";
import "../../App.css";

const Form = () => {
  return (
    <form action="/api/addFlashcard" method="POST">
      <input
        type="text"
        name="addQuestion"
        placeholder="Enter a question..."
        required
      />
      <input
        type="text"
        name="addAnswer"
        placeholder="Enter the answer..."
        required
      />
      <button>Add Card!</button>
    </form>
  );
};

export default Form;
