import React from "react";
import Form from "../Form/Form";

const Modal = props => {
  const {
    newQuestion,
    newAnswer,
    newCardTopic,
    handleFormChange,
    handleFormSubmit,
    toggleModal
  } = props;
  return (
    <div className="modalContainer">
      <div className="modal">
        <button className="close" onClick={toggleModal}>
          &times;
        </button>
        <Form
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          newQuestion={newQuestion}
          newAnswer={newAnswer}
          newCardTopic={newCardTopic}
        />
      </div>
    </div>
  );
};

export default Modal;
