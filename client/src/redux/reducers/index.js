import { combineReducers } from "redux";
import user from "./user";
import deskProducts from "./deskProducts";
import currentDeskProduct from "./currentDeskProduct";

export default combineReducers({ deskProducts, user, currentDeskProduct});
