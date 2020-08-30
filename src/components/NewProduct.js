import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SketchPicker } from 'react-color';
import { render } from 'react-dom';
import '../stylesheets/NewProduct.scss';
import { findAllByTestId } from '@testing-library/react';
  

export default function NewProduct() {

    const { handleSubmit, register, errors, reset } = useForm();
    const [color, setColor] = useState('#3cd6bf');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    }

    const handleClose = () => {
        setDisplayColorPicker(false);
    }

    const colorArray = [];

    const onChange = (updatedColor) => {
        setColor(updatedColor);
    };

    const onSubmit = (values) => {
        console.log(values)
    }

    const addColor = () => {
        colorArray.push(color.hex);
        console.log(colorArray);
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
                        { displayColorPicker ? <div><SketchPicker
                            color={color}
                            onChangeComplete={onChange}
                            onChange={onChange}
                            disableAlpha={true}
                            width={300}
                        />
                        <button onClick={addColor}>ADD</button></div> : null}
                        
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