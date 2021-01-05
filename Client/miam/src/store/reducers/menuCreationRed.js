import * as actionTypes from "../actions/actionTypes";

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
    lunch: "",
    dinner: "",
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // changing day number on next button click
    case actionTypes.NEXT_DAY:
      return {
        ...state,
        dayNumber: {
          ...state.dayNumber,
          day: state.dayNumber.day + 1,
        },
      };

    // changing day number on previous button click
    case actionTypes.PREVIOUS_DAY:
      return {
        ...state,
        dayNumber: {
          ...state.dayNumber,
          day: state.dayNumber.day - 1,
        },
      };

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

    // storing the day to calculate meals for
    case actionTypes.DAY_CHOICE:
      return {
        ...state,
        selectedDay: [action.event.target.value],
      };

    case actionTypes.PREPARE_ORDER:
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
      return {
        ...state,
        orderToApi: {
          ...state.orderToApi,
          order: orderArray,
          day: state.selectedDay,
        },
      };

    // saving result to state
    case actionTypes.SET_RESULT:
      console.log([action.resultFromApi]);
      return {
        ...state,
        result: action.resultFromApi,
        resultModal: action.showModal,
      };

    default:
      return state;
  }
};

export default reducer;
