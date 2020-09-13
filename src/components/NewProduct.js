import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SketchPicker, ChromePicker } from 'react-color';
import { ReactDOM, render } from 'react-dom';
import '../stylesheets/NewProduct.scss';


export default function NewProduct() {

    const { handleSubmit, register } = useForm();
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [colorName, setColorName] = useState("Turquoise");
    var tempSizes = "";
    var tempQuant = "";
    const [currentColor, setCurrentColor] = useState("#3cd6bf");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    //module for color-namer
    var namer = require('color-namer');

    //opens/closes color picker
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    //closes color picker
    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    //change color name before adding to table
    const changeName = (e) => {
        setColorName(e.target.value);
    }

    //changes color, updates color name
    const onChange = (updatedColor) => {
        setCurrentColor(updatedColor);
        var names = namer(updatedColor.hex, { pick: ['ntc'] });
        setColorName(names.ntc[0].name);
    };

    //adds new size item to sizes div.
    const AddSize = () => {
        var newSize = document.getElementById("newSize").value;
        setSize([...size, newSize]);
    };

    //sees what sizes and quantities were selected and available when adding a color then adds them to the table
    const addColor = () => {
        var checkboxes = document.getElementsByName("sizes");
        var selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked == true);
        var name = document.getElementById("newName");
        var price = document.getElementById("newPrice");

        selectedCboxes.forEach(size => {
            tempSizes += size.value + ', ';
            if (size.value.toLowerCase() + "Q" == document.getElementById(size.value.toLowerCase() + 'Q').id) {
                tempQuant += size.value + ': ' + document.getElementById(size.value.toLowerCase() + 'Q').value + ', ';
            }
        });

        if (displayColorPicker == false) {
            setDisplayColorPicker(!displayColorPicker);
        } else {
            if(name != null && price != null) {
                setColor([...color, {
                    name: name.value,
                    hex: currentColor.hex,
                    sizes: tempSizes,
                    quantity: tempQuant,
                    price: price.value
                }
                ]);
                setDisplayColorPicker(!displayColorPicker);
            }
        }

        window.scrollTo(0, 900);
    };

    const onSubmit = data => {
        console.log(data);
    };

    //layout for size item
    const SizeItem = (props) => {
        return (
            <div className="size-quantity-item">
                <input type="checkbox" id={props.size.toLowerCase()} name="sizes" value={props.size} />
                <label htmlFor={props.size.toLowerCase()}>{props.size}</label>
                <input type="number" id={props.size.toLowerCase() + "Q"} name="quantity" min={0} />
            </div>);
    };

    //capitalized first letter in word
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    };

    //basic input
    const InputItem = (props) => {
        return (
            <article className="InputItem">
                <label htmlFor={props.name}>
                    <span>{capitalize(props.name)}</span>
                </label>
                <input className="InputText" type="text" id={props.name} name={props.name} ref={register({ required: true })} />
            </article>
        );
    };

    //used for drop down inputs
    const SelectItem = (props) => {

        return (
            <article className="InputItem">
                <label htmlFor={props.name}>
                    <span>{capitalize(props.name)}</span>
                </label>
                <select className="inputDropdown" id={props.name} name={props.name} ref={register({ required: true })}>
                    <option value={props.select1}>{capitalize(props.select1 === 'U' ? 'Unisex' : props.select1)}</option>
                    <option value={props.select2}>{capitalize(props.select2 === 'W' ? 'Womens' : props.select2)}</option>
                    <option value={props.select3}>{capitalize(props.select3 === 'M' ? 'Mens' : props.select3)}</option>
                </select>
            </article>
        );
    };

    //if a color is added then the create item button is displayed
    const CreateItem = () => {
        if (color.length > 0) {
            return (
                <input
                    type="submit"
                    value="CREATE ITEM"
                />
            );
        } else { return (null); }
    };

    //deletes table row from table
    const deleteColor = (e) => {
        const name = e.target.getAttribute("name");
        setColor(color.filter(color => color.hex !== name));
    };

    return (
        <form className="NewProductForm" onSubmit={handleSubmit(onSubmit)}>
            <section className="NewInfo">
                <InputItem name="name" />
                <InputItem name="SKU" />
                <SelectItem name="category" select1="tops" select2="bottoms" select3="accessories" />
                <InputItem name="description" />
                <SelectItem name="gender" select1="U" select2="W" select3="M" />
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
                    />

                    <article className="size-quantity">
                        <span className="newName">Color Name</span>
                            <input type="text" id="newName" value={colorName} onChange={changeName} placeholder="Enter Color"/>
                        <br/>
                        <span className="newPrice">Price</span>
                            <input type="text" id="newPrice" placeholder="Enter Price"/>
                        <br/>
                        <span>Sizes</span><span>Quantity</span>
                        <div id="sizes">
                            {size.map((size, index) => {
                                return (
                                    <SizeItem size={size} key={index} />
                                )
                            })}
                            <SizeItem size="XS" />
                            <SizeItem size="S" />
                            <SizeItem size="M" />
                            <SizeItem size="L" />
                            <SizeItem size="XL" />
                            <SizeItem size="XXL" />
                        </div>
                        <input type="text" id="newSize" placeholder="Enter New Size" />
                        <button onClick={AddSize}>+</button>
                    </article>
                </>
                : null}
            <button onClick={addColor}>ADD COLOR</button>
            <table>
                <thead>
                    <tr>
                        <th>Color Name</th>
                        <th>Color</th>
                        <th>Sizes Available</th>
                        <th>Price</th>
                        <th>Quantity Available</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {color.map((color, index) => (
                            <tr key={index} >
                                <td><input contentEditable={true} type="text" name={"cName" + index} placeholder="Color Name" value={color.name} ref={register({ required: true })} /></td>
                                <td><label htmlFor={"hex" + index}>
                                        <span
                                            className="Selector-Block"
                                            style={{
                                                background: color.hex,
                                                width: '39px',
                                                height: '39px',
                                                display: 'block'
                                            }} />
                                    </label>
                                </td>
                                <td><input contentEditable={true} type="text" name={"cSizes" + index} placeholder="e.g. XS, S, L" value={color.sizes} ref={register({ required: true })} /></td>
                                <td><input contentEditable={true} type="text" name={"cPrice" + index} placeholder="e.g. $25.99" value={color.price} ref={register({ required: true })} /></td>
                                <td><input contentEditable={true} type="text" name={"cQuantity" + index} placeholder="e.g. XS: 6, S: 8, L: 10" value={color.quantity} ref={register({ required: true })} /></td>
                                <td>
                                    <button name={color.hex} onClick={deleteColor} key={index}>-</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
                {/*ADDS TO CART*/}
                <CreateItem />

        </form>
    )
}