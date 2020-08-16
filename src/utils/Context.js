import React, { useState, createContext } from 'react';

export const MyContext = createContext('');


export default ({ children }) => {

    const [menuOpenState, setMenuOpenState] = useState(false);
    const [activeBurger, setActiveBurger] = useState(false);

    return (
        <MyContext.Provider
            value={{ menuOpenState, setMenuOpenState, stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen), activeBurger, setActiveBurger }}
        >
            {children}
        </MyContext.Provider>
    )
}