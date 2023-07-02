import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
};

const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.data.find(
        (prodcut) => prodcut._id === action.payload._id
      );
      if (existItem) {
        const newItems = state.data.filter((product) => {
          if (product._id === action.payload._id) product.quantity += 1;
          return true;
        });
        state.data = [...newItems];
      } else {
        const product = { ...action.payload, quantity: 1 };
        state.data = [...state.data, product];
      }
      localStorage.setItem("products", JSON.stringify(state.data));
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter(
        (product) => product._id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.data));
    },
    clearCart: (state, action) => {
      state.data = [];
      localStorage.removeItem("products");
    },
    decreaseQnty: (state, action) => {
      const existItem = state.data.find(
        (prodcut) => prodcut._id === action.payload
      );
      if (existItem && existItem.quantity > 1) {
        const newItems = state.data.filter((product) => {
          if (product._id === action.payload) product.quantity -= 1;
          return true;
        });
        state.data = [...newItems];
        localStorage.setItem("products", JSON.stringify(state.data));
      } else {
        state.data = state.data.filter(
          (product) => product._id !== action.payload
        );
        localStorage.setItem("products", JSON.stringify(state.data));
      }
    },
  },
});

export const { addToCart, decreaseQnty, clearCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
