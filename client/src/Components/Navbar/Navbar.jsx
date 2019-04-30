import React from "react";

const Navbar = props => {
  return (
    <React.Fragment>
      <h1>Flashcards</h1>
      <button onClick={props.toggleModal}>Add Card</button>
    </React.Fragment>
  );
};

export default Navbar;
