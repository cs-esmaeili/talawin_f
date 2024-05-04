import { createPost as RcreatePost, updatePost as RupdatePost } from '@/services/Post';
import { LuRectangleVertical } from "react-icons/lu";
import { PiRectangleBold } from "react-icons/pi";
import { useModalContext } from '@/components/dashboard/Modal';
import Category from '@/app/dashboard/(main)/category/page';
import { useState, useEffect } from 'react';
import Input from '@/components/dashboard/Input';
import { RiCloseFill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Filemanager from '@/app/dashboard/(main)/filemanager/page';

const PostDetails = ({ content, setContent, editMode, editData, updateListener }) => {

    const { openModal, closeModal } = useModalContext();

    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState("");
    const [disc, setDisc] = useState("");
    const [imageH, setImageH] = useState(null);
    const [imageV, setImageV] = useState(null);

    const [readyToCreate, setReadyToCreate] = useState(false);

    const createPost = async () => {
        try {
            let response = null
            if (editMode) {
                response = await RupdatePost({ post_id: editData._id, imageH, imageV, title, disc, metaTags: tags, category_id: category._id, body: content });
            } else {
                response = await RcreatePost({ title, disc, imageH, imageV, metaTags: tags, category_id: category._id, body: content });
            }
            let { data } = response;
            const { message } = data;
            toast.success(message);
            resetForm();
            if (editMode) {
                updateListener();
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const resetForm = () => {
        setImageH(null);
        setImageV(null);
        setContent([]);
        setTags([]);
        setCategory(null);
        setTitle("");
        setDisc("");
    }

    useEffect(() => {
        if (tags.length > 0 && category != null && title != "" && disc != "") {
            setReadyToCreate(true);
        } else {
            setReadyToCreate(false);
        }
    }, [tags, category, title, disc]);

    useEffect(() => {
        if (editMode) {
            const { metaTags, category_id, title, disc, imageH, imageV } = editData;
            setTags(metaTags);
            setCategory(category_id);
            setTitle(title);
            setDisc(disc);

            setImageV(imageV);
            setImageH(imageH);
        }
    }, [editMode, editData]);

    return (
        <div className='flex flex-col bg-secondary  p-2 mb-2 rounded-md' >
            <div className='flex  gap-2 mb-2  justify-between flex-wrap  max-w-full'>
                <div className='grow'>
                    <Input placeholder={"Title"} color={"bg-primary"} onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className='grow'>
                    <Input placeholder={"Discription"} color={"bg-primary "} onChange={(e) => setDisc(e.target.value)} value={disc} />
                </div>
            </div>
            <Input placeholder={"Meta Tags"} color={"bg-primary"} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    let temp = [...tags];
                    temp.push(e.target.value);
                    e.target.value = "";
                    setTags(temp);
                }
            }} />

            {tags.length > 0 &&
                <div className='flex flex-wrap gap-3 mt-2'>
                    {tags.map((tag, index) => {
                        return (
                            <div className='flex' onClick={() => {
                                console.log("click");
                                let temp = [...tags];
                                temp.splice(index, 1);
                                setTags(temp);
                            }}>
                                <div className='flex justify-center items-center p-2 bg-primary rounded-xl'>
                                    <div>{tag}</div>
                                    <RiCloseFill className='ml-1 text-red-400' />
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
            <div className='flex mt-3 gap-2 items-center'>
                <div className='flex flex-col grow items-center border-2 border-dashed border-accent w-1/2 h-full justify-center'>
                    {!imageH ?
                        <div className='flex flex-col grow items-center w-full p-3' onClick={() => {
                            openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                                const { baseUrl, file } = selectedFile;
                                setImageH({ url: (baseUrl + file.name), blurHash: file.blurHash, size: file.size });
                                closeModal();
                            }} />);
                        }}>
                            <PiRectangleBold className='text-accent text-4xl mr-2' />
                        </div>
                        :
                        <Image
                            src={imageH.url}
                            alt="Picture of the author"
                            width={250}
                            height={200}
                            placeholder="blur"
                            blurDataURL={imageH.blurHash}
                            onClick={(e) => {
                                openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                                    const { baseUrl, file } = selectedFile;
                                    setImageH({ url: (baseUrl + file.name), blurHash: file.blurHash, size: file.size });
                                    closeModal();
                                }} />);
                            }}
                        />
                    }
                </div>
                <div className='flex flex-col grow items-center border-2 border-dashed border-accent w-1/2'>
                    {!imageV ?
                        <div className='flex flex-col grow items-center w-full p-3' onClick={() => {
                            openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                                const { baseUrl, file } = selectedFile;
                                setImageV({ url: (baseUrl + file.name), blurHash: file.blurHash, size: file.size });
                                closeModal();
                            }} />);
                        }}>
                            <LuRectangleVertical className='text-accent text-4xl mr-2' />
                        </div>
                        :
                        <Image
                            src={imageV.url}
                            alt="Picture of the author"
                            width={200}
                            height={250}
                            placeholder="blur"
                            blurDataURL={imageV.blurHash}
                            onClick={(e) => {
                                openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                                    const { baseUrl, file } = selectedFile;
                                    setImageV({ url: (baseUrl + file.name), blurHash: file.blurHash, size: file.size });
                                    closeModal();
                                }} />);
                            }}
                        />
                    }
                </div>

            </div>
            <div className='flex mt-3 gap-2'>
                <button className={`w-full p-1 bg-accent rounded-md ${(!readyToCreate) && "opacity-50"}`}
                    onClick={() => {
                        if (readyToCreate) {
                            createPost();
                        }
                    }}>
                    {editMode ? "Done" : "Create"}
                </button>
                <button className='w-full p-1 bg-green-500 rounded-md '
                    onClick={() => {
                        openModal(<Category pickMode selectListener={(row) => {
                            setCategory(row);
                            closeModal();
                        }} />);
                    }}>
                    {(category == null) ? "Select Category" : category.name}
                </button>
            </div>
        </div>
    );
};

export default PostDetails;