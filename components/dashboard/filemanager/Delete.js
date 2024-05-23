import toast from 'react-hot-toast';
import { IoMdTrash } from 'react-icons/io';
import {
    deleteFolder as RdeleteFolder,
    deleteFile as RdeleteFile,
} from '@/services/Filemanager';
import translations from "@/translations.json";

export default function DeleteFile({ path, file, refreshList }) {

    const { someThingIsWrong, filemanagerDelete } = translations['fa'];

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
                toast.error(someThingIsWrong);
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
                toast.error(someThingIsWrong);
            }
        }
    }

    return (
        <IoMdTrash className="text-red-500 text-xl" onClick={() => {

            if (file == null) {
                toast.error(filemanagerDelete.toastError);
            } else if (file.type == "folder") {
                deleteFolder();
            } else {
                deleteFile();
            }
        }} />
    )
}
