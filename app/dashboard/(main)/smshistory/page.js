'use client'

import { useState, useEffect } from 'react';
import { smsHistoryList as RsmsHistoryList } from '@/services/SmsHistory';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";
import { TbListDetails } from "react-icons/tb";
import { useModalContext } from '@/components/dashboard/Modal';
import { MdCancelScheduleSend } from "react-icons/md";

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
                        headers={["id", "قالب", "وضعیت", "شماره تلفن"]}
                        rowsData={["_id", "templateName", "status", "phoneNumber"]}
                        rows={historys}
                        headerClasses={["", "", "", ""]}
                        rowClasses={(row, rowIndex) => {
                            return "";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            return cell == "ارسال شده" && "text-green-400";
                        }}
                        columnVisibilityClasses={[
                            "hidden xl:table-cell",
                            "hidden md:table-cell", 
                            "hidden sm:table-cell", 
                            "",
                        ]}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-fit items-center gap-3 justify-center text-nowrap ">
                                    <MdCancelScheduleSend className='text-red-400 text-2xl' />
                                    <TbListDetails className='text-blue-400 text-2xl' onClick={() => {
                                        openModal(
                                            <div>
                                                {rowData.text}
                                            </div>
                                        );
                                    }} />
                                </div>
                            );
                        }}
                        rowCountstart={(perPage * (activePage - 1))}
                    />
                }
            </div>
            <Pagination activePage={activePage} perPage={perPage} count={historysCount} setActivePage={setActivePage} />
        </div>
    );
};

export default page;