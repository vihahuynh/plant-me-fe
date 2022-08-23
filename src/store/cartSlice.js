import { createSlice, current } from "@reduxjs/toolkit"

const initCartState = {
    quantity: 0,
    items: [],
    checkoutAllItems: false
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
                    quantity: foundItem.quantity + payload.item.quantity,
                };
                state.items = current(state).items.map((item) =>
                    item.id === payload.item.id ? updateItem : item
                );
            } else {
                state.quantity++;
                state.items.push(payload.item);
            }
        },

        removeItem(state, action) {
            const { payload } = action;

            const foundItem = current(state).items.find(
                (item) => item.id === payload.id
            );
            if (foundItem) {
                state.quantity--;
                state.items = current(state).items.filter(
                    (item) => item.id !== payload.id
                );
            }
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

        toggleCheckoutAll(state, action) {
            state.checkoutAllItems = action.payload.value
        }
    },
});

export default cartSlice