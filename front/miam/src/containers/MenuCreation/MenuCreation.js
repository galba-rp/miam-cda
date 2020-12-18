import classes from "./MenuCreation.module.css";
import React, { Component } from "react";
import Day from "../Day/day";
import Button from "../../components/UI/Button/button";
import Modal from "../../components/UI/Modal/modal";
import day from "../Day/day";
import { Redirect } from "react-router";
import Layout from "../../HOC/Layout/layout";

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
    dayNumber: {
      day: 0,
    },
    resultModal: false,
    totalOrder: "",
    selectedDay: 0,
    result: {
      lunch: "",
      dinner: "",
    },
  };
  // function to calculate food on a given day up to lunch of the 52 day
  // from array of 14 meals for the first week
  menu = (arr, day) => {
    let array = arr,
      temp = [];
    let lunch = day * 2 - 2;
    let dinner = day * 2 - 1;

    while (array.length > 1) {
      temp = [];
      let i = 1;
      while (i < array.length) {
        if (array[i] === array[i - 1]) {
          temp.push(array[i]);
        } else if (
          (array[i] == "🍕" && array[i - 1] === "🍣") ||
          (array[i] == "🍣" && array[i - 1] === "🍕")
        ) {
          temp.push("🥦");
        } else if (
          (array[i] == "🍕" && array[i - 1] === "🥦") ||
          (array[i] == "🥦" && array[i - 1] === "🍕")
        ) {
          temp.push("🍣");
        } else if (
          (array[i] == "🍣" && array[i - 1] === "🥦") ||
          (array[i] == "🥦" && array[i - 1] === "🍣")
        ) {
          temp.push("🍕");
        }
        i++;
      }
      arr = arr.concat(temp);
      array = temp;
    }
    let result = {
      lunch: arr[lunch],
      dinner: arr[dinner],
    };

    let res = { ...this.state.result };
    res = result;
    this.setState({ result: res });
  };

  // openModalHandler = () => {
  //   const modal = { ...this.state.modal };
  //   modal.state = true;
  //   this.setState({ modal: modal });
  // };

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

  // sendOrderHandler = () => {
  //   // const state = this.state.totalOrder;
  //   this.props.history.push({
  //     pathname: "/results",
  //     state: {
  //       order: this.state.totalOrder,
  //       day: this.state.selectedDate,
  //     },
  //   });
  // };

  handleDayChange = (e) => {
    let num = e.target.value;
    this.setState({ selectedDay: num });
  };

  // creating array from order and running menu function with chosen day
  calculateHandler = () => {
    const order = this.state.totalOrder;
    const orderArray = [];
    const day = this.state.selectedDay;

    for (let i of order) {
      orderArray.push(i);
    }
    this.menu(orderArray, day);
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

    // checking if the whole week has been ordered to display Calculate modal
    if (this.state.totalOrder.length === 28) {
      calculateModal = true;
    }

    return (
      <Layout>
        {/* <Button btnType={"Success"} clicked={this.openModalHandler}>
          Are you ready
        </Button> */}
        <Modal show={true} className={classes.Flex} modalType={"Main"}>
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
            <p className={classes.Order}>{this.state.totalOrder}</p>
          </div>

          {/* <Button
            btnType={"Danger"}
            clicked={this.sendOrderHandler}
            disabled={toggleOrderButton}
          >
            submit
          </Button> */}
          {/* <Button
            btnType={"Danger"}
            clicked={this.sendOrderHandler}
            disabled={toggleOrderButton}
          >
            submit
          </Button> */}
        </Modal>
        <Modal
          show={calculateModal}
          className={classes.Flex}
          modalType={"Calculate"}
        >
          <form>
            <label htmlFor="dayNum"> Choose a day</label>
            <input
              type="number"
              id="dayNum"
              name="dayNum"
              min="1"
              max="52"
              onChange={(e) => this.handleDayChange(e)}
            ></input>
          </form>
          <Button
            btnType={"Danger"}
            clicked={this.calculateHandler}
            disabled={
              this.state.selectedDay > 0 && this.state.selectedDay < 53
                ? false
                : true
            }
          >
            Calculate
          </Button>
        </Modal>
        <Modal
          show={this.state.resultModal}
          className={classes.Flex}
          modalType={"Result"}
        >
          <h2>Dans {this.state.dayNumber.day} jours tu vas manger</h2>
          <p>
            {this.state.result.lunch} à midi et{this.state.result.dinner} le
            soir
          </p>
        </Modal>
      </Layout>
    );
  }
}

export default MenuCreation;
