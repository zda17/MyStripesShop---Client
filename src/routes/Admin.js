import React, { useState } from 'react';

//style
import '../stylesheets/Admin.scss';

//routes

//components
import Header from '../components/Header';

//assets
import Add1 from '../utils/images/add 1.png';

const Admin = () => {

    const [activeSection, setActiveSection] = useState('new');

    return (
        <section className="Admin-Panel">
            <Header
                title="Dashboard"
                headerClass="Other-Header"
                divClass="Container-Header"
                hClass="Admin-Header"
            />
            <div className="admin-tab-container">
                <button className={activeSection === 'new' ? "admin-tab-item is-active" : "admin-tab-item"} onClick={() => setActiveSection("new")} style={{paddingBottom: 15}}>
                    <img src={Add1} alt="New" />
                    <span>New</span>
                </button>
                <button className={activeSection === 'orders' ? "admin-tab-item is-active" : "admin-tab-item"} onClick={() => setActiveSection("orders")}>
                    <span>Orders</span>
                </button>
                <button className={activeSection === 'fulfilled' ? "admin-tab-item is-active" : "admin-tab-item"} onClick={() => setActiveSection("fulfilled")}>
                    <span>Fulfilled</span>
                </button>
            </div>

            <section className="Admin-Component">



            </section>

        </section>
    );
};

export default Admin;