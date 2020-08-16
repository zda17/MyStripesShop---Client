import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../utils/axios';
import '../../stylesheets/CheckoutForm.scss'
import { CartContext } from '../../utils/CartContext';


const CheckoutForm = ({ userInfo, success, fail }) => {
    const { cart, cartUUID, setCartUUID, total } = useContext(CartContext);
    if (!cartUUID) {
        setCartUUID(localStorage.getItem('UUID'))
    };;
    const centsTotal = total * 100;
    const stripe = useStripe();
    const elements = useElements();

    const createProductSkusAndQuantities = () => {
        const product_skus_and_quantities = [];
        cart.forEach((item, index) => {
            product_skus_and_quantities[index] = [item.sku, `${item.quantity}`];
        })
        return product_skus_and_quantities;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;
            try {
                const payment = await axios.post('/checkout', { id, amount: centsTotal, uuid: cartUUID });

                const product_skus_and_quantities = createProductSkusAndQuantities(); 

                const orderData = {
                    email: userInfo.email,
                    address: userInfo.address,
                    state: 'OK',
                    product_skus_and_quantities,
                    amount_cents: centsTotal,
                    uuid: cartUUID
                };

                const order = await axios.post('/orders', { orderData });

                success(order.id, payment.id);
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

const Payment = ({ userInfo }) => {

    const { total } = useContext(CartContext);

    const [status, setStatus] = useState();
    const [orderNumber, setOrderNumber] = useState();
    const [paymentConfirmation, setPaymentConfirmation] = useState();

    if (status === "success") {
        return (
            <div>
                <p>Payment of <span className="payment_special">${total}</span> successful!</p>
                <p>Payment Confirmation: <span className="payment_special">${paymentConfirmation}</span></p>
                <p>Order Number: <span className="payment_special">${orderNumber}</span></p>
            </div>
        )
    }

    return (
        <>
            <h1>Payment</h1>
            <h4>All transactions are secure and encrypted.</h4>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    userInfo={userInfo}
                    success={(order, payment) => { 
                        setStatus("success");
                        setOrderNumber(order);
                        setPaymentConfirmation(payment);
                    }}
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