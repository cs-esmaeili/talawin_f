'use client'

import HistoryCard from '@/components/dashboard/HistoryCard';
import React from 'react';
import { useState, useEffect } from 'react';
import { historyList as RhistoryList } from '@/services/History';
import Pagination from '@/components/dashboard/Pagination';
import toast from 'react-hot-toast';

const page = () => {

    const [historys, setHistorys] = useState(null);
    const [historysCount, setHistorysCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [editData, setEditData] = useState(null);

    const historyList = async () => {
        try {
            const { data } = await RhistoryList({ page: activePage, perPage });
            const { historysCount, historys } = data;
            setHistorys(historys);
            setHistorysCount(historysCount);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        historyList();
    }, [activePage]);

    return (
        <div className='flex flex-col grow max-h-full  overflow-y-auto overflow-x-hidden justify-between'>
            <div className='grid h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 rtl'>
                {historys && historys.length > 0 && historys.reverse().map((history, index) => {
                    const { title, createdAt, price, _id, type, products } = history;
                    return (
                        <HistoryCard key={index} title={title} date={createdAt} price={price} id={_id} type={type} products={products} />
                    )
                })}

            </div>
            <div className='mb-5'>
                <Pagination activePage={activePage} perPage={perPage} count={historysCount} setActivePage={setActivePage} />
            </div>
        </div>
    );
};

export default page;