import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SketchPicker, ChromePicker } from 'react-color';
import { render } from 'react-dom';
import '../stylesheets/NewProduct.scss';


export default function NewProduct() {

    const { handleSubmit, register } = useForm();
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
    };

    const addColor = () => {
        setColor([...color, currentColor.hex]);
        console.log(color);
    }

    const onSubmit = data => {
        console.log(data)
    }

    return (
            <form className="NewProductForm" onSubmit={handleSubmit(onSubmit)}>
                <section className="NewInfo">
                    <article className="InputItem">
                        <label htmlFor="name">
                            <span>Name</span>
                        </label>
                        <input className="InputText" type="text" id="name" name="name" ref={register({ required: true })} />
                    </article>
                    <article className="InputItem">
                        <label htmlFor="sku">
                            <span>SKU</span>
                        </label>
                        <input className="InputText" type="text" id="sku" name="sku" ref={register({ required: true })} />
                    </article>
                    <article className="InputItem">
                        <label htmlFor="category">
                            <span>Category</span>
                        </label>
                        <select className="inputDropdown" id="category" name="category" ref={register({ required: true })}>
                            <option value='tops'>Tops</option>
                            <option value='bottoms'>Bottoms</option>
                            <option value='accessories'>Accessories</option>
                        </select>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="description">
                            <span>Description</span>
                        </label>
                        <input className="InputText" type="text" id="description" name="description" ref={register({ required: true })} />
                    </article>
                    <article className="InputItem">
                        <label htmlFor="gender">
                            <span>Gender</span>
                        </label>
                        <select className="inputDropdown" id="gender" name="gender" ref={register({ required: true })}>
                            <option value='U'>Unisex</option>
                            <option value='W'>Womens</option>
                            <option value='M'>Mens</option>
                        </select>
                    </article>
                    <article className="InputItem">
                        <label htmlFor="img">
                            <span>Photo</span>
                        </label>
                        <div className="photo-upload">

                            <input type="file" id="img" name="img" accept="image/*" ref={register({ required: true })} />
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
                            on
                        />
                        <button onClick={addColor}>ADD</button>
                    </>
                    : null}
                <table>
                    <thead>
                        <tr>
                            <th>Color Name</th>
                            <th onClick={handleClick}>Color Hex Code</th>
                            <th>Sizes Available</th>
                            <th>Price</th>
                            <th>Quantity Available</th>
                        </tr>
                    </thead>
                    <tbody>
                    {color.map((hex, index) => (
                        <tr key={index} >
                            <td contenteditable='true' >Name</td>
                            <td contenteditable='true' id="hex" onClick={handleClick} onChange={onChange}>{hex}</td>
                            <td contenteditable='true'>XS, S, M, L, XL</td>
                            <td contenteditable='true'>$24.99</td>
                            <td contenteditable='true'>XS: 4, S: 3, M: 2, L: 3, XL: 6</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/*ADDS TO CART*/}
                <input
                    type="submit"
                    value="CREATE ITEM"
                />

            </form>
    )
}