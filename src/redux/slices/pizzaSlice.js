import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params, thunkAPI) => {
    const { categoryType, search, sortBy, order, currentPage } = params;

    const { data } = await axios.get(
      `https://6446573fee791e1e29fc6cd1.mockapi.io/items?page=${currentPage}&limit=6${categoryType}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Ошибка");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  status: "",
  data: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPazzas(state, actions) {
      state.data = [...actions.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.data = [...action.payload];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.data = [];
    });
  },
});

export const { setPazzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
