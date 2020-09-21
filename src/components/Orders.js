import React, { useState, useEffect } from 'react';
import '../stylesheets/Orders.scss';

// Axios
import axios from '../utils/axios';


//want to map all orders
export default function Orders() {

    const [activeSection, setActiveSection] = useState('all');
    const [selected, setSelected] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`/orders/`)
            .then(res => {
                const order = res.data;
                setOrders(order);
            });
    }, []);

    const handleClick = (e) => {
        const index = e.target.key;

    }

    return (
        <div className="orders-list">
            {activeSection === selected ?
                <>
                    {orders.filter(order => order.uuid == selected),
                        console.log(orders),
                        orders.map((order, index) => (
                            <article className="order-item" key={index}>
                                <span>{order.email}</span><br />
                                <span>{new Date(order.created_at).toLocaleDateString()}</span><span>{order.amount_cents}</span><br />
                                <span>Order # </span><br />
                                <span>{order.address + ', ' + order.state}</span><br />
                                <span>Shipping: Standard</span><br />
                                <span>{order.product_skus_and_quantity}</span><br />
                            </article>
                        ))}
                </>
                :
                <>
                    {orders.map((order, index) => (
                        <article className="order-item" onClick={() => { setSelected(order.uuid); setActiveSection(order.uuid); console.log(selected) }} key={index}>
                            <div className="order-item-left">
                                <span>{order.email}</span><br /><br />
                                <span className="date">{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="order-item-right">
                                <span>{order.amount_cents}</span><br /><br />
                                <span>></span>
                            </div>
                        </article>
                    ))}
                </>
            }

        </div>
    )
}