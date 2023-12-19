import React from 'react';

export default function Title({ value, onClickHandler, isOpen }) {
    return (
        <h2
            className='single-sidebar-widget__title d-flex justify-content-between space-mb--30'
            onClick={onClickHandler}>
            <span>{value}</span>
            <span>{isOpen ? '-' : '+'}</span>
        </h2>
    );
}
