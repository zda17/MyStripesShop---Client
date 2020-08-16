import React from 'react';

import { BannerSlim } from '../components/Banner';
import ShopSection from '../components/ShopSection';

function Mens() {
    return (
        <div className="content-wrap" >
            <BannerSlim />
            <ShopSection path='mens' />
        </div>
    );
}

export default Mens;