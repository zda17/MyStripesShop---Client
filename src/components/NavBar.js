import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../utils/Context';
import { stack as Menu } from 'react-burger-menu';
import logo from '../utils/images/logo.png';
import insta from '../utils/images/insta.png';
import '../stylesheets/Burger.scss';
import '../stylesheets/NavBar.scss';
import { Cart } from '../components/Cart';

// Instagram icon for bottom of side menu
const Icon = () => {
    return (
        <>
            <hr className='line'></hr>
            <div className='insta'>
                <Link to='#'><img className='insta-icon' src={insta} alt='Instagram' /></Link>
            </div>
        </>
    )
}

// Burger and side menu
const BurgerMenu = () => {
    const { menuOpenState, setMenuOpenState, stateChangeHandler } = useContext(MyContext);
    return (
        <Menu
            right
            noOverlay
            disableAutoFocus
            width={280}
            height={'100vh'}
            isOpen={menuOpenState}
            onClose={() => setMenuOpenState(false)}
            onStateChange={(state) => stateChangeHandler(state)}
        >
            <Link id='shop' to='/Products/All'>SHOP</Link>
            <Link id='about' to='/About'>ABOUT</Link>
            <Link id='contact' to='/Contact'>CONTACT</Link>
            <Icon />
        </Menu>
    )
};

// Non-burger top menu
const NoBurger = () => {
    return (
        <>
            <ul className='top-menu'>
                <li><Link id='shop' to='/Products/All'>SHOP</Link></li>
                <li><Link id='about' to='/About'>ABOUT</Link></li>
                <li><Link id='contact' to='/Contact'>CONTACT</Link></li>
            </ul>
        </>
    )
}

// Navbar
const NavBar = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    return (
        <>
            <nav>
                {windowWidth <= 1199 ?
                    <BurgerMenu />
                    :
                    <div className='nav-item-wrapper'>
                        <NoBurger />
                    </div>
                }
                <div className={windowWidth <= 1199 ? "logo-wrapper-mobile" : "logo-wrapper-desktop"}>
                    <Link to='/'><img className='logo' src={logo} alt='logo' /></Link>
                </div>
                <div className='nav-cart-container'>
                    <div className="nav-cart-wrapper">
                        <i className="fa fa-search search"></i>
                        <Cart />
                    </div>
                </div>
            </nav>
            <div className='tagline'>
                <h4>COMMUNITY CONSCIOUS CLOTHING</h4>
            </div>
        </>
    )
}

export default NavBar;