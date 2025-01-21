// src/app/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartslice";

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
