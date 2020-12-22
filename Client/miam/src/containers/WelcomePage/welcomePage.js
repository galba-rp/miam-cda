import classes from "./welcomePage.module.css";
import React, { Component } from "react";
import Layout from "../../HOC/Layout/layout";
import Button from "../../components/UI/Button/button";

class WelcomePage extends Component {
 
  handleMiam = () => {
    this.props.history.push("/menu");
  };
  render() {
    return (
      <Layout>
        <div className={classes.Conatiner}>
          <p className={classes.First}>TRIANGLE DU MIAM </p>
          <p className={classes.Second}>" BECAUSE WE CARE !!! " </p>
          <Button
            btnType={"LargeButton"}
            clicked={this.handleMiam}
            disabled={false}
          >
            MIAM
          </Button>
        </div>
      </Layout>
    );
  }
}

export default WelcomePage;
