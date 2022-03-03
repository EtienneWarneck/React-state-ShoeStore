import React from "react";
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Footer from "./Footer";
import Checkout from "./Checkout.class" // class
import { useCart } from './cartContext';

// let initialCart;

// try {
//   initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
// } catch {
//   console.error("Could not parse");
//   initialCart = [];
// }

export default function App() {

  const { dispatch } = useCart() // to pass to checkout.class

  //MOVED TO CONTEXT
  // const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // useEffect(() => localStorage.setItem("cart", JSON.stringify(cart), [cart]))

  //MOVED TO REDUCER
  // function addToCart(id, sku) {
  //   //The Function Form provides automatically the existing state.
  //   setCart((items) => {
  //     const itemInCart = items.find((i) => i.sku === sku)
  //     if (itemInCart) {
  //       //Return new array,if the item is in the cart, update the quantity
  //       return items.map((i) => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i)
  //     } else {
  //       //return new array, if item not in cart, append new item
  //       return [...items, { id, sku, quantity: 1 }]
  //     }
  //   })
  // }

  // function updateQuantity(sku, quantity) {
  //   setCart((items) => {
  //     return quantity === 0
  //       ? items.filter((i) => i.sku !== sku) //remove
  //       : items.map((i) => i.sku === sku ? { ...i, quantity } : i) //update
  //   })
  // }

  // function emptyCart() {
  //   setCart([])
  // }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
