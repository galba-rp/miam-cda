import * as actionTypes from "./actionTypes";
import axios from "../../axios-miam";

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
  return {
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

export const setResult = (result) => {
  return {
    type: actionTypes.SET_RESULT,
    result: result,
  };
};

export const getResult = (order, day) => {
  // return (dispatch) => {
  //   axios.interceptors.request.use((req) => {
  //     return req;
  //   });
  //   axios.interceptors.response.use(
  //     (res) => {
  //       dispatch(setResult(res.data));
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.props.history.push("/error");
  //     }
  //   );
  // };
};
