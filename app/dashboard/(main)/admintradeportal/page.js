'use client'

import ProductBuy from '@/components/dashboard/admintradeportal/ProductBuy';
import ProductSell from '@/components/dashboard/admintradeportal/ProductSell';
import UserSearch from '@/components/dashboard/admintradeportal/UserSearch';
import { useState, useEffect } from 'react';


const page = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState(1);

    return (
        <div className='flex grow p-3 gap-3'>

            <div className='flex flex-col items-center w-2/3 bg-secondary rounded-lg gap-3'>
                <div className='flex w-full h-fit justify-between'>
                    <button className={`w-1/3 rounded-bl-lg border-b-2 p-2 border-accent  text-red-400 opacity-50 ${status == 3 && "!opacity-100"}`}
                        onClick={() => setStatus(3)}>فروش از صدوق</button>
                    <button className={`w-1/3 border-b-2 p-2 border-accent  text-red-400 opacity-50 ${status == 2 && "!opacity-100"}`}
                        onClick={() => setStatus(2)}>فروش</button>
                    <button className={`w-1/3 rounded-br-lg border-b-2 p-2 border-accent  text-green-400 opacity-50 ${status == 1 && "!opacity-100"}`}
                        onClick={() => setStatus(1)}>خرید</button>
                </div>

                <div className='flex flex-col grow w-full p-3 overflow-hidden gap-3'>
                    {status === 1 &&
                        <ProductBuy selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    }
                    {status === 2 &&
                        <ProductSell selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    }
                </div>
            </div>

            <div className='flex flex-col items-center w-1/3 bg-secondary rounded-lg p-3 gap-3'>
                <UserSearch selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
        </div>
    );
};

export default page;