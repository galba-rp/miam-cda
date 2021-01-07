import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
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
  selectedDay: 0,
  totalOrder: "",
  result: {
    dinner: "",
    lunch: "",
    pizza: 0,
    sushi: 0,
    veg: 0,
  },
  orderToApi: {
    order: [],
    day: "",
  },
  resultModal: false,
};
// changing day number on next button click
const nextDay = (state) => {
  const updatedDay = { day: state.dayNumber.day + 1 };
  const updateDay = updateObject(state.dayNumber, updatedDay);
  const updatedState = { dayNumber: updateDay };
  return updateObject(state, updatedState);
};

// changing day number on previous button click
const previousDay = (state) => {
  const updatedDay = { day: state.dayNumber.day - 1 };
  const updateDay = updateObject(state.dayNumber, updatedDay);
  const updatedState = { dayNumber: updateDay };
  return updateObject(state, updatedState);
};

// saving result received from api to state
const setResult = (state, action) => {
  const updateResult = updateObject(state.result, action.resultFromApi);
  const updatedState = { result: updateResult };
  return updateObject(state, updatedState);
};

// once received date from api changing state of resultModal
const setResultModal = (state, action) => {
  const updatedResultModal = { resultModal: action.showModal };
  const updateResultModal = updateObject(state.resultModal, updatedResultModal);
  const updatedState = { resultModal: updateResultModal };
  return updateObject(state, updatedState);
};

// saving selected day to state
const dayChoice = (state, action) => {
  const updatedChoice = { selectedDay: action.event.target.value };
  const updateChoice = updateObject(state.selectedDay, updatedChoice);
  return updateObject(state, updateChoice);
};

// changing state of orderToApi object according to selectedDay and totalOrder
const prepareOrder = (state) => {
  const orderArray = [];
  for (let i of state.totalOrder) {
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
  const updatedOrder = {
    order: orderArray,
    day: state.selectedDay,
  };
  const updateOrder = updateObject(state.orderToApi, updatedOrder);
  const updatedState = { orderToApi: updateOrder };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEXT_DAY:
      return nextDay(state);
    case actionTypes.PREVIOUS_DAY:
      return previousDay(state);

    // receives an array of emoji selected and meal name (lunch or dinner)
    // and updates state accordingly and then updates total result
    case actionTypes.MEAL_CHOICE:
      //updating a day depending on dayNumber.day
      let totalOrd = "";
      return {
        ...state,
        week: [
          ...state.week,
          state.week.map((oneDay) => {
            if (oneDay.n === state.dayNumber.day) {
              oneDay[action.meal[1]] = action.meal[0];
            }
          }),
        ],
        ...state,
        ...state.week.map((day) => {
          totalOrd = totalOrd.concat(day.lunch, day.dinner);
        }),
        totalOrder: totalOrd,
      };
    case actionTypes.DAY_CHOICE:
      return dayChoice(state, action);
    case actionTypes.PREPARE_ORDER:
      return prepareOrder(state);
    case actionTypes.SET_RESULT:
      return setResult(state, action);
    case actionTypes.SHOW_RESULT:
      return setResultModal(state, action);
    default:
      return state;
  }
};

export default reducer;
