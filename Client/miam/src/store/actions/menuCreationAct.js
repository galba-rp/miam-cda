import * as actionTypes from "./actionTypes";
import axios from "../../axios-miam";
import { push } from "react-router-redux";

export const nextDay = () => {
  return {
    type: actionTypes.NEXT_DAY,
  };
};

export const previousDay = () => {
  return {
    type: actionTypes.PREVIOUS_DAY,
  };
};

export const mealChoice = (meal) => {
  return  {
    meal: meal,
    type: actionTypes.MEAL_CHOICE,
  };
};

export const dayChoice = (e) => {
  return {
    event: e,
    type: actionTypes.DAY_CHOICE,
  };
};

export const prepareOrder = () => {
  return {
    type: actionTypes.PREPARE_ORDER,
  };
};

export const setResult = (result) => {
  return {
    type: actionTypes.SET_RESULT,
    resultFromApi: result,
  };
};
export const showResult = (value) => {
  return {
    type: actionTypes.SHOW_RESULT,
    showModal: value,
  };
};

export const totalOrder = () => {
  return {
    type: actionTypes.TOTAL_ORDER,
  };
};


// converting digits received from api to emojis
export const digitToEmoji = (digit) => {
  if (digit === 1) {
    digit = "🍕";
  } else if (digit === 0) {
    digit = "🍣";
  } else if (digit === -1) {
    digit = "🥦";
  }
  return digit;
};

// sending request to the API and on success creating result object and dispatchin set result function
export const getResult = (food) => {
  return (dispatch) => {
    // call to api. Default url set in axios-miam.js
    axios
      .post("/calc", food)
      .then((res) => {
        const result = {};
        result.lunch = digitToEmoji(res.data[0]);
        result.dinner = digitToEmoji(res.data[1]);
        result.pizza = res.data[2];
        result.sushi = res.data[3];
        result.veg = res.data[4];
        dispatch(setResult(result));
        dispatch(showResult(true));
      })
      .catch((error) => dispatch(push("/error")));
  };
};
