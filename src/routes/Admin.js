import React from 'react';

//style
import '../stylesheets/Admin.scss';

//routes

//components
import Header from '../components/Header';

const Admin = () => {
    return (
        <div className="Admin-Panel">
            <Header
                title="Dashboard"
                headerClass="Other-Header"
                divClass="Container-Header"
                hClass="Admin-Header"
            />

            
        </div>
    );
};

export default Admin;