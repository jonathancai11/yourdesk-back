import { combineReducers } from "redux";
import user from "./user";
import products from "./products";
import currentProduct from "./currentProduct";

export default combineReducers({ products, user, currentProduct});
