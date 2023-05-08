import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  currentPage: 1,
  inputSearch: "",
  sort: {
    name: "популярности (низ)",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, actions) {
      state.category = actions.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setInputSearch(state, action) {
      state.inputSearch = action.payload;
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setInputSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
