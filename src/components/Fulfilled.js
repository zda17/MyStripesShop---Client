import React, { useState, useEffect } from 'react';
import '../stylesheets/Orders.scss';


// Axios
import axios from '../utils/axios';


//want to map all Fulfill
export default function Fulfill() {

    const [activeSection, setActiveSection] = useState('all');
    const [selected, setSelected] = useState('');
    const [fulfill, setFulfill] = useState([]);

    useEffect(() => {
        axios.get(`/orders/fulfilled`)
            .then(res => {
                const order = res.data;
                setFulfill(order);
            });
    }, []);

    // Some product SKUs end in a size, and some end in a color. This makes sure to return the size.
    const getSecondPart = str => {
        let index = 0;
        for (let i = 0; i < 5; i++) {
            if (str.split('-')[i] != undefined) {
                index = i;
            }
        }
        const last = str.split('-')[index];
        const sizes = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "5", "5.5", "6", "6.6", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5"]
        let sizeLast = false;
        for (let i = 0; i < sizes.length; i++) {
            if (sizes[i] == last) {
                sizeLast = true;
            }
        }
        return sizeLast ? str.split('-')[index] : str.split('-')[index - 1];
    }

    const handleClick = (e) => {
        setActiveSection('all');
    }

    const SelectedItem = () => {
        const selectedOrder = fulfill.filter(order => order.uuid == selected);

        return (
            <article className="order-item" style={{ borderTop: 'solid 1px rgb(95, 95, 95)', margin: '15px 0px 20px', borderBottom: 'none' }}>
                <span>{selectedOrder[0].email}</span><br />
                <span style={{ color: 'rgb(95, 95, 95)' }}>{new Date(selectedOrder[0].created_at).toLocaleDateString()}</span><span>{'$' + (selectedOrder[0].amount_cents / 100).toFixed(2)}</span><br />
                <span>Order # {selectedOrder[0].id}</span><br />
                <span>{selectedOrder[0].address}</span><br />
                <span>Shipping: Standard</span><br />
                {selectedOrder[0].product_skus_and_quantity.map((item, index) => (
                    <section className="order-product-item" key={index}>
                        <div className="img-container">
                            <img src="https://i.imgur.com/Gn9PPb3.png"></img>
                        </div>
                        <span>{"QTY: " + item[1] + "\u000A\u000A" + "SIZE: " + getSecondPart(item[0])}</span>
                    </section>
                ))}
            </article>

        )
    }

    const OrderItem = () => {
        console.log(fulfill);
        return (
            fulfill.map((order, index) => (
                <article className="order-item" onClick={() => { setSelected(order.uuid); setActiveSection(order.uuid); console.log(selected) }} key={index}>
                    <div className="order-item-left">
                        <span>{order.email}</span><br /><br />
                        <span className="date">{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="order-item-right">
                        <span>{'$' + (order.amount_cents / 100).toFixed(2)}</span><br /><br />
                        <span>{'>'}</span>
                    </div>
                </article>
            ))
        )
    }

    return (
        <div className="orders-list">
            {activeSection === selected ?
                <>
                    <button onClick={handleClick}>Back</button>
                    <SelectedItem />
                </>
                :
                <>
                    <OrderItem />
                </>
            }

        </div>
    )
}