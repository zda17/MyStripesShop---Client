import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import CustomPicker from './MyColorPicker';
import { render } from 'react-dom';
import '../stylesheets/NewProduct.scss';
import { findAllByTestId } from '@testing-library/react';
  

export default function NewProduct() {

    const { handleSubmit, register, errors, reset } = useForm();
    const [color, setColor] = useState([]);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    /*const newProduct = {};
    //colors.splice(0, colors.length);
    products.map(product => colorObject.hasOwnProperty(product.color_name) ? null : colorObject[product.color_name] = product.color_hex);
    const colors = Object.entries(colorObject);
    console.log(colorObject);*/

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    }

    const handleClose = () => {
        setDisplayColorPicker(false);
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <form method="post" className="ProductForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="NewInfo">
                    <div className="InputItem">
                        <label htmlFor="name">
                            <span>Name</span>
                        </label>
                        <input className="InputText" type="text" name="name"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="colors">
                            <span>Colors</span>
                        </label>
                        <input className="InputText" type="text" name="colors" value={color.hex} onClick={ handleClick } readOnly></input>
                        { displayColorPicker ? <CustomPicker/> : null}  
                    </div>
                    <div className="InputItem">
                        <label htmlFor="sizes">
                            <span>Sizes</span>
                        </label>
                        <input className="InputText" type="text" name="sizes"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="price">
                            <span>Price</span>
                        </label>
                        <input className="InputText" type="text" name="price"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="quantity">
                            <span>Quantity</span>
                        </label>
                        <input className="InputText" type="text" name="quantity"></input>
                    </div>
                    {/*ADDS TO CART*/}
                    <input
                        type="submit"
                        value="CREATE ITEM"
                    />
                </div>

            </form>
        </>
    )
}