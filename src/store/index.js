import { createSlice, configureStore } from "@reduxjs/toolkit";

const initCartState = {
  quantity: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    addItem(state, action) {
      console.log("state: ", state);
      const foundItem = state.items.find((item) => item.id === action.item.id);

      if (foundItem) {
        const updateItem = {
          ...foundItem,
          quantity: foundItem.quantity + 1,
        };
        state.items = state.items.map((item) =>
          item.id === updateItem.id ? updateItem : item
        );
      } else {
        state.quantity++;
        state.items.push(action.item);
      }
    },
    removeItem(state, id) {
      const itemToRemove = state.items.find((item) => item.id === id);
      if (itemToRemove.quantity === 1) {
        return {
          quantity: state.quantity--,
          state: state.items.filter((item) => item !== id),
        };
      } else {
        const updateItem = {
          ...itemToRemove,
          quantity: itemToRemove.quantity--,
        };
        return {
          state: state.items.map((item) =>
            item.id === id ? updateItem : item
          ),
        };
      }
    },
    clear() {
      return initCartState;
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;

export default store;
