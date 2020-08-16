import React from 'react';
import '../stylesheets/Home.scss';
import '../stylesheets/Image.scss';

//components
import { Banner } from '../components/Banner';
import ShopSection from '../components/ShopSection';

function Home() {

    return (
        <div className="content-wrap" >
            <Banner />
            <ShopSection path='all' />
        </div>
    );
}

export default Home;