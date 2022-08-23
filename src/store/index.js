import { configureStore } from "@reduxjs/toolkit";

import messageSlice from "./messageSlice";
import cartSlice from "./cartSlice";
import filterSllice from "./filterSlice";

const store = configureStore({
  reducer: {
    message: messageSlice.reducer,
    cart: cartSlice.reducer,
    filters: filterSllice.reducer,
  },

});

export const messageActions = messageSlice.actions;
export const cartActions = cartSlice.actions;
export const filtersActions = filterSllice.actions;

export default store;
