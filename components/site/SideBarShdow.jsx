'use client'

import React from 'react';

const SideBarShdow = ({ open, setOpen }) => {

    return (
        <div
            onClick={() => setOpen(false)}
            className={open ? " opacity-50 bg-black w-100% h-screen z-30 top-0 left-0 right-0 bottom-0 fixed cursor-pointer" : "hidden"} />
    );
};

export default SideBarShdow;