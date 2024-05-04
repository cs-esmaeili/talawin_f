import { useState, useEffect, useRef } from 'react';
import { createRole as RcreateRole } from '@/services/Role';
import Input from '@/components/dashboard/Input';
import toast from 'react-hot-toast';

export default function Add({ resetAllData, roleList }) {

    const [tempMode, setTempMode] = useState(false);

    const createRole = async (name) => {
        try {
            const { data } = await RcreateRole({ name });
            const { message } = data;
            toast.success(message);
            roleList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }


    return (
        <div className='flex items-center  justify-center cursor-pointer  rounded-md bg-transparent border-2 border-accent text-accent hover:bg-opacity-50'
            onClick={() => {
                setTempMode(true);
            }}
        >
            {tempMode ?
                <div className='text-text grow w-full'>
                    <Input
                        autoFocus
                        cssClass={'!p-0 text-center'}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                resetAllData(false);
                                createRole(e.target.value);
                                setTempMode(false);
                            }
                        }}
                        onBlur={() => {
                            setTempMode(false);
                        }} />
                </div>
                :
                <div className='p-2'>
                    +
                </div>
            }
        </div>
    )
}
