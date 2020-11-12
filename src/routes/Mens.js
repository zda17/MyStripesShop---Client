import React, { useContext } from 'react';

import { BannerSlim } from '../components/Banner';
import ShopSection from '../components/ShopSection';
import { MyContext } from '../utils/Context';

function Mens() {

    const { searched, showSearch, windowWidth } = useContext(MyContext);

    let mobileSearch = false;
    
    if (windowWidth < 400 && showSearch) {
        mobileSearch = true;
    }

    return (
        <div className="content-wrap" >
            <BannerSlim
                style={mobileSearch && '60px'}
            />
            <ShopSection path='mens' activeSection={searched || 'all'} />
        </div>
    );
}

export default Mens;