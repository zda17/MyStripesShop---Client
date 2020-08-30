import React, { useState, createContext } from 'react';

export const NewProductContext = createContext('');


export default ({ children }) => {

    const [color, setColor] = useState([]);
    const [currentColor, setCurrentColor] = useState('#3cd6bf');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    return (
        <NewProductContext.Provider
            value={{ displayColorPicker, setDisplayColorPicker, stateChangeHandler: (newState) => setDisplayColorPicker(newState.isOpen), color, setColor, currentColor, setCurrentColor }}
        >
            {children}
        </NewProductContext.Provider>
    )
}