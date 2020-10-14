import React, { useState, createContext } from 'react';

export const MyContext = createContext('');


export default ({ children }) => {

    const [menuOpenState, setMenuOpenState] = useState(false);
    const [activeBurger, setActiveBurger] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [searched, setSearched] = useState();
    const [showSearch, setShowSearch] = useState();

    return (
        <MyContext.Provider
            value={{ menuOpenState, setMenuOpenState, stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen), activeBurger, setActiveBurger, windowWidth, setWindowWidth, searched, setSearched, showSearch, setShowSearch }}
        >
            {children}
        </MyContext.Provider>
    )
}