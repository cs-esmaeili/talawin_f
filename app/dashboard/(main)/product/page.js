import ProductCard from '@/components/dashboard/ProductCard';
import React from 'react';

const page = () => {
    return (
        <div className='flex w-full '>
            <div className='w-1/2 justify-center items-center flex'>
                <div>
                    <ProductCard />
                </div>
            </div>
            <div className='w-1/2 '>
                salam
            </div>
        </div>
    );
};

export default page;