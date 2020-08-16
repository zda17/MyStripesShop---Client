import React from 'react';
import {Link} from 'react-router-dom';
import '../stylesheets/Banner.scss';

export const Banner = () => {
    return(
        <section id="Banner">
            <div className="banner-content">
                <h2 className="banner-header">NEW ARRIVALS</h2>
                <div className="button-container">
                    <Link to="/Products/Mens" className="Button Button_Banner">SHOP MENS</Link>
                    <Link to="/Products/Womens" className="Button Button_Banner">SHOP WOMENS</Link>
                </div>
            </div>
        </section>
    );
};

export const BannerSlim = () => {
    return(
        <section id="BannerSlim">
            <div className="banner-content">
                <div className="button-container">
                    <Link to="/Products/All" className="Button Button_Banner">SHOP ALL</Link>
                    <Link to="/Products/Mens" className="Button Button_Banner">SHOP MENS</Link>
                    <Link to="/Products/Womens" className="Button Button_Banner">SHOP WOMENS</Link>
                </div>
            </div>
        </section>
    );
};