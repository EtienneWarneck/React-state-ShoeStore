import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function DetailRefs(props) {
    const { id } = useParams();
    const skuRef = useRef();
    const navigate = useNavigate();
    // const [sku, setSku] = useState("")

    const { data: product, loading, error } = useFetch(`products/${id}`)

    if (loading) return <Spinner />
    if (!product) return <PageNotFound />
    if (error) throw error


    return (
        <div id={"detail"}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <select
                id="size"
                // value={sku}
                ref={skuRef}
            // onChange={(e) => {
            //     setSku(e.target.value)
            // }}
            >
                <option value="">What size?</option>

                {product.skus.map((s) => (
                    <option key={s.sku} value={s.sku} >{s.size}</option>
                ))}

            </select>
            <p>
                <button
                    // disabled={!sku}
                    className="btn btn-primary"
                    onClick={() => {
                        const sku = skuRef.current.value
                        props.dispatch({ type: "add", id: id, sku: sku })
                        navigate("/cart")
                    }} >Add to cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category} />
        </div >
    );
}
