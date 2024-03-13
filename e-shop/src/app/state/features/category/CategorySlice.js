/* React Redux Toolkit  */
import { createSlice } from "@reduxjs/toolkit";

import { getCategories } from "../../../api/apiServices";

/* Initial State */
const initialState = { isLoadingCategory: false, categories: [] };

/* Category Slice */
export const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoadingCategory: true,
        isError: false,
      };
    },
    success: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoadingCategory: false,
        isError: false,
      };
    },
    error: (state, action) => {
      return {
        ...state,
        isLoadingCategory: false,
        isError: true,
      };
    },
  },
});

/* Get  */
export const fetchCategoryDetails = () => async (dispatch) => {
  try {
    const category = await getCategories();
    dispatch(success({ categories: category.categories }));
  } catch (err) {
    dispatch(error(err));
  }
};

/* Category Selector */
export const selectCategory = (state) => state.category;

/* Category Actions */
export const { start, success, error } = categorySlice.actions;

/* Category Reducer */
export const categorySliceReducer = categorySlice.reducer;
