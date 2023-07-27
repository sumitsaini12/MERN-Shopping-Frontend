import { configureStore } from '@reduxjs/toolkit'
import  productSlice  from '../features/product/productListSlice'

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
})