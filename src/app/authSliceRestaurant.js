import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantInfo: localStorage.getItem("restaurantInfo")
    ? JSON.parse(localStorage.getItem("restaurantInfo"))
    : null,
};

const authSliceRestaurant = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentialsRestaurant: (state, action) => {
      state.restaurantInfo = action.payload;
      localStorage.setItem("restaurantInfo", JSON.stringify(action.payload));
    },
    deleteCredentialsRestaurant: (state, action) => {
      state.restaurantInfo = null;
      localStorage.removeItem("restaurantInfo");
    },
  },
});

export const { setCredentialsRestaurant, deleteCredentialsRestaurant } =
  authSliceRestaurant.actions;
export default authSliceRestaurant.reducer;
