import React, { useState, createContext } from 'react';

export const CartContext = createContext('');

export const CartProvider = (props) => {

    const [cart, setCart] = useState([]);
    // Cart uses UUID to pull correct Cart from database
    const [cartUUID, setCartUUID] = useState('');
    const [total, setTotal] = useState(0);

    //states for cart pane
    const [isPaneOpen, setIsPaneOpen] = useState(false);

    return (
        <CartContext.Provider value={{ cart, setCart, cartUUID, setCartUUID, total, setTotal, isPaneOpen, setIsPaneOpen }}>
            {props.children}
        </CartContext.Provider>
    )
}