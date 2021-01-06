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
  state = {};

  // back-end connection if orderToApi created
  componentDidMount() {
  if (this.props.orderToApi.order) {
    this.props.getResult(this.props.food)
  }
  }

  // creating array from order and running menu function with chosen day
  calculateHandler = () => {
    this.props.prepareOrder();
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
          modalType={!this.props.resultModal ? "Main" : "MainAnimated"}
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
            !this.props.resultModal ? "Calculate" : "CalculateAnimated"
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
          show={this.props.resultModal}
          day={this.props.selectedDay}
          lunch={this.props.result.lunch}
          dinner={this.props.result.dinner}
          pizza={this.props.result.pizza}
          sushi={this.props.result.sushi}
          veg={this.props.result.veg}
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
    food: state.orderToApi,
    result: state.result,
    resultModal: state.resultModal,
    orderToApi: state.orderToApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNextDay: () => dispatch(menuCreateActions.nextDay()),
    onPrevDay: () => dispatch(menuCreateActions.previousDay()),
    mealChoice: (meal) => dispatch(menuCreateActions.mealChoice(meal)),
    dayChoice: (e) => dispatch(menuCreateActions.dayChoice(e)),
    getResult: (food) => dispatch(menuCreateActions.getResult(food)),
    prepareOrder: () => dispatch(menuCreateActions.prepareOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCreation);
