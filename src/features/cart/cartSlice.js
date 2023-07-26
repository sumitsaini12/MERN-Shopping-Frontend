import { createSlice } from '@reduxjs/toolkit'
import { fetchCarts } from './cartAPI';


const initialState = {
  items:[],
  status: "idld"
}

export const fetchAsync= createAsyncThunk(
  'carts/fetchItems',
  async () => {
    const response = await fetchCarts();
    return response.data
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAsync.pending, (state)=> {
      state.status = "loading";
    })
    .addCase(fetchAsync.fulfilled, (state, action)=> {
      state.status = 'idld';
      state.items += action.payload;
    })
  },
})

export const {} = cartSlice.actions

export default cartSlice.reducer