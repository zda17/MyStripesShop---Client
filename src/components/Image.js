import React from 'react';
import { Link } from 'react-router-dom';
import NumberBubble from './NumberBubble';

const Image = ({ to, imgDivClass, imgClass, numBub, product }) => {
    const { photo_url, name } = product;
    return (
        <>
            <article className={imgDivClass}>
                <Link to={to}>
                    <img className={imgClass} src={photo_url} alt={name} />
                    {numBub &&
                        <NumberBubble number={numBub} />
                    }
                </Link>
            </article>
        </>
    );
};

export default Image;