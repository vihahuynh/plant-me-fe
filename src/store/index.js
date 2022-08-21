import { createSlice, configureStore, current } from "@reduxjs/toolkit";

const initCartState = {
  quantity: 0,
  items: [],
  payment: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    addItem(state, action) {
      const { payload } = action;
      const foundItem = current(state).items.find(
        (item) => item.id === payload.item.id
      );

      if (foundItem) {
        const updateItem = {
          ...payload.item,
          quantity: payload.item + 1,
        };
        state.items = current(state).items.map((item) =>
          item.id === payload.item.id ? updateItem : item
        );
      } else {
        state.quantity++;
        state.items.push(payload.item);
        state.payment += payload.item.quantity * payload.item.price;
      }
    },

    removeItem(state, action) {
      const { payload } = action;
      state.quantity--;
      state.items = current(state).items.filter((item) => item !== payload.id);
    },

    updateItem(state, action) {
      const { payload } = action;
      const foundItem = current(state).items.find(
        (item) => item.id === payload.item.id
      );
      if (foundItem) {
        state.items = current(state).items.map((item) =>
          item.id === payload.item.id ? payload.item : item
        );
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
