import React from "react";
import "../../App.css";

const Form = () => {
  return (
    <form action="/api/addFlashcard" method="POST">
      <input
        type="text"
        name="addFlashcard"
        placeholder="Enter a question..."
      />
      <button>Add Card!</button>
    </form>
  );
};

export default Form;
