import React from 'react';

import { BannerSlim } from '../components/Banner';
import ShopSection from '../components/ShopSection';

function ShowAll() {
    return (
        <div className="ShopSection" >
            <BannerSlim />
            <ShopSection path='all' />
        </div>
    );
}

export default ShowAll;