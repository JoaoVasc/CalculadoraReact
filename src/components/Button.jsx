import React from "react";
import "../main/Calculator.css";

const btns = (props) => {
  return (
    <button
      onClick={(e) => props.click && props.click(props.label)}
      className={`btn 
        ${props.operation ? "operation" : ""}
        ${props.double ? "double" : ""}
        ${props.triple ? "triple" : ""}
    `}
    >
      {props.label}
    </button>
  );
};

export default btns;
