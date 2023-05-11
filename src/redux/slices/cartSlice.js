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
        actions.payload.count = 1;
        state.items.push(actions.payload);
      }

      state.totalPrice = state.items.reduce((sum, el) => {
        return (sum += el.price * el.count);
      }, 0);
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
