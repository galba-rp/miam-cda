import classes from "./MenuCreation.module.css";
import React, { Component } from "react";
import Day from "../../components/Day/day";
import Button from "../../components/UI/Button/button";
import Modal from "../../components/UI/Modal/modal";
import axios from "../../axios-miam";
import Results from "../../components/Results/results";
import { connect } from "react-redux";
import * as menuCreateActions from "../../store/actions/indexAct";

class MenuCreation extends Component {
  state = {
    resultModal: false,

    dayTocalculate: 0,
    result: {
      lunch: "",
      dinner: "",
      pizza: 0,
      sushi: 0,
      veg: 0,
    },
  };

  // back-end connection error handling
  componentDidMount() {
    axios.interceptors.request.use((req) => {
      return req;
    });
    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        console.log(error);
        this.props.history.push("/error");
      }
    );
  }

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

  // creating array from order and running menu function with chosen day
  calculateHandler = () => {
    const order = this.props.totalOrder;
    const orderArray = [];
    const day = this.props.selectedDay;
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
      day: this.props.selectedDay,
    };

    // call to api. Default url set in axios-miam.js ()
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
    //console.log(this.props.week)

    // disabling next button  if one of the day's meals hasen't been ordered or if it is sunday
    this.props.week.map((day) => {
      if (day.n === this.props.dayNum) {
        if (day.lunch === "" || day.dinner === "" || this.props.dayNum >= 6) {
          return (toggleNext = true);
        }
      }
    });

    let dayName = this.props.week.map((day) => {
      if (day.n === this.props.dayNum) {
        return day.day;
      }
      // enable next  button to change the day if both meals of the day are ordered
      if (this.props.dayNum === 0) {
        return (togglePrev = true);
      }
    });

    // checking if the whole week has been ordered to display Calculate modal
    if (this.props.totalOrder.length === 28) {
      calculateModal = true;
    }

    return (
      <div className={classes.FlexCol}>
        <Modal
          show={true}
          className={classes.Flex}
          modalType={!this.state.resultModal ? "Main" : "MainAnimated"}
        >
          <Day day={dayName} clicked={(meal) => this.props.mealChoice(meal)} />
          <div className={classes.Flex}>
            <Button
              btnType={"MediumButton"}
              clicked={this.props.onPrevDay}
              disabled={togglePrev}
            >
              Précédent
            </Button>
            <Button
              btnType={"MediumButton"}
              clicked={this.props.onNextDay}
              disabled={toggleNext}
            >
              Suivant
            </Button>
          </div>
          <div className={classes.Message}>
            <p>Voici ta commande :</p>
            <p className={classes.Order}>{this.props.totalOrder}</p>
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
            <label htmlFor="dayNum"> Choisis un jour : </label>
            <input
              type="number"
              id="dayNum"
              name="dayNum"
              min="1"
              max="53"
              onChange={(e) => this.props.dayChoice(e)}
            ></input>
          </form>
          <br />
          <Button
            btnType={"MediumButton"}
            clicked={this.calculateHandler}
            disabled={
              this.props.selectedDay > 0 && this.props.selectedDay < 54
                ? false
                : true
            }
          >
            Abracadabra
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

const mapStateToProps = (state) => {
  return {
    dayNum: state.dayNumber.day,
    totalOrder: state.totalOrder,
    week: state.week,
    selectedDay: state.selectedDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNextDay: () => dispatch(menuCreateActions.nextDay()),
    onPrevDay: () => dispatch(menuCreateActions.previousDay()),
    mealChoice: (meal) => dispatch(menuCreateActions.mealChoice(meal)),
    dayChoice: (e) => dispatch(menuCreateActions.dayChoice(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCreation);
