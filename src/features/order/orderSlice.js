import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idld",
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
        state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
