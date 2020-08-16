import React from 'react';
import '../stylesheets/Footer.scss';
import { Link } from 'react-router-dom';


const Footer = (props) => {
    
    return(
        <footer className="footerMain">
            <div className="about">
                <div className="footerHead">
                    <h4>My Stripes</h4>
                </div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div className="contactUs">
                <h4 className="footerHead">Contact Us</h4>
                    <ul>
                        <li>
                            <Link to={'/contact'}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to={'#'}>
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link to={'#'}>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to={'#'}>
                                Shipping & Returns
                            </Link>
                        </li>
                        <li>
                            <Link to={'/Login'}>
                                Admin Login
                            </Link>
                        </li>
                    </ul>
                </div>
        </footer>
    );
};

export default Footer;