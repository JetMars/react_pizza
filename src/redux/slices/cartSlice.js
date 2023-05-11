import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, actions) {
      state.items.push(actions.payload);
    },
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
