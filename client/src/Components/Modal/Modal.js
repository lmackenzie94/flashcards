import React from "react";
import Button from "../Button/Button";
import Form from "./Form/Form";

const Modal = props => {
  const {
    toggleModal,
    handleFormChange,
    handleFormSubmit,
    modalIsOpen
  } = props;

  return (
    modalIsOpen && (
      <div className="modalContainer">
        <div className="modal">
          <Button buttonStyle="close" click={toggleModal} name="&times;" />
          <Form
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
    )
  );
};

export default Modal;
