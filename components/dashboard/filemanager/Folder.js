import { useState } from 'react';
import { createFolder as RcreateFolder } from '@/services/Filemanager';
import { BiSolidFolderPlus } from 'react-icons/bi';
import Input from '@/components/dashboard/Input';
import toast from 'react-hot-toast';

export default function Folder({ path, refreshList }) {


    const [inputOpen, setInputOpen] = useState(false);

    const createFolder = async (folderName) => {
        try {
            const { data } = await RcreateFolder({ location: path, folderName });
            const { message } = data;
            toast.success(message);
            refreshList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }
    return (
        <div className='flex items-center'>
            <BiSolidFolderPlus className='text-xl text-yellow-400' onClick={() => {
                setInputOpen(!inputOpen);
            }} />
            {inputOpen &&
                <Input
                    placeholder={"Rename to ..."}
                    color={"bg-primary"}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            createFolder(e.target.value);
                            setInputOpen(false);
                            e.target.value = "";
                        }
                    }}
                    onBlur={() => {
                        setInputOpen(false);
                    }}
                />
            }
        </div>
    )
}
