import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../frontutils/cartUtils";

const initialState = localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((curr) => curr._id === item._id);

      // Check if the current item already exist in the shopping cart
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

      return updateCart(state)
    }
  }
});

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer;
