import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SketchPicker, ChromePicker } from 'react-color';
import { render } from 'react-dom';
import '../stylesheets/NewProduct.scss';
import { findAllByTestId } from '@testing-library/react';


export default function NewProduct() {

    const { handleSubmit, register, errors, reset } = useForm();
    const [color, setColor] = useState([]);
    const [currentColor, setCurrentColor] = useState('#3cd6bf');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const onChange = (updatedColor) => {
        setCurrentColor(updatedColor);
        console.log(currentColor.hex);
    };

    const addColor = () => {
        setColor([...color, currentColor.hex]);
        console.log(color);
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <form method="post" className="ProductForm" onSubmit={handleSubmit(onSubmit)}>
                <section className="NewInfo">
                    <article className="InputItem">
                        <label htmlFor="name">
                            <span>Name</span>
                        </label>
                        <input className="InputText" type="text" name="name"></input>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="sku">
                            <span>SKU</span>
                        </label>
                        <input className="InputText" type="text" name="sku"></input>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="category">
                            <span>Category</span>
                        </label>
                        <select className="inputDropdown" name="category">
                            <option value='tops'>Tops</option>
                            <option value='bottoms'>Bottoms</option>
                            <option value='accessories'>Accessories</option>
                        </select>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="description">
                            <span>Description</span>
                        </label>
                        <input className="InputText" type="text" name="description"></input>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="gender">
                            <span>Gender</span>
                        </label>
                        <select className="inputDropdown" name="category">
                            <option value='U'>Unisex</option>
                            <option value='W'>Womens</option>
                            <option value='M'>Mens</option>
                        </select>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="gender">
                            <span>Photo</span>
                        </label>
                        <div className="photo-upload">

                            <input type="file" id="img" name="img" accept="image/*"></input>
                        </div>
                    </article>
                </section>
                {displayColorPicker ?
                    <>
                        <SketchPicker
                            color={currentColor}
                            onChange={onChange}
                            disableAlpha={true}
                            width={300}
                        />
                        <button onClick={addColor}>ADD</button>
                    </>
                    : null}
                <table>
                    <tr>
                        <th>Color Name</th>
                        <th onClick={handleClick}>Color Hex Code</th>
                        <th>Sizes Available</th>
                        <th>Price</th>
                        <th>Quantity Available</th>
                    </tr>
                    {color.map(hex => (
                        <tr>
                            <td contenteditable='true'>Name</td>
                            <td contenteditable='true' onClick={handleClick} onChange={onChange}>{hex}</td>
                            <td contenteditable='true'>XS, S, M, L, XL</td>
                            <td contenteditable='true'>$24.99</td>
                            <td contenteditable='true'>XS: 4, S: 3, M: 2, L: 3, XL: 6</td>
                        </tr>
                    ))}
                    
                </table>
                {/*ADDS TO CART*/}
                <input
                    type="submit"
                    value="CREATE ITEM"
                />

            </form>
        </>
    )
}