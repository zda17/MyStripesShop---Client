import React from 'react';

import { BannerSlim } from '../components/Banner';
import ShopSection from '../components/ShopSection';

function ShowAll({ path, activeSection }) {
    return (
        <div className="ShopSection" >
            <BannerSlim />
            <ShopSection path={path} activeSection={activeSection} />
        </div>
    );
}

export default ShowAll;