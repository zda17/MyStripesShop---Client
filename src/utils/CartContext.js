import React, { useState, createContext } from 'react';

export const CartContext = createContext('');

export const CartProvider = (props) => {

    const [cart, setCart] = useState([]);
    // Cart uses UUID to pull correct Cart from database
    const [cartUUID, setCartUUID] = useState('');
    const [total, setTotal] = useState(0);
    const [maxAvailable, setMaxAvailable] = useState(false);
    const [currProduct, setCurrProduct] = useState('');
    const [paid, setPaid] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [confCode, setConfCode] = useState('');

    //states for cart pane
    const [isPaneOpen, setIsPaneOpen] = useState(false);

    return (
        <CartContext.Provider value={{ cart, setCart, cartUUID, setCartUUID, total, setTotal, maxAvailable, setMaxAvailable, currProduct, setCurrProduct, paid, setPaid, userEmail, setUserEmail, confCode, setConfCode, isPaneOpen, setIsPaneOpen }}>
            {props.children}
        </CartContext.Provider>
    )
}