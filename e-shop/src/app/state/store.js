/* React Toolkit */
import { configureStore } from "@reduxjs/toolkit";

import { categorySliceReducer } from "./features/category/CategorySlice";
import { ItemSliceReducer } from "./features/Item/ItemSlice";
import { CartItemListSliceReducer } from "./features/cartItem/CartItemSlice";
export const store = configureStore({
  reducer: {
    category: categorySliceReducer,
    Item: ItemSliceReducer,
    CartItemList: CartItemListSliceReducer,
  },
});
