import classes from "./header.module.css";
import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as welcomePageCreateActions from "../../store/actions/indexAct";

const header = (props) => {
  return (
    <div className={classes.Header}>
      <Link to="/" onClick={props.clearOrder}>
        <img className={classes.Logo} src={logo} alt="MIT miam logo" />
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
 return {
    clearOrder: () => dispatch(welcomePageCreateActions.homePage())
  }
}

export default connect(null, mapDispatchToProps)(header);