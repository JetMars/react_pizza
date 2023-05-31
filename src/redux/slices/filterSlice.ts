import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TypeSort = {
  name: string;
  sortProperty: string;
};

export type IFilter = {
  category: number;
  currentPage: number;
  inputSearch: string;
  sort: TypeSort;
};

const initialState: IFilter = {
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
    setCategory(state, actions: PayloadAction<number>) {
      state.category = actions.payload;
    },
    setSort(state, action: PayloadAction<TypeSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setInputSearch(state, action: PayloadAction<string>) {
      state.inputSearch = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilter>) {
      state.sort = action.payload.sort;
      state.category = Number(action.payload.category);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setCategory,
  setSort,
  setCurrentPage,
  setInputSearch,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
