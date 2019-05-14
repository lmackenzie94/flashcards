import React from "react";

const Button = props => {
  return (
    <button
      onClick={props.click}
      disabled={props.disabled}
      className={props.buttonStyle}
    >
      {props.name}
    </button>
  );
};

export default Button;
