import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TypeCart = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: string;
  sizes: number;
  count: number;
};

interface ICart {
  totalPrice: number;
  items: TypeCart[];
}

const initialState: ICart = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, actions: PayloadAction<TypeCart>) {
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
    minusItem(state, actions: PayloadAction<string>) {
      const item = state.items.find((elem) => elem.id === actions.payload);

      if (item) {
        item.count--;
      }
      state.totalPrice = state.items.reduce((sum, el) => {
        return (sum += el.price * el.count);
      }, 0);
    },
    removeItem(state, actions: PayloadAction<string>) {
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

export const selectCart = (state: RootState) => state.cart;

export const { addItem, minusItem, removeItem, deleteItems } =
  cartSlice.actions;

export default cartSlice.reducer;
