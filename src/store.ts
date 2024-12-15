import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApiSlice } from "./features/baseApi";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/category/categorySlice";

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
    category:categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(baseApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;