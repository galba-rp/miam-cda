import React from "react";
import classes from './button.module.css'

const button = (props) => {
  //console.log(props.disabled)
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
      disabled= {props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
