import React from 'react';

import '../stylesheets/Header.scss';

const Header = (props) => {

    const { title, description, divClass, headerClass, hClass, subHClass } = props

    return(
        <header className={headerClass}>
            <div className={divClass}>
                <h2 className={hClass}>
                    {title}
                </h2>
                <h3 className={subHClass}>
                    {description}
                </h3>
            </div>
        </header>
    );
};

export default Header;
