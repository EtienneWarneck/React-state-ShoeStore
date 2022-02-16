import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Footer from "./Footer";


export default function App() {



  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("Could not parse");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart), [cart]))


  function addToCart(id, sku) {
    //The Function Form provides automatically the existing state.
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku)
      if (itemInCart) {
        //Return new array,if the item is in the cart, update the quantity
        return items.map((i) => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i)
      } else {
        //return new array, if item not in cart, append new item
        return [...items, { id, sku, quantity: 1 }]

      }
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      // if (quantity === 0) {
      //   //keep all sku that don't have sku passed in if quantity is 0
      //   return items.filter((i) => i.sku !== sku)
      // } else {
      //   return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
      // }
      return quantity === 0
        ? items.filter((i) => i.sku !== sku) //remove
        : items.map((i) => i.sku === sku ? { ...i, quantity } : i) //update
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
