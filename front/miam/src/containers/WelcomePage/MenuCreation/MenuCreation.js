import classes from "./MenuCreation.module.css";
import React, { Component } from "react";
import Day from "../../Day/day";
import Button from "../../../components/UI/Button/button";
import Modal from "../../../components/UI/Modal/modal";
import day from "../../Day/day";
import { Redirect } from "react-router";

class MenuCreation extends Component {
  state = {
    week: [
      {
        n: 0,
        day: "monday",
        lunch: "",
        dinner: "",
      },
      {
        n: 1,
        day: "tuesday",
        lunch: "",
        dinner: "",
      },
      {
        n: 2,
        day: "wednesday",
        lunch: "",
        dinner: "",
      },
      {
        n: 3,
        day: "thursday",
        lunch: "",
        dinner: "",
      },
      {
        n: 4,
        day: "friday",
        lunch: "",
        dinner: "",
      },
      {
        n: 5,
        day: "saturday",
        lunch: "",
        dinner: "",
      },
      {
        n: 6,
        day: "sunday",
        lunch: "",
        dinner: "",
      },
    ],
    modal: {
      state: false,
    },
    dayNumber: {
      day: 0,
    },
    weekOrderCount: 0,
    totalOrder: "",
    selectedDay: "",
  };

  openModalHandler = () => {
    const modal = { ...this.state.modal };
    modal.state = true;
    this.setState({ modal: modal });
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

  mealChoiceHandler = (meal) => {
    const timeOfTheDay = meal[1];
    const choice = meal[0];
    const week = [...this.state.week];

    week.map((oneDay) => {
      if (oneDay.n === this.state.dayNumber.day) {
        oneDay[timeOfTheDay] = choice;
      }
    });
    this.setState({ week: week });
    this.updateTotalOrder();
  };

  updateTotalOrder = () => {
    let totalOrd = "";
    this.state.week.map((day) => {
      totalOrd = totalOrd.concat(day.lunch, day.dinner);
    });
    this.setState({ totalOrder: totalOrd });
  };

  sendOrderHandler = () => {
    // const state = this.state.totalOrder;
    // const dayToCalc = this.state.dayNumber.selectedDate
    this.props.history.push({
      pathname: "/results",
      state: {
        order: this.state.totalOrder,
        day: this.state.selectedDate,
      },
    });
  };

  hadleDayChange = (e) => {
    let num = e.target.value;
    this.setState({ selectedDate: num });
  };

  render() {
    // getting a name of the day to display dynamically through dayNumber value
    let togglePrev = false;
    let toggleNext = false;
    let toggleOrderButton = true;
    if (this.state.totalOrder.length / 2 === 4) {
      toggleOrderButton = false;
    }

    // disabling next button  if one of the day's meals hasen't been ordered or if it is sunday
    this.state.week.map((day) => {
      if (day.n === this.state.dayNumber.day) {
        if (
          day.lunch === "" ||
          day.dinner === "" ||
          this.state.dayNumber.day === 6
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
        //console.log(this.state.dayNumber);
        return (togglePrev = true);
      }
    });

    return (
      <div>
        <h1>Choose your menu man</h1>

        <Button btnType={"Success"} clicked={this.openModalHandler}>
          Are you ready
        </Button>
        <Modal show={this.state.modal.state} className={classes.Flex}>
          <Day day={dayName} clicked={(meal) => this.mealChoiceHandler(meal)} />
          <div className={classes.Flex}>
            <Button
              btnType={"Neutral"}
              clicked={this.prevDayHandler}
              disabled={togglePrev}
            >
              Précédent
            </Button>
            <Button
              btnType={"Neutral"}
              clicked={this.nextDayHandler}
              disabled={toggleNext}
            >
              Prochain
            </Button>
          </div>
          <div>
            <Button btnType={"Danger"}> Annuler</Button>
          </div>
          <div>
            Your order so far:
            <p>{this.state.totalOrder}</p>
          </div>

          <form>
            <label htmlFor="dayNum"> Choose a day</label>
            <input
              type="number"
              id="dayNum"
              name="dayNum"
              min="1"
              max="20"
              onChange={this.hadleDayChange}
            ></input>
          </form>
          <Button
            btnType={"Danger"}
            clicked={this.sendOrderHandler}
            disabled={toggleOrderButton}
          >
            submit
          </Button>
        </Modal>
      </div>
    );
  }
}

export default MenuCreation;
