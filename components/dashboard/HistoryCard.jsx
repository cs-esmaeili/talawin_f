import React from 'react';

const HistoryCard = ({ title, date, price, id, type, products }) => {
    return (
        <div className='flex flex-col bg-secondary h-fit p-5 rounded-lg m-2 gap-3'>
            <div className='flex flex-wrap lg:flex-nowrap  rtl  justify-around '>
                <div className={`text-center ${type ? "text-green-400" : "text-red-400"}`}>
                    {title}
                </div>
                <div className='text-center'>
                    {date}
                </div>
                <div className='text-center'>
                    {price} ریال
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {products && products.length > 0 && products.map((product, index) => {
                    return (
                        <div key={index} className='flex justify-around  bg-primary rounded-md p-3'>
                            <div className='text-yellow-400 rtl text-center'>
                                {product.product_id.name}
                            </div>
                            <div className='rtl text-center'>
                                {product.product_id.price} ریال
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='w-full text-center truncate '>
                {id}
            </div>
        </div>
    );
};

export default HistoryCard;