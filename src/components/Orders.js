import React, { useState, useEffect } from 'react';
import '../stylesheets/Orders.scss';

// Axios
import axios from '../utils/axios';


//want to map all orders
export default function Orders() {

    const [activeSection, setActiveSection] = useState('all');
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        axios.get(`/orders/`)
            .then(res => {
                const order = res.data;
                setOrders(order);
            });
    }, []);

    return (
        <div className="orders-list">
            {activeSection === selected ?
                <>
                    {orders.map(order => (
                        <article className="order-item">
                            <div className="order-item-left">
                                <span>{order.email}</span><br /><br />
                                <span onClick={() => setSelected(order.uuid)} className="date">09/14/2020</span>
                            </div>
                            <div className="order-item-right">
                                <span>{order.amount_cents}</span><br /><br />
                                <span>></span>
                            </div>
                        </article>
                    ))}
                </>
                :
                <>
                    {orders.map(order => (
                        <article className="order-item">
                            <div className="order-item-left">
                                <span>{order.email}</span><br /><br />
                                <span onClick={() => setSelected(order.uuid)} className="date">09/14/2020</span>
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