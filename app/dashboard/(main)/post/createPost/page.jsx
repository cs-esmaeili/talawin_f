"use client";
import { useState, useEffect } from 'react';
import PostList from "@/components/dashboard/post/PostList";
import AddPanel from '@/components/dashboard/post/AddPanel';
import PostDetails from '@/components/dashboard/post/PostDetails';

const createPost = ({ editMode, editData, updateListener }) => {



    const [content, setContent] = useState([]);

    useEffect(() => {
        if (editData) {
            setContent(editData.body);
        }
    }, [editMode, editData]);

    return (
        <div className='relative flex flex-col grow max-w-full p-2 overflow-y-auto overflow-x-hidden'>
            <PostDetails content={content} setContent={setContent} editMode={editMode} editData={editData} updateListener={updateListener} />
            <PostList content={content} setContent={setContent} />
            <AddPanel content={content} setContent={setContent} />
        </div>
    );
};

export default createPost;