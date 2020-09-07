import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SketchPicker, ChromePicker } from 'react-color';
import { ReactDOM, render } from 'react-dom';
import '../stylesheets/NewProduct.scss';


export default function NewProduct() {

    const { handleSubmit, register } = useForm();
    const [color, setColor] = useState([]);
    const [size, setSize] = useState('');
    var tempSizes = "";
    var tempQuant = "";
    const [currentColor, setCurrentColor] = useState("#3cd6bf");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    //opens/closes color picker
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    //closes color picker
    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    //changes color, needs to make where updates color selected already in table
    const onChange = (updatedColor) => {
        setCurrentColor(updatedColor);
    };

    const changeColor = (e) => {
        const sizesAvailable = e.target.value;
        setColor({
            sizes: sizesAvailable
        })
    }

    //adds new size item to sizes div
    const AddSize = () => {
        var newSize = document.getElementsByName("newSize");
        render(<SizeItem size={newSize.value} />);

        ReactDOM.render(<AddSize />, document.getElementById('sizes'));
    }

    //sees what sizes and quantities were selected and available when adding a color then adds them to the table
    const addColor = () => {
        var checkboxes = document.getElementsByName("sizes");
        var selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked == true);

        selectedCboxes.forEach(size => {
            tempSizes += size.value + ', ';
            if (size.value.toLowerCase() + "Q" == document.getElementById(size.value.toLowerCase() + 'Q').id) {
                tempQuant += size.value + ': ' + document.getElementById(size.value.toLowerCase() + 'Q').value + ', ';
            }
        });

        console.log(selectedCboxes);
        console.log(tempSizes);
        console.log(tempQuant);
        if (displayColorPicker == false) {
            setDisplayColorPicker(!displayColorPicker);
        } else {
            setColor([...color, {
                hex: currentColor.hex,
                sizes: tempSizes,
                quantity: tempQuant
            }
            ]);
            setDisplayColorPicker(!displayColorPicker);
        }

        console.log(color);
        window.scrollTo(0, 900);
    }

    const onSubmit = data => {
        console.log(data)
    }

    const SizeItem = (props) => {
        return (
            <div className="size-quantity-item">
                <input type="checkbox" id={props.size} name="sizes" value={props.size} />
                <label htmlFor={props.size}>{props.size}</label>
                <input type="number" id={props.size + "Q"} name="quantity" min={0} />
            </div>);
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
                    />
                    <article className="size-quantity">
                        <input type="text" id="newSize" placeholder="Enter New Size" />
                        <button onClick={AddSize}>+</button>

                        <span>Sizes</span><span>Quantity</span>
                        <div id="sizes">
                            <div className="size-quantity-item">
                                <input type="checkbox" id={"xs"} name="sizes" value="XS" />
                                <label htmlFor={"xs"}>XS</label>
                                <input type="number" id={"xsQ"} name="quantity" min={0} />
                            </div>
                            <div className="size-quantity-item">
                                <input type="checkbox" id={"s"} name="sizes" value="S" />
                                <label htmlFor={"s"}>S</label>
                                <input type="number" id={"sQ"} name="quantity" min={0} />
                            </div>
                            <div className="size-quantity-item">
                                <input type="checkbox" id={"m"} name="sizes" value="M" />
                                <label htmlFor={"m"}>M</label>
                                <input type="number" id={"mQ"} name="quantity" min={0} />
                            </div>
                            <div className="size-quantity-item">
                                <input type="checkbox" id={"l"} name="sizes" value="L" />
                                <label htmlFor={"l"}>L</label>
                                <input type="number" id={"lQ"} name="quantity" min={0} />
                            </div>
                            <div className="size-quantity-item">
                                <input type="checkbox" id={"xl"} name="sizes" value="XL" />
                                <label htmlFor={"xl"}>XL</label>
                                <input type="number" id={"xlQ"} name="quantity" min={0} />
                            </div>
                            <div className="size-quantity-item">
                                <input type="checkbox" id={"xxl"} name="sizes" value="XXL" />
                                <label htmlFor={"xxl"}>XXL</label>
                                <input type="number" id={"xxlQ"} name="quantity" min={0} />
                            </div>
                        </div>
                    </article>
                </>
                : null}
            <button onClick={addColor}>ADD COLOR</button>
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
                    {color.map((color, index) => (
                        <tr key={index} >
                            <td><input contentEditable={true} type="text" name={"cName" + index} placeholder="Color Name" ref={register({ required: true })} /></td>
                            <td onClick={handleClick}><input type="text" name={"hex" + index} value={color.hex} ref={register({ required: true })} onChange={onChange} /></td>
                            <td><input contentEditable={true} type="text" name={"cSizes" + index} placeholder="e.g. XS, S, L" value={color.sizes} ref={register({ required: true })} /></td>
                            <td><input contentEditable={true} type="text" name={"cPrice" + index} placeholder="e.g. $25.99" ref={register({ required: true })} /></td>
                            <td><input contentEditable={true} type="text" name={"cQuantity" + index} placeholder="e.g. XS: 6, S: 8, L: 10" value={color.quantity} ref={register({ required: true })} /></td>
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