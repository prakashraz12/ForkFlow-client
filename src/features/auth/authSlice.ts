import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REMEMBER_USER_CREDENTIALS_WHEN_LOGIN_KEY,
  ROLE_KEY,
  USER_KEY,
} from "@/keys";
import { RestaurantLoginResponse } from "@/types/restaurantLogin.type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  user: RestaurantLoginResponse | null;
  lastUserCredentials: null;
}

const initialState: AuthState = {
  isLoggedIn: Cookies.get(ACCESS_TOKEN_KEY) && Cookies.get(REFRESH_TOKEN_KEY) ? true :  false,
  role: Cookies.get(ROLE_KEY) || null,
  user: Cookies.get(USER_KEY) ? JSON.parse(Cookies.get(USER_KEY)as string) :  null,
  lastUserCredentials: localStorage.getItem(
    REMEMBER_USER_CREDENTIALS_WHEN_LOGIN_KEY
  )
    ? JSON.parse(
        localStorage.getItem(REMEMBER_USER_CREDENTIALS_WHEN_LOGIN_KEY) as string
      )
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(
      state,
      action: PayloadAction<{
        user: RestaurantLoginResponse;
        isLogedIn: boolean;
        role: string;
      }>
    ) {
      state.isLoggedIn = action.payload.isLogedIn;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },

    setLastUserCredentials: (state, action) => {
      state.lastUserCredentials = action.payload;
      localStorage.setItem(
        REMEMBER_USER_CREDENTIALS_WHEN_LOGIN_KEY,
        JSON.stringify(action.payload),
      );
    },
    clearAuthState(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;

      Cookies.remove(USER_KEY)
      Cookies.remove(ACCESS_TOKEN_KEY)
      Cookies.remove(REFRESH_TOKEN_KEY)
      Cookies.remove(ROLE_KEY)

    },

    clearLastUserLoginDetails(state) {
      state.lastUserCredentials = null;
      localStorage.removeItem( REMEMBER_USER_CREDENTIALS_WHEN_LOGIN_KEY)
    }
  },
});

export const { setAuthState, clearAuthState, setLastUserCredentials, clearLastUserLoginDetails } =
  authSlice.actions;

export default authSlice.reducer;
