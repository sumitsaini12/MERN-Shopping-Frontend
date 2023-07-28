import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: "idld",
  totalItems: 0,
};

export const fetchAllProductAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const fetchProductByFitlerAsync = createAsyncThunk(
  "products/fetchProductByFitler",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    const totalItems = await response.headers.get("x-total-count");
    return { products: response.data, totalItems: +totalItems };
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.products = action.payload.products;
      })
      .addCase(fetchProductByFitlerAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        console.log(action.payload.products);
      });
  },
});

export const {} = productSlice.actions;

//selector
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
