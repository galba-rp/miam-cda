import * as actionTypes from "./actionTypes";

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
