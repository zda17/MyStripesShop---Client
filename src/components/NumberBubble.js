import React from 'react';
import '../stylesheets/NumberBubble.scss';


export default function NumberBubble({ number }) {
    return (
        <article className='num-bubble-wrapper'>
            {number}
        </article>
    )
}