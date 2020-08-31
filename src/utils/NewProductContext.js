import React, { useState, createContext } from 'react';

export const NewProductContext = createContext('');

export const NewProductProvider = (props) => {

    const [color, setColor] = useState([]);
    const [currentColor, setCurrentColor] = useState('#3cd6bf');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    return (
        <NewProductContext.Provider
            value={{ displayColorPicker, setDisplayColorPicker, color, setColor, currentColor, setCurrentColor }}
        >
            {props.children}
        </NewProductContext.Provider>
    )
}