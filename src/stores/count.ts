import { createSlice } from "@reduxjs/toolkit";

interface CountState {
  value: number;
}

const initialState: CountState = {
  value: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
  },
});

export const { increment, decrement } = countSlice.actions;

export default countSlice.reducer;
