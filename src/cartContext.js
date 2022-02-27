import React, { useReducer, useEffect, useContext } from 'react'
import cartReducer from "./cartReducer";

const CartContext = React.createContext(null);

let initialCart;

try {
    initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
    console.error("Could not parse");
    initialCart = [];
}

export function CartProvider(props) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart), [cart]))
    const contextValue = { cart, dispatch }

    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must ne used within a CartProvider.Wrap a parent component in a <CartProvider>")
    }
    return context
}
