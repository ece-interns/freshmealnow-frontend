import { createSlice } from "@reduxjs/toolkit";

//Global state
const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  //slices
  reducers: {
    //actions or payloads
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
