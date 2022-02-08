import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import useFetch from "./services/useFetch";
// import { getProducts } from "./services/productService"
import Spinner from "./Spinner"

export default function App() {
  const [size, setSize] = useState("");
  //Make this a Custom hook and change the promise chain to be async/await...
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   getProducts("shoes").then((response) => setProducts(response)).catch((e) => setError(e)).finally(() => setLoading(false))
  // }, [])


  const { data: products, loading, error } = useFetch("products?category=shoes")


  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) : products;

  if (error) throw error;

  if (loading) return <Spinner />

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e) => {
              // debugger;
              setSize(e.target.value)
            }}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size && <h2>Found {filteredProducts.length} intems</h2>}
          </section>
          <section id="products "> {filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
