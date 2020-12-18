import classes from "./header.module.css";
import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const header = (props) => {
  return (
    <div className={classes.Header}>
      <Link to="/">
        <img className={classes.Logo} src={logo} alt="MIT miam logo" />
      </Link>
    </div>
  );
};

export default header;
