import classes from "./welcomePage.module.css";
import React from "react";
import Layout from "../../HOC/Layout/layout";
import Button from "../../components/UI/Button/button";


const welcomePage = (props) => {
  const handleMiam = () => {
    props.history.push("/menu");
  };

    return (
      <Layout>
        <div className={classes.Conatiner}>
          <p className={classes.First}>TRIANGLE DU MIAM </p>
          <p className={classes.Second}>" BECAUSE WE CARE !!! " </p>
          <Button
            btnType={"LargeButton"}
            clicked={handleMiam}
            disabled={false}
          >
            MIAM
          </Button>
        </div>
      </Layout>
    );
}

export default welcomePage;