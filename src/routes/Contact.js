import React, { useState } from 'react';
import '../stylesheets/Contact.scss';
import axios from '../utils/axios';


const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    //handling inputs
    const handleName=(e)=>{
        setName(e.target.value);
    };
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    };
    const handleMessage=(e)=>{
        setMessage(e.target.value);
    };
    //end of handling inputs

    //submitting the form
    const formSubmit=(e)=>{
        e.preventDefault();
        let data = {
            name,
            email,
            message,
        };

        axios.post('/forma',data)
        .then(res=>{
            console.log('Message was sent!');
            resetForm();
        })
        .catch(()=>{
            console.log('message not sent');
        });
    };
    // resetting data
    const resetForm = () => {
        setName("");
        setEmail("");
        setMessage("");
    };

    return(
        <div className="main-container">
            <div className="contactInfo">
                <h1>Contact Us</h1>
                <form onSubmit={formSubmit}>
                    <div className="name-email">
                        <input type="text"
                        name="name"
                        className="name-info"
                        placeholder="Your Name"
                        value={name}
                        onChange={handleName}
                        />
                        <input type="text"
                        name="email"
                        className="email-info" 
                        placeholder="Your Email"
                        value={email}
                        onChange={handleEmail}
                        />
                    </div>
                    <div className="contactForm">
                        <textarea type="text" 
                        name="message" 
                        className="message-info" 
                        placeholder="Your Message"
                        value={message}
                        onChange={handleMessage}
                        ></textarea>
                    </div>
                    <div className="btn">
                        <button className="apply-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
