import React from "react";
import Modal from "../UI/Modal/modal";
import Button from "../UI/Button/button";

const errorPage = (props) => {
  return (
    <Modal show={true} modalType={"Error"}>
      <h1>Error has happened !!!</h1>
      <p>Please KEEP CALM and TRY AGAIN</p>
      <Button
        btnType={"MediumButton"}
        clicked={() => props.history.push("/menu")}
        disabled={false}
      >
        Réessayer
      </Button>
    </Modal>
  );
};

export default errorPage;
