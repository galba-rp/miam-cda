import * as actionTypes from "../actions/actionTypes";

const initialState = {
  dayNumber: {
    day: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEXT_DAY:
      return {
        ...state,
        dayNumber: {
          ...state.dayNumber,
          day: state.dayNumber.day + 1,
        },
      };
    case actionTypes.PREVIOUS_DAY:
      return {
        ...state,
        dayNumber: {
          ...state.dayNumber,
          day: state.dayNumber.day - 1,
        },
      };
   
    default:
      return state;
  }
};

export default reducer;
