'use client'

import { useState, useEffect } from 'react';
import CreateUser from '@/components/dashboard/users/CreateUser';
import UserList from '@/components/dashboard/users/UserList';

export default function user() {

    const [editData, setEditData] = useState(null);
    const [refreshList, setRefreshList] = useState(false);

    return (
        <div className='flex flex-col grow max-w-full min-w-0'>
            <div className='flex gap-2 flex-wrap-reverse md:flex-nowrap  justify-center bg-secondary m-2 p-2 rounded-lg max-w-full overflow-hidden'>
                <CreateUser editData={editData} setEditData={setEditData} setRefreshList={() => { setRefreshList(!refreshList) }} />
            </div>
            <div className='flex grow m-2 p-2 rounded-lg'>
                <UserList editData={editData} setEditData={setEditData} refreshList={refreshList} />
            </div>
        </div >
    )
}
