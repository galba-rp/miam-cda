import * as actionTypes from "./actionTypes";
import { push } from "react-router-redux";

export const clearOrder = () => {
    return{
        type: actionTypes.HOME_PAGE
    }
} 

export const homePage = () => {
    return  dispatch => {
        dispatch(push("/"));
        dispatch(clearOrder());
    }

}