import { configureStore } from "@reduxjs/toolkit";


import cartSlice from "./cartSlice";
import filterSllice from "./filterSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    filters: filterSllice.reducer
  },

});

export const cartActions = cartSlice.actions;
export const filtersActions = filterSllice.actions;

export default store;
