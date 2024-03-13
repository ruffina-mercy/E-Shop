/* React Redux Toolkit  */
import { createSlice } from "@reduxjs/toolkit";

/* Initial State */
const initialState = {
  isLoadingItem: false,
  categories: [],
  cartData: [],
  viewCart: [],
};

/* Item Slice */
export const ItemSlice = createSlice({
  name: "Item",
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoadingItem: true,
        isError: false,
      };
    },
    success: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoadingItem: false,
        isError: false,
      };
    },
    error: (state, action) => {
      return {
        ...state,
        isLoadingItem: false,
        isError: true,
      };
    },
  },
});

/* Get  */
export const AddToCart = (item) => async (dispatch, getState) => {
  const state = getState();

  try {
    const prevCartData = state.Item.cartData;
    dispatch(success({ cartData: [...prevCartData, item] }));
  } catch (err) {
    dispatch(error(err));
  }
};
/* Get  */

export const ViewCartDetails = (item) => async (dispatch, getState) => {
  try {
    // Get the current state
    // const state = getState();

    // Get the previous viewCart array from the state
    // const prevViewCart = state.Item.viewCart || [];

    // Dispatch a success action with the updated viewCart array
    dispatch(success({ viewCart: [item] }));
  } catch (err) {
    // Dispatch an error action if there's an error
    dispatch(error(err));
  }
};

export const UpdateCart = (id, type) => async (dispatch, getState) => {
  const state = getState();

  try {
    let newArr;
    const prevCartData = state.Item.cartData;

    if (type === "increment") {
      newArr = prevCartData.map((item) => {
        if (item.idMeal === id) {
          const updatedQuantity = item.quantity + 1;
          const price = item.price;
          return {
            ...item,
            quantity: updatedQuantity,
            totalPrice: price * updatedQuantity, // Calculate new price based on updated quantity
          }; // Increment quantity
        }
        return item; // Return unchanged item if ID doesn't match
      });
    } else if (type === "decrement") {
      newArr = prevCartData
        .map((item) => {
          if (item.idMeal === id) {
            const updatedQuantity = item.quantity - 1;
            if (updatedQuantity <= 0) {
              return null; // Remove item from cartData
            }
            return {
              ...item,
              quantity: updatedQuantity,
              totalPrice: item.price * updatedQuantity, // Calculate new price based on updated quantity
            }; // Update quantity
          }
          return item; // Return unchanged item if ID doesn't match
        })
        .filter(Boolean); // Filter out null items
    }
    dispatch(success({ cartData: newArr }));
  } catch (err) {
    dispatch(error(err));
  }
};

/* Item Selector */
export const selectItem = (state) => state.Item;

/* Item Actions */
export const { start, success, error } = ItemSlice.actions;

/* Item Reducer */
export const ItemSliceReducer = ItemSlice.reducer;
