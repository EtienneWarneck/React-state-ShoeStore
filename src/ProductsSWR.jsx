import React, { useState } from "react";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner"
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";
import useSWR from 'swr'
import fetch from 'unfetch'


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useCategory() {
    const { data, loading, error } = useSWR(baseUrl + `products`, fetcher)
    console.log("HERE", data)
    return {
        products: data,
        loading: !error && !data,
        error: error
    }
}

export default function ProductsSWR({ category }) {
    const [size, setSize] = useState("");
    // const { category } = useParams()

    const { products, loading, error } = useCategory(category)




    function renderProduct(p) {
        return (
            <div key={p.id} className="product">
                <Link to={`/${category}/${p.id}`}>
                    <img src={`/images/${p.image}`} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                </Link>
            </div>
        );
    }

    const filteredProducts = size ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) : products;


    if (error) throw error;
    if (loading) return <Spinner />
    if (products.length === 0) return <PageNotFound />


    return (
        <>
            {category === "backpacks" ? <h1></h1> :
                <section id="filters">
                    < label htmlFor="size">Filter by Size:</label>
                    <select id="size" value={size} onChange={(e) => {
                        // debugger;
                        setSize(e.target.value)
                    }}>
                        <option value="">All sizes</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                    {size && <h2>Found {filteredProducts.length} items</h2>}
                </section>
            }
            <section id="products "> {filteredProducts.map(renderProduct)}
            </section>

        </>
    )
}
