import { IoMdTrash } from 'react-icons/io';
import { deleteCategory as RdeleteCategory } from '@/services/Category';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Input from '@/components/dashboard/Input';
import translations from "@/translations.json";

export default function DeleteCategory({ row, categoryList, index, categorys, pickMode }) {

    const [inputOpen, setInputOpen] = useState(false);
    const { someThingIsWrong, categoryDelete } = translations['fa'];

    const deleteCategory = async (newCategory_id) => {
        try {
            const { data } = await RdeleteCategory({ category_id: row._id, newCategory_id });
            const { message } = data;
            toast.success(message);
            categoryList();
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
            <IoMdTrash className='text-xl text-red-400' onClick={() => {
                if (!pickMode) {
                    setInputOpen(!inputOpen);
                }
            }} />
            {inputOpen &&
                <Input
                    placeholder={categoryDelete.inputPlaceHolder}
                    color={"bg-primary"}
                    autoFocus
                    onKeyDown={(e) => {
                        if (!pickMode && e.key === 'Enter') {
                            if (e.target.value == null || e.target.value == "") {
                                toast.error(categoryDelete.toastError);
                            } else {
                                deleteCategory(e.target.value);
                                setInputOpen(false);
                                e.target.value = "";
                                categoryList();
                            }
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
