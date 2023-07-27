import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});
