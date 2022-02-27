import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useCart } from './cartContext';


export default function Cart() {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();

    //create array of urls for each product in the cart
    const urls = cart.map((i) => `products/${i.id}`);
    //call custom hook with mulitple simultaneous requests to each product in cart
    const { data: products, loading, error } = useFetchAll(urls)

    function renderItem(itemInCart) {
        const { id, sku, quantity } = itemInCart;
        const { price, name, image, skus } = products.find((p) => p.id === parseInt(id));
        const { size } = skus.find((s) => s.sku === sku)

        return (
            <li key={sku} className="cart-item">
                <img src={`/images/${image}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>Size:{size}</p>
                    <select
                        aria-label={`Select quantity for ${name} and ${size}`}
                        // onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
                        onChange={(e) => dispatch({
                            type: "update",
                            sku,
                            quantity: parseInt(e.target.value)
                        })
                        }
                        value={quantity}>
                        <option value="0">Remove</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </li>
        )
    }

    if (loading) return <Spinner />;
    if (error) throw error;

    const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <section id="cart">
            <h1>
                {numItemsInCart === 0
                    ? "Your cart is empty"
                    : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
            </h1>
            <ul>{cart.map(renderItem)}</ul>
            {cart.length > 0 && (
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/checkout")}
                >
                    Checkout
                </button>
            )}
        </section>
    );
}

