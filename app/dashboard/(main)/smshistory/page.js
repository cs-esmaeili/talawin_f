'use client'

import { useState, useEffect } from 'react';
import { smsHistoryList as RsmsHistoryList } from '@/services/SmsHistory';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";
import { TbListDetails } from "react-icons/tb";
import { useModalContext } from '@/components/dashboard/Modal';

const page = () => {

    const [historys, sethistorys] = useState(null);
    const [historysCount, sethistorysCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [editData, setEditData] = useState(null);
    const { openModal, closeModal } = useModalContext();

    const { someThingIsWrong, categoryPage } = translations['fa'];


    const categoryList = async () => {
        try {
            const { data } = await RsmsHistoryList({ page: activePage, perPage });
            const { historysCount, historys } = data;
            sethistorys(historys);
            sethistorysCount(historysCount);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        categoryList();
    }, [activePage]);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex grow w-full p-2 overflow-x-scroll'>
                {historys &&
                    <Table
                        headers={[
                            { name: "_id", cssClass: "hidden lg:table-cell" },
                            { name: "templateName", cssClass: "" },
                            { name: "text", cssClass: "hidden sm:table-cell" },
                            { name: "phoneNumber", cssClass: "hidden lg:table-cell" },
                            { name: categoryPage.actions, cssClass: "" },
                        ]}
                        rowData={[
                            { name: '_id', cssClass: "hidden lg:table-cell" },
                            { name: 'templateName', cssClass: "hidden sm:table-cell" },
                            { name: 'text', cssClass: "hidden sm:table-cell" },
                            { name: 'phoneNumber', cssClass: "" },
                        ]}
                        rows={historys}
                        rowCountstart={(perPage * (activePage - 1))}
                        special={(row, index) => {
                            return (
                                <td className={`h-[1px]  p-0 pb-1`}>
                                    <div className="flex h-full items-center justify-center rounded-e-xl bg-secondary p-1 text-nowrap">
                                        <TbListDetails className='text-blue-400 text-2xl' onClick={() => {
                                            openModal(
                                                <div>
                                                    {row.text}
                                                </div>
                                            );
                                        }} />
                                    </div>
                                </td>
                            )
                        }}
                    />
                }
            </div>
            <Pagination activePage={activePage} perPage={perPage} count={historysCount} setActivePage={setActivePage} />
        </div>
    );
};

export default page;