import React from 'react';
import { useState } from 'react';

export default function AtoZSort({ handleClick }) {
    const [active, setActive] = useState('All');
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const setActiveChar = (evt) => {
        setActive(evt.target.innerHTML);
        handleClick(evt.target.innerHTML);
    };
    return (
        <ul className='azbranditem'>
            <li
                className={active === 'All' ? 'all active' : 'all'}
                onClick={setActiveChar}>
                All
            </li>
            {alpha.map((char, idx) => (
                <li
                    key={idx}
                    className={active === char ? 'alpha active' : 'alpha'}
                    onClick={setActiveChar}>
                    {char}
                </li>
            ))}
        </ul>
    );
}
