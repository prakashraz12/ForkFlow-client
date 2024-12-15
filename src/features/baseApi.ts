/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    BaseQueryApi,
    createApi,
    FetchArgs,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { Mutex } from "async-mutex";
  import { BACKEND_URL } from "@/config";
//   import { getCookie } from "@/lib/utils";
//   import { clearAuthState } from "./auth/authSlice";
  import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/keys";
import { getToken } from "@/utils/getToken.util";
import Cookies from "js-cookie";

  interface RefreshTokenResponse {
    accessToken?: string;
  }
  
  const mutex = new Mutex();
  
  const AccessTokens = Cookies.get(ACCESS_TOKEN_KEY);
  const RefreshTokens = getToken(`${REFRESH_TOKEN_KEY}`);
  
  const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_URL,
    // eslint-disable-next-line no-unused-vars
    prepareHeaders: (headers, _) => {
      if (AccessTokens) {
        console.log(AccessTokens)
        headers.set("Authorization", `Bearer ${AccessTokens}`);
      }
      return headers;
    },
  });
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseQueryWithReauth = async (
    args: FetchArgs,
    api: BaseQueryApi,
    extraOptions: any,
  ) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          if (AccessTokens) {
            const refreshResult = await baseQuery(
              {
                url: "/auth/refresh/token",
                method: "POST",
                body: {
                  RefreshTokens,
                },
              },
              api,
              extraOptions,
            );
  
            if ((refreshResult.data as RefreshTokenResponse).accessToken) {
              document.cookie = `${ACCESS_TOKEN_KEY}=${(refreshResult.data as RefreshTokenResponse).accessToken}; Path=/; Secure;`;
              result = await baseQuery(args, api, extraOptions);
            } else if (refreshResult.error?.status === 401) {
              // api.dispatch(re());
            }
          } else {
            // api.dispatch(clearAuthState());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  
    return result;
  };
  
  export const baseApiSlice = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
  });