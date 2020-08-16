import React from 'react';
import {Link} from 'react-router-dom';

const Button = (props) => {
    const {to, classes, text} = props;

    // Mens/Womens Button
    if (classes.includes("Button_Mens-Womens")) {
        return (<Link to={to} className={classes}>{text}</Link>);
    }
    // Animated Button
    if (classes.includes("Button_Animated")) {
        return (<Link to={to} className={classes}>{text}</Link>);
    }
};

export default Button;