'use client'

import UserSearch from '@/components/dashboard/admintradeportal/UserSearch';
import Input from '@/components/dashboard/Input';
import SmsScreen from '@/components/dashboard/sms/SmsScreen';
import SmsTemplates from '@/components/dashboard/sms/SmsTemplates';
import { useState } from 'react';

const page = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    return (
        <div className='flex flex-col grow p-3 gap-3 overflow-hidden'>
            <div className='flex grow h-full'>
                <div className='w-1/3'>
                    <SmsScreen
                        selectedTemplate={selectedTemplate}
                        selectedUser={selectedUser}
                        setSelectedTemplate={setSelectedTemplate}
                        setSelectedUser={setSelectedUser}
                    />
                </div>
                <div className='w-1/3 flex flex-col gap-3 grow h-full overflow-x-auto  px-3'>
                    <SmsTemplates setSelectedTemplate={setSelectedTemplate}  selectedTemplate={selectedTemplate} />
                </div>
                <div className='flex flex-col items-center w-1/3 bg-secondary rounded-lg p-3 gap-3'>
                    <UserSearch selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                </div>
            </div>
        </div>
    );
};

export default page;