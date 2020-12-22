import classes from "./day.module.css";
import React, { Component } from "react";

class Day extends Component {
  state = {};
  render() {
    let dayName = this.props.day;
    return (
      <div className={classes.Item}>
        <h2>{this.props.day}</h2>
        <div className={classes.Flex}>
          <div>
            MIDI:
            <p>
              <span onClick={() => this.props.clicked(["🍕", "lunch"])}>
                🍕
              </span>
              <span onClick={() => this.props.clicked(["🍣", "lunch"])}>
                🍣
              </span>
              <span onClick={() => this.props.clicked(["🥦", "lunch"])}>
                🥦
              </span>
            </p>
          </div>
          <div>
            SOIR:
            <p>
              <span onClick={() => this.props.clicked(["🍕", "dinner"])}>
                🍕
              </span>
              <span onClick={() => this.props.clicked(["🍣", "dinner"])}>
                🍣
              </span>
              <span onClick={() => this.props.clicked(["🥦", "dinner"])}>
                🥦
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Day;
