import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../redux/features/Cart/CartSlice"
export const store = configureStore({
  reducer: {
 cart:cartReducer

  },
})