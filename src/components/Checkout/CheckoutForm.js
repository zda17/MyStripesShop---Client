import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../utils/axios';
import '../../stylesheets/CheckoutForm.scss'
import { CartContext } from '../../utils/CartContext';


const CheckoutForm = ({ success, fail }) => {
    const { cart, cartUUID, setCartUUID, total } = useContext(CartContext);
    if (!cartUUID) {
        setCartUUID(localStorage.getItem('UUID'))
    };
    console.log(cart, cartUUID, total);
    const centsTotal = total * 100;
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;
            try {
                const { data } = await axios.post('/checkout', { id, amount: centsTotal, uuid: cartUUID });
                console.log(data);
                success();
            } catch (error) {
                console.log(error.message);
                fail();
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
                <CardElement />
                <button type='submit' className='pay-btn' disabled={!stripe}>
                    Pay
            </button>
            </form>
        </>
    )
}

const stripePromise = loadStripe("pk_test_51HELKHG3yT4fkVPvmTSvWinnxraM8XWMvM34GcLQd0v4S5i4nXNxwW0U1MmvKV6S1raTKk2zt1zvZwbGYKj7k4C100La8TJxQN")

const Payment = () => {

    const { total } = useContext(CartContext);

    const [status, setStatus] = useState();

    if (status === "success") {
        return <div>Payment of ${total} successful!</div>
    }

    return (
        <>
            <h1>Payment</h1>
            <h4>All transactions are secure and encrypted.</h4>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    success={() => { setStatus("success") }}
                    fail={() => { setStatus("fail") }}
                />
            </Elements>
            {status === "fail" &&
                <div>Payment failed. Please try again.</div>
            }
        </>
    );
}

export default Payment;