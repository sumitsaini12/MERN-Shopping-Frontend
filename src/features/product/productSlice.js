import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
} from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
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

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategoriesAsync",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrandsAsync",
  async () => {
    const response = await fetchBrands();
    return response.data;
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
      });
    builder
      .addCase(fetchProductByFitlerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFitlerAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        console.log(action.payload.products);
      });
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.categories = action.payload;
      });
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.brands = action.payload;
      });
  },
});

export const {} = productSlice.actions;

//selector
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;

export default productSlice.reducer;
