'use client'
import { useState, useEffect } from 'react';
import { apiBoxList as RapiBoxList } from '@/services/ApiBox';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";
import toast from 'react-hot-toast';
import ApiBox from '@/components/dashboard/ApiBox';

const page = () => {

    const [apiBoxs, setApiBoxs] = useState(null);
    const [ApiBoxsCount, setApiBoxsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);

    const { someThingIsWrong } = translations['fa'];


    const apiBoxList = async () => {
        try {
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
        <div className='flex flex-col grow p-3 gap-3 justify-center'>
            <div className='flex grow gap-3'>
                {apiBoxs != null && apiBoxs.map((box, index) => {
                    return (
                        <ApiBox key={index} box={box} />
                    )
                })}
            </div>
            <div>
                <Pagination activePage={activePage} perPage={perPage} count={ApiBoxsCount} setActivePage={setActivePage} />
            </div>
        </div>
    );
};

export default page;