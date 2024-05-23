'use client'
import Roles from '@/components/dashboard/role/Roles';
import Permissions from '@/components/dashboard/role/Permissions';
import { useState } from 'react';

export default function Role() {

    const [currentRole, setCurrentRole] = useState(null);
    const [allPermissions, setAllPermissions] = useState(null);
    const [updateList, setUpdateList] = useState(false);


    return (
        <div className='flex flex-col sm:flex-row grow overflow-hidden'>
            <div className='flex grow p-1 flex-col  gap-3 overflow-x-hidden overflow-y-auto shadow-xl'>
                <Permissions
                    allPermissions={allPermissions}
                    currentRole={currentRole}
                    setUpdateList={() => setUpdateList(!updateList)}
                />
            </div>
            <div className='flex pb-3 sm:w-1/4 flex-col'>
                <Roles
                    setCurrentRole={(role) => { setCurrentRole(role); }}
                    setAllpermissions={(permissions) => { setAllPermissions(permissions) }}
                    updateList={updateList}
                />
            </div>
        </div>
    )
}
