'use client'

import Image from 'next/image';
import { firstPage, updateFirstPage } from '@/services/Site';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useModalContext } from '@/components/dashboard/Modal';
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import PostList from '@/app/dashboard/(main)/post/postList/page';
import Input from '@/components/dashboard/Input';
import Slider from '@/components/site/Slider';
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import ImageCard from '@/components/site/ImageCard';
import Location5 from '@/components/site/sections/Location5';
import Location4 from '@/components/site/sections/Location4';

export default function Dashboard() {

    const [firstPageData, setFirstPageData] = useState(null);
    const { openModal, closeModal } = useModalContext();

    const getData = async () => {
        try {
            const { data } = await firstPage();
            setFirstPageData(data);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const updateData = async (location, idata, customData) => {
        try {
            const { data } = await updateFirstPage({ location, data: idata, customData });
            const { message } = data;
            toast.success(message);
            getData();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const getLocationData = (locationNumber, needCustomData = false) => {
        if (needCustomData) {
            return firstPageData.find(obj => obj.location === locationNumber).customData;
        }
        return firstPageData.find(obj => obj.location === locationNumber).data;
    }


    const removePost = (postsArray, postIdToRemove) => {
        return postsArray.filter(post => post._id !== postIdToRemove);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='flex flex-col  grow overflow-y-auto  p-3 gap-3'>
            {firstPageData &&
                <>
                    <div className='relative w-full rounded-md' onClick={(e) => {
                        openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                            const { baseUrl, file } = selectedFile;
                            const url = baseUrl + file.name;
                            const blurHash = file.blurHash;
                            updateData(1, [],
                                {
                                    "textArea": getLocationData(1, true).textArea,
                                    "image": {
                                        "url": url,
                                        "blurHash": blurHash
                                    }
                                }
                            );
                            closeModal();
                        }} />);
                    }}>
                        <div className='w-full h-[300px]' >
                            <Image
                                src={getLocationData(1, true).image.url}
                                alt="Picture of the author"
                                placeholder="blur"
                                fill
                                blurDataURL={getLocationData(1, true).image.blurHash}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className='border-2 border-accent'></div>
                    <div className='flex flex-col'>
                        <div className='flex gap-3'>
                            <div className='flex w-1/2 justify-center items-center'>
                                <div className='flex flex-col bg-secondary bg-opacity-50 rounded-md p-5 gap-3'>
                                    <span className='text-4xl'>{getLocationData(1, true).textArea.title}</span>
                                    <span>{getLocationData(1, true).textArea.disc}</span>
                                </div>
                            </div>
                            <div className='flex flex-col w-1/2 justify-around'>
                                <Input placeholder={"Title"} onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateData(1, [],
                                            {
                                                "textArea": {
                                                    "title": e.target.value,
                                                    "disc": getLocationData(1, true).textArea.disc
                                                },
                                                "image": getLocationData(1, true).image
                                            }
                                        );
                                        e.target.value = "";
                                    }
                                }} />
                                <Input placeholder={"disc"} onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateData(1, [],
                                            {
                                                "textArea": {
                                                    "disc": e.target.value,
                                                    "title": getLocationData(1, true).textArea.title
                                                },
                                                "image": getLocationData(1, true).image
                                            }
                                        );
                                        e.target.value = "";
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-accent'></div>
                    <div className='flex h-[400px]'>
                        <div className='flex w-1/2 justify-center items-center'>
                            <Slider data={getLocationData(2)} />
                        </div>
                        <div className='flex flex-col w-1/2 bg-secondary p-2  '>
                            <div className='flex  flex-col overflow-y-auto rounded-md gap-3 mb-3'>
                                {getLocationData(2) && getLocationData(2).map((value, index) => {
                                    return (
                                        <div className='flex bg-primary rounded-sm p-2 items-center'>
                                            <div className='flex grow'>{index + 1}</div>
                                            <div className='flex w-1/4 justify-center'>{value.title}</div>
                                            <div className='w-1/4'>{value.createdAt}</div>
                                            <div className='w-1/4'>{value._id}</div>
                                            <div className='flex w-1/4 justify-end' onClick={() => {
                                                updateData(2, removePost(getLocationData(2), value._id), {});
                                            }}>
                                                <RxCross2 className='text-red-400 text-2xl' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex rounded-sm  items-center p-2 border-2 justify-center border-dashed border-accent'
                                onClick={() => {
                                    openModal(
                                        <div className='flex relative h-[500px]'>
                                            <PostList pickMode postPicker={(post) => {
                                                updateData(2, [...getLocationData(2), post], {});
                                                closeModal();
                                            }} />
                                        </div>
                                    );
                                }}>
                                <GoPlus className='text-accent text-2xl' />
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-accent'></div>
                    <div className='flex gap-4  w-full  h-[300px] justify-between'>
                        <div className='flex w-1/2 overflow-x-auto overflow-y-hidden'>
                            {getLocationData(3).map((value, index) => {
                                if (index <= 5) {
                                    return (
                                        <div className='relative min-w-[170px]  w-[170px] h-[290px] pl-0 ml-2'>
                                            <ImageCard text={value.title} image={value.imageV.url} blurHash={value.imageV.blurHash} url={`/post/${value.title}`} roundMode />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className='flex flex-col w-1/2 bg-secondary p-2'>
                            <div className='flex  flex-col overflow-y-auto rounded-md gap-3 mb-3'>
                                {getLocationData(3) && getLocationData(3).map((value, index) => {
                                    return (
                                        <div className='flex bg-primary rounded-sm p-2 items-center'>
                                            <div className='flex grow'>{index + 1}</div>
                                            <div className='flex w-1/4 justify-center'>{value.title}</div>
                                            <div className='w-1/4'>{value.createdAt}</div>
                                            <div className='w-1/4'>{value._id}</div>
                                            <div className='flex w-1/4 justify-end' onClick={() => {
                                                updateData(3, removePost(getLocationData(3), value._id), {});
                                            }}>
                                                <RxCross2 className='text-red-400 text-2xl' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex rounded-sm  items-center p-2 border-2 justify-center border-dashed border-accent'
                                onClick={() => {
                                    openModal(
                                        <div className='flex relative h-[500px]'>
                                            <PostList pickMode postPicker={(post) => {
                                                updateData(3, [...getLocationData(3), post], {});
                                                closeModal();
                                            }} />
                                        </div>
                                    );
                                }}>
                                <GoPlus className='text-accent text-2xl' />
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-accent'></div>

                    <div className='flex flex-col gap-4  w-full  h-fit justify-between'>

                        <div className='flex overflow-x-auto overflow-y-hidden'>
                            <Location4 data={getLocationData(4)} />
                        </div>

                        <div className='flex flex-col  bg-secondary p-2'>
                            <div className='flex  flex-col overflow-y-auto rounded-md gap-3 mb-3'>
                                {getLocationData(4) && getLocationData(4).map((value, index) => {
                                    return (
                                        <div className='flex bg-primary rounded-sm p-2 items-center'>
                                            <div className='flex grow'>{index + 1}</div>
                                            <div className='flex w-1/4 justify-center'>{value.title}</div>
                                            <div className='w-1/4'>{value.createdAt}</div>
                                            <div className='w-1/4'>{value._id}</div>
                                            <div className='flex w-1/4 justify-end' onClick={() => {
                                                updateData(4, removePost(getLocationData(4), value._id), {});
                                            }}>
                                                <RxCross2 className='text-red-400 text-2xl' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex rounded-sm  items-center p-2 border-2 justify-center border-dashed border-accent'
                                onClick={() => {
                                    openModal(
                                        <div className='flex relative h-[500px]'>
                                            <PostList pickMode postPicker={(post) => {
                                                updateData(4, [...getLocationData(4), post], {});
                                                closeModal();
                                            }} />
                                        </div>
                                    );
                                }}>
                                <GoPlus className='text-accent text-2xl' />
                            </div>
                        </div>
                    </div>


                    <div className='border-2 border-accent'></div>
                    <div className='flex flex-col gap-4  w-full  h-fit justify-between'>

                        <div className='flex overflow-x-auto overflow-y-hidden'>
                            <Location5 data={getLocationData(5)} sectionTitle={"section 5"} />
                        </div>

                        <div className='flex flex-col  bg-secondary p-2'>
                            <div className='flex  flex-col overflow-y-auto rounded-md gap-3 mb-3'>
                                {getLocationData(5) && getLocationData(5).map((value, index) => {
                                    return (
                                        <div className='flex bg-primary rounded-sm p-2 items-center'>
                                            <div className='flex grow'>{index + 1}</div>
                                            <div className='flex w-1/4 justify-center'>{value.title}</div>
                                            <div className='w-1/4'>{value.createdAt}</div>
                                            <div className='w-1/4'>{value._id}</div>
                                            <div className='flex w-1/4 justify-end' onClick={() => {
                                                updateData(5, removePost(getLocationData(5), value._id), {});
                                            }}>
                                                <RxCross2 className='text-red-400 text-2xl' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex rounded-sm  items-center p-2 border-2 justify-center border-dashed border-accent'
                                onClick={() => {
                                    openModal(
                                        <div className='flex relative h-[500px]'>
                                            <PostList pickMode postPicker={(post) => {
                                                updateData(5, [...getLocationData(5), post], {});
                                                closeModal();
                                            }} />
                                        </div>
                                    );
                                }}>
                                <GoPlus className='text-accent text-2xl' />
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-accent'></div>
                    <div className='flex flex-col gap-4  w-full  h-fit justify-between'>

                        <div className='flex overflow-x-auto overflow-y-hidden'>
                            <Location5 data={getLocationData(6)} sectionTitle={"section 6"} />
                        </div>

                        <div className='flex flex-col  bg-secondary p-2'>
                            <div className='flex  flex-col overflow-y-auto rounded-md gap-3 mb-3'>
                                {getLocationData(6) && getLocationData(6).map((value, index) => {
                                    return (
                                        <div className='flex bg-primary rounded-sm p-2 items-center'>
                                            <div className='flex grow'>{index + 1}</div>
                                            <div className='flex w-1/4 justify-center'>{value.title}</div>
                                            <div className='w-1/4'>{value.createdAt}</div>
                                            <div className='w-1/4'>{value._id}</div>
                                            <div className='flex w-1/4 justify-end' onClick={() => {
                                                updateData(6, removePost(getLocationData(6), value._id), {});
                                            }}>
                                                <RxCross2 className='text-red-400 text-2xl' />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex rounded-sm  items-center p-2 border-2 justify-center border-dashed border-accent'
                                onClick={() => {
                                    openModal(
                                        <div className='flex relative h-[500px]'>
                                            <PostList pickMode postPicker={(post) => {
                                                updateData(6, [...getLocationData(6), post], {});
                                                closeModal();
                                            }} />
                                        </div>
                                    );
                                }}>
                                <GoPlus className='text-accent text-2xl' />
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
