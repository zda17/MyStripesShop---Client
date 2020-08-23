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

    //creates states for colors and sizes and clears null amount
    const colorObject = {};
    //colors.splice(0, colors.length);
    products.map(product => colorObject.hasOwnProperty(product.color_name) ? null : colorObject[product.color_name] = product.color_hex);
    const colors = Object.entries(colorObject);
    console.log(colorObject);

    const sizes = [];
    //sizes.splice(0, sizes.length);
    products.map(product => sizes.includes(product.size) ? null : sizes.push(product.size));

    //creates react-hook-form and components
    const { handleSubmit, register, errors, reset } = useForm();
    const { cart, setCart, setIsPaneOpen, setCartUUID } = useContext(CartContext);


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
        if (!product) {
            console.log("OUT OF STOCK!");
        } else {

            //looks to see if item exists in cart
            const itemInCart = newCart.find(
                (item) => product.sku === item.sku
            );

            //if exists increment quantity and set new price. else push new line item
            if (itemInCart) {
                let basePrice = itemInCart.totalProductPrice / itemInCart.quantity;
                itemInCart.quantity++;
                itemInCart.totalProductPrice = basePrice * itemInCart.quantity;
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
    };



    /*function handleChange(e) {
        //prints value selected
        console.log(e.target.value);

        //filters to all sizes of value selected
        const productsSelected = products.filter(product => (e.target.value === product.color));

        //deletes all elements and maps new ones??
        colors.splice(0, colors.length);
        productsSelected.map(item => colors.includes(item.color) ? null : colors.push(item.color));
        sizes.splice(0, sizes.length);
        productsSelected.map(item => sizes.includes(item.size) ? null : sizes.push(item.size));

        //re-maps them into Colors and Sizes
        render();
        console.log(colors);
        console.log(sizes);
    }*/

    /*renders colors and sizes
    function render() {
        const listColors = (
            
        );
        ReactDOM.render(listColors, document.getElementById('Colors'));

        const listSizes = (
            
        );
        ReactDOM.render(listSizes, document.getElementById('Sizes'));

    }

    //renders all colors and sizes first. ***there might be a better way to do this******
    setTimeout(render, 1);*/

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
                            {errors.color && (<p>COLOR IS REQUIRED.</p>)}
                            
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
                                            }}/>
                                        <span 
                                            className="__selector"
                                            style={{
                                                borderBottom: 'solid 2px'+ color[1],
                                                height: '2px',
                                                width: '48px',
                                                paddingTop: '4px',
                                                position: 'relative'
                                            }}/>
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
                            {errors.size && (<p>SIZE IS REQUIRED.</p>)}
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

                    {/*ADDS TO CART*/}
                    <input
                        type="submit"
                        value="ADD TO CART"
                    />

                    {/*VIEW CART*/}
                    <div className='button-div'>
                        <Link to='/Cart' className='cart-btn'>
                            VIEW CART
                            <i className="fa fa-shopping-cart cart" aria-hidden="true"></i><i class="fa fa-angle-double-right" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};


export default ProductForm;