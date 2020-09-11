import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../utils/Context';
import { stack as Menu } from 'react-burger-menu';
import logo from '../utils/images/logo.png';
import insta from '../utils/images/insta.png';
import '../stylesheets/Burger.scss';
import '../stylesheets/NavBar.scss';
import { Cart } from '../components/Cart';

// Instagram icon for bottom of side menu on mobile
const Icon = () => {
    return (
        <>
            <hr className='line'></hr>
            <Link to='#' className='insta'><img className='insta-icon' src={insta} alt='Instagram' /></Link>
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

// Non-burger top menu (desktop)
const NoBurger = () => {
    return (
        <ul className='top-menu nav-item-wrapper'>
            <li><Link id='shop' to='/Products/All'>SHOP</Link></li>
            <li><Link id='about' to='/About'>ABOUT</Link></li>
            <li><Link id='contact' to='/Contact'>CONTACT</Link></li>
        </ul>
    )
}

// Navbar
const NavBar = () => {
    const { windowWidth, setWindowWidth } = useContext(MyContext);

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    return (
        <nav>
            <section className='main-nav'>
                {windowWidth <= 1199 ?
                    <BurgerMenu />
                    :
                    <NoBurger />
                }
                <Link to='/' className={windowWidth <= 1199 ? "logo-wrapper-mobile" : "logo-wrapper-desktop"}>
                    <img className='logo' src={logo} alt='My Stripes Logo' />
                </Link>
                <Cart />
            </section>
            <section className='tagline'>
                <h4>COMMUNITY CONSCIOUS CLOTHING</h4>
            </section>
        </nav>
    )
}

export default NavBar;