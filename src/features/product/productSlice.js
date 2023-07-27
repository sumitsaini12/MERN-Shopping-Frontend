import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductsByFilters } from './productAPI';


const initialState = {
  products:[],
  status: "idld"
}

export const fetchAllProductAsync= createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response.data
  }
);


export const fetchProductByFitlerAsync= createAsyncThunk(
  'products/fetchProductByFitler',
  async (filter) => {
    const response = await fetchProductsByFilters(filter);
    return response.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProductAsync.pending, (state)=> {
      state.status = "loading";
    })
    .addCase(fetchAllProductAsync.fulfilled, (state, action)=> {
      state.status = 'idld';
      state.products = action.payload;
    })
    .addCase(fetchProductByFitlerAsync.fulfilled, (state, action)=> {
      state.status = 'idld';
      state.products = action.payload;
    })
  },
})

export const {} = productSlice.actions

export default productSlice.reducer