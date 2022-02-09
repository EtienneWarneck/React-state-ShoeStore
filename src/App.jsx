import React from "react";
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Header from "./Header";
import Products from "./Products";
import Footer from "./Footer";
import Detail from "./Detail";
import Cart from "./Cart";


export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
