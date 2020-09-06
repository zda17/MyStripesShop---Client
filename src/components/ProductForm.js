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

    //creates object to store color names as keys with their Hex Code as values
    const colorObject = {};
    products.map(product => colorObject.hasOwnProperty(product.color_name) ? null : colorObject[product.color_name] = product.color_hex);
    const colors = Object.entries(colorObject);
    
    const sizes = [];
    products.map(product => sizes.includes(product.size) ? null : sizes.push(product.size));

    const [colorPicked, setColorPicked] = useState('');
    const [sizePicked, setSizePicked] = useState('');
    const [outOfStock, setOutOfStock] = useState(false);
    var oos = "";

    useEffect(() => {
        if (colorPicked && sizePicked) {
            //looks for product in that size and color
            const product = products.find(
                (item) => (colorPicked === item.color_name) && (sizePicked === item.size)
            );
            product.quantity_available > 0 ? setOutOfStock(false) : setOutOfStock(true)
        }

    }, [colorPicked, sizePicked]);

    //creates react-hook-form and components
    const { handleSubmit, register, errors, reset } = useForm();
    const { cart, setCart, setIsPaneOpen, setCartUUID, setMaxAvailable, setCurrProduct } = useContext(CartContext);

    //add to cart button
    const onSubmit = (values) => {
        console.log('submit!')
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
                setMaxAvailable(false);
                setCurrProduct('');
            } else if (itemInCart.quantity + 1 > itemInCart.quantity_available) {
                console.log('out of stock!');
                setMaxAvailable(true);
                setCurrProduct(itemInCart.sku);
            }
        } else {
            const lineItem = { base_sku: product.base_sku, sku: product.sku, name: product.name, price: (product.price_cents / 100), totalProductPrice: (product.price_cents / 100), color_name: values.color, size: values.size, photo_url: product.photo_url, quantity: 1, quantity_available: product.quantity_available };
            newCart.push(lineItem);
        }
        //sets cart and opens pane
        setCart(newCart);
        localStorage.setUserCart(newCart);
        setIsPaneOpen(true);
    };

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
                                    <input type="radio" name="color" id={color[0]} value={color[0]} onChange={(e) => setColorPicked(e.target.value)} ref={register({ required: true })} />
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
                                    <input type="radio" name="size" id={size} value={size} onChange={(e) => setSizePicked(e.target.value)} ref={register({ required: true })} />
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
                        {outOfStock ? <p>OUT OF STOCK</p> : null}
                    </div>

                    {/*ADDS TO CART*/}
                    {outOfStock ? 
                        <input disabled="true" type="submit" value="ADD TO CART" />
                        :
                        <input type="submit" value="ADD TO CART" />
                    }

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