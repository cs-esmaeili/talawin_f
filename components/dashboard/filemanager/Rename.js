import { useState, useEffect } from 'react';
import { rename as Rrename } from '@/services/Filemanager';
import { BiSolidEdit } from 'react-icons/bi';
import Input from '@/components/dashboard/Input';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

export default function Rename({ path, file, refreshList }) {

    const [inputOpen, setInputOpen] = useState(false);
    const { someThingIsWrong, filemanagerRename } = translations['fa'];

    const rename = async (newName) => {
        try {
            const { data } = await Rrename({ location: path, oldName: file, newName });
            const { message } = data;
            toast.success(message);
            refreshList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    return (
        <div className='flex items-center'>
            <BiSolidEdit className='text-xl text-blue-400' onClick={() => {
                if (file == null) {
                    toast.error(filemanagerRename.toastError);
                } else {
                    setInputOpen(!inputOpen);
                }
            }} />
            {inputOpen &&
                <Input
                    placeholder={filemanagerRename.inputPlaceHolder}
                    className="rtl bg-primary border-hidden outline-none"
                    color={"bg-primary"}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            rename(e.target.value);
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
