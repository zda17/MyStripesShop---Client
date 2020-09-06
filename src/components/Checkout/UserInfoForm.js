import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import '../../stylesheets/UserInfoForm.scss';
import { CartContext } from '../../utils/CartContext';
import { Link } from 'react-router-dom';
import Payment from './CheckoutForm';

const UserInfoForm = ({ open }) => {

    const { register, handleSubmit } = useForm();
    const { paid, userInfo, setUserInfo } = useContext(CartContext);
    const [filledOut, setFilledOut] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    const onSubmit = data => {
        setUserInfo(data);
        setFilledOut(true);
        setShowCheckoutForm(true);
        open();
        window.scrollTo(0, 0);
    };
    
    const formInputs = ['Address', 'Apartment, suite, etc. (optional)', 'City']

    const Inputs = () => {
        return (
            <>
                {formInputs.map((inputStr, index) => (
                    <input
                        type='text'
                        placeholder={inputStr}
                        name={inputStr.toLowerCase().replace(/[, ]+/g, "").replace(/[()]/g, '').trim()}
                        ref={register}
                        key={index}
                    />
                ))}
            </>
        )
    }

    const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona",
        "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", " North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

    const goBackToForm = () => {
        setFilledOut(false);
    }

    return (
        <>
            {!filledOut &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Contact Information</h3>
                    <input type='text' placeholder='Email' name='email' ref={register} />
                    <h3>Shipping Address</h3>
                    <div className='name-div'>
                        <input type='text' placeholder='First name (optional)' className='name first-name' name='firstName' ref={register} />
                        <input type='text' placeholder='Last name' className='name last-name' name='lastName' ref={register} />
                    </div>
                    <Inputs />
                    <div className='name-div'>
                        <select name='country' defaultValue='' ref={register} className='country-select' required>
                            <option value="" disabled hidden>Country/Region</option>
                            <option value="United States">United States</option>
                        </select>
                        <select name='state' defaultValue='' className='state-select' ref={register} required>
                            <option value="" disabled hidden>State</option>
                            {states.map((state, index) => (
                                <option value={state} key={index}>{state}</option>
                            ))}
                        </select>
                        <input type='text' placeholder='ZIP code' className='zip' name='zipCode' ref={register} />
                    </div>
                    <input type='text' placeholder='Phone' className='name' name='phone' ref={register} />
                    <div className='button-div'>
                        <Link to='/Cart' className='back-btn'>
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            Return to cart
                        </Link>
                        <button type='submit' className='ship-btn'>Continue to payment</button>
                    </div>
                </form>
            }
            {filledOut &&
                <section className='user-info-filled-container'>
                    {!paid &&
                        <>
                            <h2>Confirm Info</h2>
                            <section className='user-contact-ship-info'>
                                <section className='contact-div'>
                                    <p><strong>Contact: </strong></p>
                                    <p className='user-email'>{userInfo.email}</p>
                                </section>
                                {/* destructure userInfo? */}
                                <section className='ship-div'>
                                    <p><strong>Ship to: </strong></p>
                                    <p className='user-ship-info'>{userInfo.address}, {userInfo.apartmentsuiteetc.optional && '#' + userInfo.apartmentsuiteetc.optional + ', '}{userInfo.city}, {userInfo.state}, {userInfo.zipCode}, {userInfo.country}</p>
                                </section>
                            </section>
                            <div className='button-div'>
                                <p onClick={goBackToForm} className='back-btn'>
                                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                    Edit Information
                                </p>
                            </div>
                        </>
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