/* React Redux Toolkit  */
import { createSlice } from "@reduxjs/toolkit";

/* Initial State */
const initialState = { isLoadingCartItemList: false, cartIemList: [] };

/* CartItemList Slice */
export const CartItemListSlice = createSlice({
  name: "CartItemList",
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoadingCartItemList: true,
        isError: false,
      };
    },
    success: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoadingCartItemList: false,
        isError: false,
      };
    },
    error: (state, action) => {
      return {
        ...state,
        isLoadingCartItemList: false,
        isError: true,
      };
    },
  },
});

/* Get  */
export const PlaceOrder = (item) => async (dispatch, getState) => {
  try {
    // Get the current state
    const state = getState();

    // Get the previous cart item list from the state
    const prevCartItemList = state.CartItemList.cartItemList || [];

    // Dispatch a success action with the updated cart item list
    dispatch(success({ cartItemList: [...prevCartItemList, item] }));
  } catch (err) {
    // Dispatch an error action if there's an error
    dispatch(error(err));
  }
};

/* CartItemList Selector */
export const selectCartItemList = (state) => state.CartItemList;

/* CartItemList Actions */
export const { start, success, error } = CartItemListSlice.actions;

/* CartItemList Reducer */
export const CartItemListSliceReducer = CartItemListSlice.reducer;
