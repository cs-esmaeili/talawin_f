'use client'

import { useState, useEffect } from 'react';
import { apiBoxList as RapiBoxList } from '@/services/ApiBox';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";
import toast from 'react-hot-toast';
import ApiBox from '@/components/dashboard/apiBox/ApiBox';
import AddBox from '@/components/dashboard/apiBox/AddBox';
import ShowApi from '@/components/dashboard/apiBox/ShowApi';

const page = () => {

    const [apiBoxs, setApiBoxs] = useState(null);
    const [ApiBoxsCount, setApiBoxsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);

    const { someThingIsWrong } = translations['fa'];


    const apiBoxList = async () => {
        try {
            setApiBoxs(null);
            setApiBoxsCount(null);
            const { data } = await RapiBoxList({ page: activePage, perPage });
            const { apiboxCount, apiboxs } = data;
            setApiBoxs(apiboxs);
            setApiBoxsCount(apiboxCount);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        apiBoxList();
    }, [activePage]);

    return (
        <div className='flex flex-col grow h-full p-3 gap-3 justify-between'>
            <div className='flex h-fit grow gap-3 overflow-hidden'>
                <div className='flex flex-wrap gap-3 w-3/4 h-full justify-center  overflow-y-auto'>
                    <AddBox updateList={() => apiBoxList()} />
                    {apiBoxs != null && apiBoxs.map((box, index) => {
                        return (
                            <ApiBox key={index} box={box} updateList={() => apiBoxList()}/>
                        )
                    })}
                </div>
                <div className='w-1/3 h-full'>
                    <ShowApi />
                </div>
            </div>
            <div className='flex h-fit justify-center'>
                <Pagination activePage={activePage} perPage={perPage} count={ApiBoxsCount} setActivePage={setActivePage} />
            </div>
        </div>
    );
};

export default page;