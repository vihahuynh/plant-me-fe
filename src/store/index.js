import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./alertSlice";
import cartSlice from "./cartSlice";
import filterSllice from "./filterSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    cart: cartSlice.reducer,
    filters: filterSllice.reducer,
  },

});

export const alertActions = alertSlice.actions;
export const cartActions = cartSlice.actions;
export const filtersActions = filterSllice.actions;

export default store;
