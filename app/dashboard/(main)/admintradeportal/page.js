'use client'

import UserSearch from '@/components/dashboard/admintradeportal/UserSearch';
import { useState, useEffect } from 'react';

const page = () => {

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className='flex grow p-3 gap-3'>
            <div className='w-1/3 bg-secondary rounded-lg p-3'></div>
            <div className='w-1/3 bg-secondary rounded-lg p-3'></div>
            <div className='flex flex-col items-center w-1/3 bg-secondary rounded-lg p-3 gap-3'>
                <UserSearch selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
        </div>
    );
};

export default page;