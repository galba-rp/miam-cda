import classes from "./day.module.css";
import React from "react";

const day = (props) => {
 return (
    <div className={classes.Item}>
      <h2 className={classes.Day}>{props.day}</h2>
      <div className={classes.Flex} >
        <div className={classes.Meal}>
          MIDI:
          <p>
            <span onClick={() => props.clicked(["🍕", "lunch"])}>
              🍕
            </span>
            <span onClick={() => props.clicked(["🍣", "lunch"])}>
              🍣
            </span>
            <span onClick={() => props.clicked(["🥦", "lunch"])}>
              🥦
            </span>
          </p>
        </div>
        <div className={classes.Meal}>
          SOIR:
          <p>
            <span onClick={() => props.clicked(["🍕", "dinner"])}>
              🍕
            </span>
            <span onClick={() => props.clicked(["🍣", "dinner"])}>
              🍣
            </span>
            <span onClick={() => props.clicked(["🥦", "dinner"])}>
              🥦
            </span>
          </p>
        </div>
      </div>
    </div>
  );
 }
 
export default day; 

 
    

