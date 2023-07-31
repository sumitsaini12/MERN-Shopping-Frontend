import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idld",
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    console.log("response", response);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idld";
        state.userOrders = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
