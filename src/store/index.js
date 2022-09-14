import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./alertSlice";
import cartSlice from "./cartSlice";
import filterSllice from "./filterSlice";
import authenticationSlice from "./authenticationSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    cart: cartSlice.reducer,
    filters: filterSllice.reducer,
    authentication: authenticationSlice.reducer
  },

});

export const alertActions = alertSlice.actions;
export const cartActions = cartSlice.actions;
export const filtersActions = filterSllice.actions;
export const authenticationActions = authenticationSlice.actions

export default store;
