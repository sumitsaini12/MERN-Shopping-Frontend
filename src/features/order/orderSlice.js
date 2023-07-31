import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idld",
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.orders.push(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
