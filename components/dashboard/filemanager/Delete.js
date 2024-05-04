import toast from 'react-hot-toast';
import { IoMdTrash } from 'react-icons/io';
import {
    deleteFolder as RdeleteFolder,
    deleteFile as RdeleteFile,
} from '@/services/Filemanager';


export default function DeleteFile({ path, file, refreshList }) {


    const deleteFile = async () => {
        try {
            let location = [...path];
            const { data } = await RdeleteFile({ location, fileName: file.name });
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


    const deleteFolder = async () => {
        try {
            let location = [...path, file.name];
            const { data } = await RdeleteFolder({ location });
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
        <IoMdTrash className="text-red-500 text-xl" onClick={() => {

            if (file == null) {
                toast.error("ابتدا فایلی را انتخاب کنید");
            } else if (file.type == "folder") {
                deleteFolder();
            } else {
                deleteFile();
            }
        }} />
    )
}
