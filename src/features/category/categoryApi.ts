import { baseApiSlice } from "../baseApi";
import { setCategory } from "./categorySlice";

export const categoryApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (restaurantId) => ({
        url: `/category?restaurantId=${restaurantId}`,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, "category");

          dispatch(setCategory(data?.data));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetCategoryQuery } = categoryApi;
