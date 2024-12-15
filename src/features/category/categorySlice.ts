import { CATEGORY_SESSION_KEY } from "@/keys";
import { CategoryResponse } from "@/types/categoryResponse.type";
import { createSlice } from "@reduxjs/toolkit";

interface categoryState {
  category: CategoryResponse[] | [];
}

const initialState: categoryState = {
  category: sessionStorage.getItem(CATEGORY_SESSION_KEY)
    ? JSON.parse(sessionStorage.getItem(CATEGORY_SESSION_KEY) as string)
    : [],
};

const authSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload as CategoryResponse[];
      sessionStorage.setItem(
        JSON.stringify(action.payload),
        CATEGORY_SESSION_KEY
      );
    },
  },
});

export const { setCategory } = authSlice.actions;

export default authSlice.reducer;
