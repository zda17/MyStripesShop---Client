import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import '../../stylesheets/UserInfoForm.scss';
import { CartContext } from '../../utils/CartContext';
import { Link } from 'react-router-dom';
import Payment from './CheckoutForm';

const UserInfoForm = ({ open }) => {

    const { paid, userInfo, setUserInfo } = useContext(CartContext);
    const { register, errors, reset, handleSubmit } = useForm();
    const [filledOut, setFilledOut] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    const onSubmit = data => {
        setUserInfo(data);
        setFilledOut(true);
        setShowCheckoutForm(true);
        open();
        window.scrollTo(0, 0);
    };

    const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona",
        "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", " North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

    const goBackToForm = () => {
        setFilledOut(false);
        const { email, firstName, lastName, address, apartment, city, country, state, zipCode, phone } = userInfo;
        reset({
            email, firstName, lastName, address, apartment, city, country, state, zipCode, phone
        })
    }

    return (
        <>
            {!filledOut &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Contact Information</h3>
                    <label for='email'><span className='screen-reader-text'>Enter email.</span>
                    </label>
                    <input
                        type='text'
                        id='email'
                        placeholder='Email'
                        name='email'
                        ref={register({ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                    />
                    {errors.email && errors.email.type === 'required' && <h5>*Email is required.</h5>}
                    {errors.email && errors.email.type === 'pattern' && <h5>*Invalid email.</h5>}
                    <h3>Shipping Address</h3>
                    <div className='name-div'>
                        <label for='first-name'><span className='screen-reader-text'>Enter first name.</span>
                        </label>
                        <input
                            type='text'
                            id='first-name'
                            placeholder='First name (optional)'
                            className='name first-name'
                            name='firstName'
                            ref={register}
                        />
                        <label for='last-name'><span className='screen-reader-text'>Enter last name.</span>
                        </label>
                        <input
                            type='text'
                            id='last-name'
                            placeholder='Last name'
                            className='name last-name'
                            name='lastName'
                            ref={register({ required: true })}
                        />
                    </div>
                    {errors.lastName && <h5>*Last name is required.</h5>}
                    <label for='address'><span className='screen-reader-text'>Enter address.</span>
                    </label>
                    <input
                        type='text'
                        id='address'
                        placeholder='Address'
                        name='address'
                        ref={register({ required: true })}
                    />
                    {errors.address && <h5>*Address is required.</h5>}
                    <label for='apartment'><span className='screen-reader-text'>Enter apartment, suite, unit number.</span>
                    </label>
                    <input
                        type='text'
                        id='apartment'
                        placeholder='Apartment, suite, etc. (optional)'
                        name='apartment'
                        ref={register}
                    />
                    <label for='city'><span className='screen-reader-text'>Enter city.</span>
                    </label>
                    <input
                        type='text'
                        id='city'
                        placeholder='City'
                        name='city'
                        ref={register({ required: true })}
                    />
                    {errors.city && <h5>*City is required.</h5>}
                    <div className='name-div'>
                        <label for='country'><span className='screen-reader-text'>Choose country.</span>
                        </label>
                        <select
                            name='country'
                            id='country'
                            defaultValue={userInfo.country}
                            ref={register({ required: true })}
                            className='country-select'
                            required
                        >
                            <option value="" disabled hidden>Country/Region</option>
                            <option value="United States">United States</option>
                        </select>
                        {errors.country && <h5>*Country is required.</h5>}
                        <label for='state'><span className='screen-reader-text'>Choose state.</span>
                        </label>
                        <select
                            name='state'
                            id='state'
                            defaultValue={userInfo.state}
                            className='state-select'
                            ref={register({ required: true })}
                            required
                        >
                            <option value="" disabled hidden>State</option>
                            {states.map((state, index) => (
                                <option value={state} key={index}>{state}</option>
                            ))}
                        </select>
                        {errors.state && <h5>*State is required.</h5>}
                        <label for='zip-code'><span className='screen-reader-text'>Enter ZIP code.</span>
                        </label>
                        <input
                            type='text'
                            id='zip-code'
                            placeholder='ZIP code'
                            className='zip'
                            name='zipCode'
                            ref={register({ required: true })}
                        />
                    </div>
                    {errors.zipCode && <h5>*ZIP code is required.</h5>}
                    <label for='phone'><span className='screen-reader-text'>Enter phone number.</span>
                    </label>
                    <input
                        type='text'
                        id='phone'
                        placeholder='Phone'
                        className='name'
                        name='phone'
                        ref={register({ required: true, minLength: 10, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im })}
                    />
                    {errors.phone && errors.phone.type === 'required' && <h5>*Phone number is required.</h5>}
                    {errors.phone && errors.phone.type === 'minLength' && <h5>*Invalid phone number.</h5>}
                    {errors.phone && errors.phone.type === 'pattern' && <h5>*Invalid phone number.</h5>}
                    <div className='button-div'>
                        <Link to='/Cart' className='back-to-cart-btn'>
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            Return to cart
                        </Link>
                        <button type='submit' className='pay-btn'>Continue to payment</button>
                    </div>
                </form>
            }
            {filledOut &&
                <section className='user-info-filled-container'>
                    {!paid &&
                        <section>
                            <h2>Confirm Info</h2>
                            <section className='user-contact-ship-info'>
                                <div className='contact-div'>
                                    <p><strong>Contact: </strong></p>
                                    <p className='user-email'>{userInfo.email}</p>
                                </div>
                                <div className='ship-div'>
                                    <p><strong>Ship to: </strong></p>
                                    <p className='user-ship-info'>{userInfo.address}, {userInfo.apartment && '#' + userInfo.apartment + ', '}{userInfo.city}, {userInfo.state}, {userInfo.zipCode}, {userInfo.country}</p>
                                </div>
                            </section>
                            <div className='button-div'>
                                <p onClick={goBackToForm} className='back-to-cart-btn'>
                                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                    Edit Information
                                </p>
                            </div>
                        </section>
                    }
                    {showCheckoutForm &&
                        <Payment />
                    }
                </section>
            }

        </>
    )
}


export default UserInfoForm;