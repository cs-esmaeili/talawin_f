import { PiFolderFill } from "react-icons/pi";
import { BsImageFill, BsFileEarmarkFill } from "react-icons/bs";
import { BsPersonVideo2 } from "react-icons/bs";
import { useModalContext } from '@/components/dashboard/Modal';
import ImageModal from "../Modals/ImageModal";
import VideoModal from './../Modals/VideoModal';
import { useState, useEffect } from 'react';
import { folderFileList as RfolderFileList } from '@/services/Filemanager';

export default function Files({ path, selectedFile, setSelectedFile, setPath, refreshList, baseUrl, setBaseUrl, fileType }) {

    const { openModal, closeModal } = useModalContext();
    const [files, setFiles] = useState(null);
    const [status, setStatus] = useState(false);

    const folderFileList = async () => {
        try {
            setBaseUrl(null);
            setFiles(null);
            setStatus(true);

            const { data } = await RfolderFileList({ location: path });
            setFiles(data.files);
            setBaseUrl(data.baseUrl);
            // setSelectedFile(data.files[0]);
            if (data.files.length == 0) {
                setStatus('مسیر خالی میباشد');
            } else {
                setStatus(false);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                setStatus(error.response.data.message);
            } else {
                setStatus('Something is wrong!');
            }
        }
    }

    const statusElement = () => {
        if (status === true) {
            return (<div className='flex absolute top-0 bottom-0 left-0 right-0 grow items-center z-0 justify-center'>
                <div className="relative flex justify-center items-center h-full">
                    <div className="w-12 h-12 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
                </div>
            </div>
            )
        } else if (typeof status === 'string') {
            return (
                <div className='flex absolute top-0 bottom-0 left-0 right-0 grow items-center z-0 justify-center'>
                    <div className='flex content-center justify-center '>
                        <span>{status}</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='flex  h-max  flex-wrap p-2  overflow-x-hidden overflow-y-auto  xl:gap-10 lg:gap-8   bg-red z-0'>
                    {files && files.map((file, index) => {
                        return File(file, index);
                    })}
                </div>
            )
        }
    }
    const File = (file, index) => {
        const { name, type } = file;
        if (fileType != null && type != fileType) {
            return null;
        }
        let icon = null;

        if (type == "folder") {
            icon = <PiFolderFill size={"3.5rem"} className="text-yellow-400" />;
        } else if (type == "image") {
            icon = <BsImageFill size={"3.5rem"} className="text-green-400" />;
        } else if (type == "video") {
            icon = <BsPersonVideo2 size={"3.5rem"} className="text-red-500" />;
        } else if (type == "file") {
            icon = <BsFileEarmarkFill size={"3.5rem"} />;
        }
        return (
            <div className={`flex cursor-pointer flex-col mt-5 sm:mt-4 md:mt-3 lg:mt-0 items-center h-max xl:w-1/12 lg:w-1/6 md:w-1/6 sm:w-1/4 w-1/2 
            ${(selectedFile !== null && selectedFile.name === name) ? "bg-secondary rounded-lg" : ""}`}
                key={index}
                onClick={() => {
                    file.path = path
                    setSelectedFile(file);
                }}
                onDoubleClick={() => {
                    if (type == 'image') {
                        openModal(<ImageModal baseUrl={baseUrl} image={name} blurHash={file.blurHash} size={file.size} />);
                    } else if (type == 'folder') {
                        setPath([...path, name]);
                    } else if (type == 'video') {
                        openModal(<VideoModal baseUrl={baseUrl} video={name} />);
                    }
                }}
            >
                <div>
                    {icon}
                </div>
                <div className="block text-ellipsis overflow-hidden whitespace-nowrap w-full text-center">
                    {name}
                </div>
            </div>
        );
    }


    useEffect(() => {
        folderFileList();
    }, [refreshList, path]);

    return (
        <div className='relative flex flex-col grow max-w-full max-h-full overflow-hidden'>
            {statusElement()}
        </div>
    )
}
