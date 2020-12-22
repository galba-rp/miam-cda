import React from "react";
import Modal from "../UI/Modal/modal";
import classes from "./results.module.css";

const results = (props) => {
  let message = "";
  let style = "";
  if (props.veg > props.sushi && props.veg > props.pizza) {
    message = "Hmm beaucoup de légumes, tu peux manger des SCHOKO-BONS !!!";
    style = classes.Green;
  } else {
    message =
      "Pas assez de légumes dans tes repas. Pas de SCHOKO-BONS pour toi !!!";
      style = classes.Red;
  }

  return (
    <div>
      <Modal show={props.show} modalType={"Result"}>
        <h2>Dans {props.day} jours tu vas manger</h2>
        <p className={classes.Order}>
          {props.lunch} à midi et {props.dinner} le soir
        </p>
      </Modal>
      <Modal show={props.show} modalType={"Result"}>
        <h3>Voici tes repas pour les prochains 52 jours et demi</h3>
        <div className={classes.Stats}>
          <p> Pizza : {props.pizza}</p>
          <p> Sushi : {props.sushi}</p>
          <p> Veg : {props.veg}</p>
        </div>
        <p className={[classes.Message, style].join(' ')}>{message}</p>
      </Modal>
    </div>
  );
};

export default results;
