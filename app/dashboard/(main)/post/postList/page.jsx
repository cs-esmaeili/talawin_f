'use client'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import CreatePost from '@/app/dashboard/(main)/post/createPost/page';
import Pagination from '@/components/dashboard/Pagination';
import { postList as RpostList } from '@/services/Post';
import { BiSolidEdit } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
import translations from "@/translations.json";

const postList = ({ pickMode = false, postPicker = null }) => {

    const [posts, setPosts] = useState(null);
    const [postsCount, setPostsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [editData, setEditData] = useState(null);

    const { someThingIsWrong, postListPage } = translations['fa'];

    const postList = async () => {
        try {
            const { data } = await RpostList({ page: activePage, perPage });
            const { postsCount, posts } = data;
            setPosts(posts);
            setPostsCount(postsCount);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        postList();
    }, [activePage]);


    return (
        <div className='flex grow flex-col overflow-hidden h-full'>
            <div className='flex grow overflow-y-auto overflow-x-hidden m-3 mb-0 basis-0 '>
                {posts &&
                    <Table
                        headers={[
                            { name: postListPage.id, cssClass: "hidden xl:table-cell" },
                            { name: postListPage.title, cssClass: "" },
                            { name: postListPage.category, cssClass: "" },
                            { name: postListPage.updatedAt, cssClass: "hidden sm:table-cell" },
                            { name: postListPage.actions, cssClass: "" },
                        ]}
                        rowData={[
                            { name: '_id', cssClass: "hidden xl:table-cell" },
                            { name: 'title', cssClass: "" },
                            { name: 'categoryName', cssClass: "" },
                            { name: 'updatedAt', cssClass: "hidden sm:table-cell" },
                        ]}
                        rows={posts}
                        rowCountstart={(perPage * (activePage - 1))}
                        selectMode={pickMode ? true : false}
                        selectListener={pickMode ? postPicker : null}
                        special={(row, index) => {
                            return (
                                <td className={`h-[1px]  p-0 pb-1`}>
                                    <div className={`flex h-full items-center justify-center rounded-e-xl bg-secondary p-1 text-nowrap  ${pickMode && "opacity-50"}`}>
                                        <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                            if (!pickMode) {
                                                setEditData(row);
                                            }
                                        }} />
                                    </div>
                                </td>
                            )
                        }}
                    />
                }
            </div>
            <div className='flex  justify-center items-center pt-3 pb-5 shadow-lg'>
                <Pagination activePage={activePage} perPage={perPage} count={postsCount} setActivePage={setActivePage} />
            </div>
            {editData &&
                <div className='flex flex-col grow basis-0 h-3/5 mt-3'>
                    <div className='flex justify-end'>
                        <RiCloseFill className='mr-2 text-red-400 text-3xl' onClick={() => {
                            setEditData(null);
                        }} />
                    </div>
                    <CreatePost editMode editData={editData} updateListener={() => {
                        postList();
                        setEditData(null);
                    }} />
                </div>
            }
        </div>
    );
};

export default postList;