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
                    {/* <div className="InputItem">
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
                    </div> */}
                    <div className="InputItem">
                        <label htmlFor="sku">
                            <span>SKU</span>
                        </label>
                        <input className="InputText" type="text" name="sku"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="category">
                            <span>Category</span>
                        </label>
                        <select className="inputDropdown" name="category">
                            <option value='tops'>Tops</option>
                            <option value='bottoms'>Bottoms</option>
                            <option value='accessories'>Accessories</option>
                        </select>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="description">
                            <span>Description</span>
                        </label>
                        <input className="InputText" type="text" name="description"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="gender">
                            <span>Gender</span>
                        </label>
                        <select className="inputDropdown" name="category">
                            <option value='U'>Unisex</option>
                            <option value='W'>Womens</option>
                            <option value='M'>Mens</option>
                        </select>                    
                    </div>
                    <div className="InputItem">
                        <label htmlFor="gender">
                            <span>Photo</span>
                        </label>
                        <div className="photo-upload">

                            <input type="file" id="img" name="img" accept="image/*"></input>
                        </div>
                    </div>
                </div>
                <table>
                    <tr>
                        <th>Color Name</th>
                        <th>Color Hex Code</th>
                        <th>Sizes Available</th>
                        <th>Price</th>
                        <th>Quantity Available</th>                            
                    </tr>
                    <tr>
                        <td contenteditable='true'>Forest Green</td>
                        <td contenteditable='true'>#417505</td>
                        <td contenteditable='true'>XS, S, M, L</td>
                        <td contenteditable='true'>$24.99</td>
                        <td contenteditable='true'>XS: 4, S: 3, M: 2, L: 3</td>
                    </tr>
                    <tr>
                        <td contenteditable='true'>Ocean Blue</td>
                        <td contenteditable='true'>#059FC8</td>
                        <td contenteditable='true'>XS, S, M, L, XL</td>
                        <td contenteditable='true'>$26.99</td>
                        <td contenteditable='true'>XS: 4, S: 3, M: 2, L: 3, XL: 4</td>
                    </tr>
                    <tr>
                        <td contenteditable='true'>Navy Blue</td>
                        <td contenteditable='true'></td>
                        <td contenteditable='true'></td>
                        <td contenteditable='true'></td>
                        <td contenteditable='true'></td>
                    </tr>
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