'use client'

import BigImageCard from '@/components/site/BigImageCard';
import { useState, useEffect } from 'react';

const Slider = ({ data, time = 5 }) => {

    const [curentPostIndex, setCurentPostIndex] = useState(0);


    const sliderTimer = () => {
        setInterval(() => {
            setCurentPostIndex(prevIndex => {
                if (prevIndex + 1 >= data.length) {
                    return 0;
                } else {
                    return prevIndex + 1;
                }
            });
        }, time * 1000);
    }

    useEffect(() => {
        sliderTimer();
    }, []);

    return (
        <BigImageCard text={data[curentPostIndex].title} image={data[curentPostIndex].imageV.url} blurHash={data[curentPostIndex].imageV.blurHash} />
    );
};

export default Slider; 