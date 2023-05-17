import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, actions) {
      const item = state.items.find((elem) => elem.id === actions.payload.id);

      if (item) {
        item.count++;
      } else {
        state.items.push({
          ...actions.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, el) => {
        return (sum += el.price * el.count);
      }, 0);
    },
    minusItem(state, actions) {
      const item = state.items.find((elem) => elem.id === actions.payload);
      item.count--;

      state.totalPrice = state.items.reduce((sum, el) => {
        return (sum += el.price * el.count);
      }, 0);
    },
    removeItem(state, actions) {
      state.items = state.items.filter((item) => item.id !== actions.payload);

      state.totalPrice = state.items.reduce((sum, el) => {
        return (sum += el.price * el.count);
      }, 0);
    },
    deleteItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, deleteItems } =
  cartSlice.actions;

export default cartSlice.reducer;
