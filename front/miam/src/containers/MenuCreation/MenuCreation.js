import classes from "./MenuCreation.module.css";
import React, { Component } from "react";
import Day from "../../components/Day/day";
import Button from "../../components/UI/Button/button";
import Modal from "../../components/UI/Modal/modal";
import Layout from "../../HOC/Layout/layout";
import axios from "../../axios-miam";
import Results from "../../components/Results/results";

class MenuCreation extends Component {
  state = {
    week: [
      {
        n: 0,
        day: "LUNDI",
        lunch: "",
        dinner: "",
      },
      {
        n: 1,
        day: "MARDI",
        lunch: "",
        dinner: "",
      },
      {
        n: 2,
        day: "MERCREDI",
        lunch: "",
        dinner: "",
      },
      {
        n: 3,
        day: "JEUDI",
        lunch: "",
        dinner: "",
      },
      {
        n: 4,
        day: "VENDREDI",
        lunch: "",
        dinner: "",
      },
      {
        n: 5,
        day: "SAMEDI",
        lunch: "",
        dinner: "",
      },
      {
        n: 6,
        day: "DIMANCHE",
        lunch: "",
        dinner: "",
      },
    ],
    dayNumber: {
      day: 0,
    },
    resultModal: false,
    totalOrder: "",
    selectedDay: 0,
    dayTocalculate: 0,
    result: {
      lunch: "",
      dinner: "",
      pizza: 0,
      sushi: 0,
      veg: 0,
    },
  };

  // function to convert array of digits received from api to emojis
  digitToEmoji = (arr) => {
    let r = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 1) {
        r.push("🍕");
      } else if (arr[i] === 0) {
        r.push("🍣");
      } else if (arr[i] === -1) {
        r.push("🥦");
      }
    }

    return r;
  };

  nextDayHandler = () => {
    const dayNumber = { ...this.state.dayNumber };
    dayNumber.day++;
    this.setState({ dayNumber: dayNumber });
  };

  prevDayHandler = () => {
    const dayNumber = { ...this.state.dayNumber };
    dayNumber.day--;
    this.setState({ dayNumber: dayNumber });
  };

  // function receives an array of emoji selected and meal name (lunch or dinner)
  // and updates state accordingly
  mealChoiceHandler = (meal) => {
    const timeOfTheDay = meal[1];
    const choice = meal[0];
    const week = [...this.state.week];

    //updating a day depending on dayNumber.day which is updateed through nextDayHandler or prevDayHandler
    week.map((oneDay) => {
      if (oneDay.n === this.state.dayNumber.day) {
        oneDay[timeOfTheDay] = choice;
      }
    });
    this.setState({ week: week });
    this.updateTotalOrder();
  };

  // function to create total order once meals for a whole week
  //have been selected
  updateTotalOrder = () => {
    let totalOrd = "";
    this.state.week.map((day) => {
      totalOrd = totalOrd.concat(day.lunch, day.dinner);
    });
    this.setState({ totalOrder: totalOrd });
  };

  //function to store the day to calculate meals for
  handleDayChange = (e) => {
    let num = e.target.value;
    this.setState({ selectedDay: num });
  };

  // creating array from order and running menu function with chosen day
  calculateHandler = () => {
    const order = this.state.totalOrder;
    const orderArray = [];
    const day = this.state.selectedDay;
    let result = { ...this.state.result };

    // converting emojis to digits to process correctly by API
    for (let i of order) {
      if (i === "🍕") {
        i = 1;
        orderArray.push(i);
      }
      if (i === "🍣") {
        i = 0;
        orderArray.push(i);
      }
      if (i === "🥦") {
        i = -1;
        orderArray.push(i);
      }
    }

    const food = {
      order: orderArray,
      day: this.state.selectedDay,
    };

    // call to api. Default url set in axios-miam.js
    axios
      .post("/calc", food)
      .then((res) => {
        result.lunch = this.digitToEmoji(res.data)[0];
        result.dinner = this.digitToEmoji(res.data)[1];
        result.pizza = res.data[2];
        result.sushi = res.data[3];
        result.veg = res.data[4];
        this.setState({ result: result });
      })
      .catch((error) => console.log(error));

    this.setState({ dayTocalculate: day });
    this.setState({ resultModal: true });
  };

  render() {
    // getting a name of the day to display dynamically through dayNumber value
    let togglePrev = false;
    let toggleNext = false;
    let calculateModal = false;

    // disabling next button  if one of the day's meals hasen't been ordered or if it is sunday
    this.state.week.map((day) => {
      if (day.n === this.state.dayNumber.day) {
        if (
          day.lunch === "" ||
          day.dinner === "" ||
          this.state.dayNumber.day >= 6
        ) {
          return (toggleNext = true);
        }
      }
    });

    let dayName = this.state.week.map((day) => {
      if (day.n === this.state.dayNumber.day) {
        return day.day;
      }
      // enable next  button to change the day if both meals of the day are ordered
      if (this.state.dayNumber.day === 0) {
        return (togglePrev = true);
      }
    });

    // checking if the whole week has been ordered to display Calculate modal
    if (this.state.totalOrder.length === 28) {
      calculateModal = true;
    }

    return (
      <div className={classes.FlexCol}>
        <Modal
          show={true}
          className={classes.Flex}
          modalType={!this.state.resultModal ? "Main" : "MainAnimated"}
        >
          <Day day={dayName} clicked={(meal) => this.mealChoiceHandler(meal)} />
          <div className={classes.Flex}>
            <Button
              btnType={"MediumButton"}
              clicked={this.prevDayHandler}
              disabled={togglePrev}
            >
              Précédent
            </Button>
            <Button
              btnType={"MediumButton"}
              clicked={this.nextDayHandler}
              disabled={toggleNext}
            >
              Prochain
            </Button>
          </div>
          <div className={classes.Message}>
            <p>Voici ta commande:</p>
            <p className={classes.Order}>{this.state.totalOrder}</p>
          </div>
        </Modal>
        <Modal
          show={calculateModal}
          className={classes.Flex}
          modalType={
            !this.state.resultModal ? "Calculate" : "CalculateAnimated"
          }
        >
          <form className={classes.Form}>
            <label htmlFor="dayNum"> Choisis un jour: </label>
            <input
              type="number"
              id="dayNum"
              name="dayNum"
              min="1"
              max="53"
              onChange={(e) => this.handleDayChange(e)}
            ></input>
          </form>
          <br />
          <Button
            btnType={"MediumButton"}
            clicked={this.calculateHandler}
            disabled={
              this.state.selectedDay > 0 && this.state.selectedDay < 54
                ? false
                : true
            }
          >
            Calculate
          </Button>
        </Modal>
        <Results
          show={this.state.resultModal}
          day={this.state.dayTocalculate}
          lunch={this.state.result.lunch}
          dinner={this.state.result.dinner}
          pizza={this.state.result.pizza}
          sushi={this.state.result.sushi}
          veg={this.state.result.veg}
        />
      </div>
    );
  }
}

export default MenuCreation;
