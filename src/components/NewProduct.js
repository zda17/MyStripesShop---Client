import React from 'react';
import { useForm } from "react-hook-form";
import '../stylesheets/NewProduct.scss';


export default function NewProduct() {

    const { handleSubmit, register, errors, reset } = useForm();

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
                        <input type="text" name="name"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="colors">
                            <span>Colors</span>
                        </label>
                        <input type="text" name="colors"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="sizes">
                            <span>Sizes</span>
                        </label>
                        <input type="text" name="sizes"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="price">
                            <span>Price</span>
                        </label>
                        <input type="text" name="price"></input>
                    </div>
                    <div className="InputItem">
                        <label htmlFor="quantity">
                            <span>Quantity</span>
                        </label>
                        <input type="text" name="quantity"></input>
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