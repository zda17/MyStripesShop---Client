import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from 'react-dom';
//style
import '../stylesheets/ProductForm.scss';
//components
import Header from '../components/Header';
//context
import { CartContext } from '../utils/CartContext';
// localStorage and UUID for identifying users
import localStorage from '../utils/localStorage';
import { v4 as uuid } from 'uuid';
// api to create cart if needed
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const ProductForm = (props) => {

    const { products } = props;
    console.log('render')

    //creates states for colors and sizes and clears null amount
    const colorObject = {};
    //colors.splice(0, colors.length);
    products.map(product => colorObject.hasOwnProperty(product.color_name) ? null : colorObject[product.color_name] = product.color_hex);
    const colors = Object.entries(colorObject);
    console.log(colorObject);

    const sizes = [];
    products.map(product => sizes.includes(product.size) ? null : sizes.push(product.size));

    var oos = "";

    //creates react-hook-form and components
    const { handleSubmit, register, errors, reset } = useForm();
    const { cart, setCart, setIsPaneOpen, setCartUUID, setOutOfStock, setCurrProduct } = useContext(CartContext);


    //add to cart button
    const onSubmit = (values) => {
        // Check if user has UUID stored, if not: create one, store it in LocalStorage and cartContext
        if (!localStorage.hasUUID()) {
            const UUID = uuid();
            localStorage.setItem(UUID);
            setCartUUID(UUID);
            // Create new Cart in Database
            axios.post('/carts', { UUID });
        };

        //creates duplicate
        let newCart = [];
        if (cart) {
            newCart = [...cart]
        }

        //looks for product in that size and color
        const product = products.find(
            (item) => (values.color === item.color_name) && (values.size === item.size)
        );

        //if no product exists
        if (!product || product.quantity_available === 0) {
            console.log("OUT OF STOCK!");
            oos = "OUT OF STOCK!";
        } else {
            oos = "";
            //looks to see if item exists in cart
            const itemInCart = newCart.find(
                (item) => product.sku === item.sku
            );

            //if exists increment quantity and set new price. else push new line item
            if (itemInCart) {
                if (itemInCart.quantity < itemInCart.quantity_available) {
                    let basePrice = itemInCart.totalProductPrice / itemInCart.quantity;
                    itemInCart.quantity++;
                    itemInCart.totalProductPrice = basePrice * itemInCart.quantity;
                    setOutOfStock(false);
                    setCurrProduct('');
                } else if (itemInCart.quantity + 1 > itemInCart.quantity_available) {
                    console.log('out of stock!');
                    setOutOfStock(true);
                    setCurrProduct(itemInCart.sku);
                }
            } else {
                const lineItem = { base_sku: product.base_sku, sku: product.sku, name: product.name, price: (product.price_cents / 100), totalProductPrice: (product.price_cents / 100), color_name: values.color, size: values.size, photo_url: product.photo_url, quantity: 1, quantity_available: product.quantity_available };
                newCart.push(lineItem);
            }
            //sets cart and opens pane
            setCart(newCart);
            console.log(newCart);
            localStorage.setUserCart(newCart);
            setIsPaneOpen(true);
        }
        render();
    };

    function render() {
        const outOfOrder = (
            <p>{oos}</p>
        );
        ReactDOM.render(outOfOrder, document.getElementById('Errors'));

    }

    return (
        <form method="post" className="ProductForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="ProductOptions">
                <div className="ProductSelect">

                    <Header
                        title="COLOR"
                        headerClass="Other-Header"
                        divClass="Container-Header"
                        hClass="Product-Header Padding"
                        subHClass="No-Sub"
                    />

                    {/*Maps all Colors -- color[0]=name color[1]=hex*/}
                    <div id="Colors" className="Colors">
                        <ul>
                            {errors.color && (<p role="alert">COLOR IS REQUIRED.</p>)}

                            {colors.map((color, id) => (
                                <li key={id}>
                                    <input type="radio" name="color" id={color[0]} value={color[0]} ref={register({ required: true })} />
                                    <label className={color[0]} htmlFor={color[0]}>
                                        <span
                                            className="Selector-Block"
                                            style={{
                                                background: color[1],
                                                width: '48px',
                                                height: '48px',
                                                display: 'block'
                                            }} />
                                        <span
                                            className="__selector"
                                            style={{
                                                borderBottom: 'solid 2px' + color[1],
                                                height: '2px',
                                                width: '48px',
                                                paddingTop: '4px',
                                                position: 'relative'
                                            }} />
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/*Header for sizes*/}
                    <Header
                        title="SIZES"
                        headerClass="Other-Header"
                        divClass="Container-Header"
                        hClass="Product-Header Padding"
                        subHClass="No-Sub"
                    />

                    {/*sizes you can pick*/}
                    <div id="Sizes" className="Sizes">
                        <ul>
                            {errors.size && (<p role="alert">SIZE IS REQUIRED.</p>)}
                            {sizes.map((size, index) => (
                                <li className={size} key={index}> {/*<--prop used for showing out of order (not made yet)*/}
                                    <input type="radio" name="size" id={size} value={size} ref={register({ required: true })} />
                                    <label htmlFor={size}>
                                        <span className={size}>
                                            {size}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/*OUT OF STOCK*/}
                    <div id="Errors" className="Errors">

                    </div>

                    {/*ADDS TO CART*/}
                    <input
                        type="submit"
                        value="ADD TO CART"
                    />

                    {/*VIEW CART*/}
                    <div className='button-div'>
                        <Link to='/Cart' className='cart-btn'>
                            VIEW CART
                            <i className="fa fa-shopping-cart cart" aria-hidden="true"></i><i className="fa fa-angle-double-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};


export default ProductForm;