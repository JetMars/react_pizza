import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type TypePizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

interface IPizza {
  status: "loading" | "success" | "error";
  data: TypePizza[];
}

const initialState: IPizza = {
  status: "loading",
  data: [],
};

export type TypeFetchPizzas = {
  categoryType: string;
  search: string;
  sortBy: string;
  order: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<TypePizza[], TypeFetchPizzas>(
  "pizza/fetchPizzaStatus",
  async (params, thunkAPI) => {
    const { categoryType, search, sortBy, order, currentPage } = params;

    const { data } = await axios.get<TypePizza[]>(
      `https://6446573fee791e1e29fc6cd1.mockapi.io/items?page=${currentPage}&limit=6${categoryType}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Ошибка");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPazzas(state, actions: PayloadAction<TypePizza[]>) {
      state.data = [...actions.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<TypePizza[]>) => {
        state.status = "success";
        state.data = [...action.payload];
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.data = [];
    });
  },
});

export const { setPazzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
