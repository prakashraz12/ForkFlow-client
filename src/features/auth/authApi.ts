import { RestaurantLoginResponse } from "@/types/restaurantLogin.type";
import { baseApiSlice } from "../baseApi";
import { setAuthState, setLastUserCredentials } from "./authSlice";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLE_KEY, USER_KEY } from "@/keys";
export const authApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    restaurantLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/restaurant/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          Cookies.set(ACCESS_TOKEN_KEY, data?.data?.tokens?.accessToken);
          Cookies.set(REFRESH_TOKEN_KEY, data?.data?.tokens?.refreshToken);
          Cookies.set(USER_KEY, JSON.stringify(data?.data));
          Cookies.set(ROLE_KEY, data?.data?.role)
          dispatch(
            setAuthState({
              user: data?.data as RestaurantLoginResponse,
              isLogedIn: true,
              role: data?.role,
            })
          );

          dispatch(
            setLastUserCredentials({
              email: data?.data?.email,
              logo: data?.data?.logo,
              bannerImage: data?.data?.bannerImage,
              role: data?.data?.role,
              name: data?.data?.restaurantName,
            })
          );
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
    restaurantUserLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/user/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useRestaurantLoginMutation, useRestaurantUserLoginMutation } =
  authApi;
