import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../utils/axios';
import '../../stylesheets/CheckoutForm.scss'
import { CartContext } from '../../utils/CartContext';


const CheckoutForm = ({ success, fail, loading, complete }) => {
    const [disableForm, setDisableForm] = useState('');
    const { cart, cartUUID, setCartUUID, total, setConfCode, userInfo } = useContext(CartContext);

    if (!cartUUID) {
        setCartUUID(localStorage.getItem('UUID'))
    };
    console.log(cart, cartUUID, total);
    const centsTotal = total * 100;
    const stripe = useStripe();
    const elements = useElements();

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#1f7bc5',
                color: 'rgb(0, 38, 72)',
                fontSize: '18px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: 'rgba(128, 128, 128, 0.5)',
                },
            },
            invalid: {
                iconColor: 'rgb(99, 0, 0)',
                color: 'rgb(99, 0, 0)',
            },
        },
    };

    const sendEmail = code => {
        const data = {
            userInfo,
            cart,
            confCode: code
        }
        axios.post('/confirm', data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisableForm('disabled');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            loading();
            const { id } = paymentMethod;
            try {
                const { data } = await axios.post('/checkout', { id, amount: centsTotal, uuid: cartUUID });
                setConfCode(data.confirm);
                success();
                complete();
                sendEmail(data.confirm);
            } catch (error) {
                console.log(error.message);
                fail();
                complete();
                // set more specific error messages -- see https://stripe.com/docs/testing#cards-responses
            }
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='checkout-form'
            >
                <fieldset disabled={disableForm}>
                    <CardElement
                        options={CARD_OPTIONS}
                        className='payment-div'
                    />
                    <button type='submit' className='pay-btn' disabled={!stripe}>
                        <h2>Pay</h2>
                    </button>
                </fieldset>
            </form>
        </>
    )
}

const stripePromise = loadStripe("pk_test_51HELKHG3yT4fkVPvmTSvWinnxraM8XWMvM34GcLQd0v4S5i4nXNxwW0U1MmvKV6S1raTKk2zt1zvZwbGYKj7k4C100La8TJxQN")

const Payment = () => {

    const { paid, setPaid } = useContext(CartContext);

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState();

    if (status === "success") {
        setPaid(true);
    }

    return (
        <>
            {!loading && !paid &&
                <>
                    <h2>Payment</h2>
                    <h4>All transactions are secure and encrypted.</h4>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            success={() => { setStatus("success") }}
                            fail={() => { setStatus("fail") }}
                            loading={() => { setLoading(true) }}
                            complete={() => { setLoading(false) }}
                        />
                    </Elements>
                </>
            }
            {loading && !paid &&
                <div className='loading-wrapper'>
                    <div className="loading-icon"></div>
                </div>
            }
            {
                status === "fail" &&
                <div>Payment failed. Please try again.</div>
            }
        </>
    );

}

export default Payment;