'use client'

import React from 'react';

const Date = ({ date }) => {

    const makeAgoodDate = () => {
        const newDate = date.substring(0, date.indexOf(" "));
        return newDate;
    }

    return (
        <div>
            {makeAgoodDate()}
        </div>
    );
};

export default Date;