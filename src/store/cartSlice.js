import { createSlice, current } from "@reduxjs/toolkit";

const initCartState = {
  quantity: 0,
  items: [],
  checkoutAllItems: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    addItem(state, action) {
      const { payload } = action;
      state.checkoutAllItems = false;
      const foundItem = current(state).items.find(
        (item) =>
          item.id === payload.item.id &&
          item.size === payload.item.size &&
          item.color === payload.item.color
      );

      if (foundItem) {
        const updateItem = {
          ...payload.item,
          quantity: foundItem.quantity + payload.item.quantity,
        };
        state.items = current(state).items.map((item) =>
          item.id === payload.item.id &&
          item.size === payload.item.size &&
          item.color === payload.item.color
            ? updateItem
            : item
        );
      } else {
        state.quantity++;
        state.items.push(payload.item);
      }
    },

    removeItem(state, action) {
      const { payload } = action;

      const foundItem = current(state).items.find(
        (item) =>
          item.id === payload.item.id &&
          item.size === payload.item.size &&
          item.color === payload.item.color
      );
      if (foundItem) {
        state.quantity--;
        state.items = current(state).items.filter(
          (item) =>
            item.id !== payload.item.id ||
            item.size !== payload.item.size ||
            item.color !== payload.item.color
        );
      }
    },

    updateItem(state, action) {
      const { payload } = action;
      const foundItem = current(state).items.find(
        (item) =>
          item.id === payload.item.id &&
          item.size === payload.item.size &&
          item.color === payload.item.color
      );
      if (foundItem) {
        state.items = current(state).items.map((item) =>
          item.id === payload.item.id &&
          item.size === payload.item.size &&
          item.color === payload.item.color
            ? payload.item
            : item
        );
      }
    },

    clearCheckoutItems(state) {
      state.items = current(state).items.filter((item) => !item.isCheckout);
      state.quantity = state.items.length;
      state.checkoutAllItems = false;
    },

    clear() {
      return initCartState;
    },

    toggleCheckoutAll(state, action) {
      state.checkoutAllItems = action.payload.value;
    },
  },
});

export default cartSlice;
