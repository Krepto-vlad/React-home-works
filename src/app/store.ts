import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/authorization/authSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
