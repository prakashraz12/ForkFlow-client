import { baseApiSlice } from "../baseApi";

export const productApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       console.log(data, "data");

    //       saveToken(data?.data?.tokens?.accessToken, ACCESS_TOKEN_KEY)
    //       saveToken(data?.data?.tokens?.refreshToken, REFRESH_TOKEN_KEY)


    //       // document.cookie = `${ACCESS_TOKEN_KEY}=${data.accessToken}; Path=/; Secure;`;
    //       // document.cookie = `${REFRESH_TOKEN_KEY}=${data.refreshToken}; Path=/; Secure;`;
    //       // document.cookie = `${ROLE_KEY}=${data.role}; Path=/; Secure;`;
    //       // document.cookie = `${USER_KEY}=${JSON.stringify(data)}; Path=/; Secure;`;
    //       dispatch(
    //         setAuthState({
    //           user: data?.data as RestaurantLoginResponse,
    //           isLogedIn: true,
    //           role: data?.role,
    //         })
    //       );

    //       dispatch(
    //         setLastUserCredentials({
    //           email: data?.data?.email,
    //           logo: data?.data?.logo,
    //           bannerImage: data?.data?.bannerImage,
    //           role: data?.data?.role,
    //           name: data?.data?.restaurantName
    //         })
    //       )
    //     } catch (err) {
    //       console.error("Login failed:", err);
    //     }
    //   },
    }),
    
  }),
  overrideExisting: true,
});

export const {useCreateProductMutation} =
  productApi;
