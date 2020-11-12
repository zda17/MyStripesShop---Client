import React, { useContext } from 'react';

import { BannerSlim } from '../components/Banner';
import ShopSection from '../components/ShopSection';
import { MyContext } from '../utils/Context';

function Mens() {

    const { searched } = useContext(MyContext);

    return (
        <div className="content-wrap" >
            <BannerSlim />
            <ShopSection path='mens' activeSection={searched || 'all'} />
        </div>
    );
}

export default Mens;