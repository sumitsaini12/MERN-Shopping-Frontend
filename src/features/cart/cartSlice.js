import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchItemsByUserId,
  updateCart,
  deleteItemFromCart,
  resetCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idld",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    console.log("user response", response);
    return response.data;
  }
);

export const updataCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    await deleteItemFromCart(itemId);
    return itemId;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    console.log("response delete", response);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.items = action.payload;
      })
      .addCase(updataCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updataCartAsync.fulfilled, (state, action) => {
        state.status = "idld";
        const Index = state.items.findIndex((p) => p.id === action.payload.id);
        state.items[Index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idld";
        const Index = state.items.findIndex((p) => p.id === action.payload);
        state.items.splice(Index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.items = [];
      });
  },
});

export const {} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
