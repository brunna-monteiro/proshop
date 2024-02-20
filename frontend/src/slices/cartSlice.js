import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};

const addDecimals = (num) => (Math.round(num * 100) /100).toFixed(2)

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

      //Caculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      //Caculate shipping price (Order over $100: free, otherwise $10)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      //Caculate tax price (15% tax)
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

      //Caculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  }
});

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer;