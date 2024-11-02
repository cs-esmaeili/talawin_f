'use client'
import { useState, useEffect } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import Create from '@/components/dashboard/category/Create';
import Delete from '@/components/dashboard/category/Delete';
import { categoryList as RcategoryList } from '@/services/Category';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";

export default function Category({ pickMode = false, selectListener }) {


    const [categorys, setCategorys] = useState(null);
    const [categorysCount, setCategorysCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [editData, setEditData] = useState(null);

    const { someThingIsWrong, categoryPage } = translations['fa'];


    const categoryList = async () => {
        try {
            const { data } = await RcategoryList({ page: activePage, perPage });
            const { categorysCount, categorys } = data;
            setCategorys(categorys);
            setCategorysCount(categorysCount);
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
            {pickMode == false &&
                <div>
                    <Create categoryList={categoryList} editData={editData} setEditData={setEditData} />
                </div>
            }
            <div className='flex grow w-full p-2 overflow-x-scroll'>
                {categorys &&
                    <Table
                        headers={[categoryPage.id, categoryPage.name, categoryPage.updatedAt]}
                        actionHeader={categoryPage.actions}
                        rowsData={["_id", "name", "updatedAt"]}
                        rows={categorys}
                        headerClasses={["", "", "", ""]}
                        rowClasses={(row, rowIndex) => {
                            return "";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            return cell == "ارسال شده" && "text-green-400";
                        }}
                        columnVisibilityClasses={[
                            "",
                            "",
                            "",
                            ""
                        ]}
                        rowCountstart={(perPage * (activePage - 1))}
                        selectListener={(row, rowIndex) => {
                            if (pickMode) {
                                selectListener(row);
                            }
                        }}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <td className={`h-[1px]  p-0 pb-1 ${pickMode && "opacity-50"}`}>
                                    <div className="flex h-full items-center justify-center rounded-e-xl bg-secondary p-1 text-nowrap">
                                        <Delete row={rowData} index={rowIndex} categoryList={categoryList} categorys={categorys} pickMode={pickMode} />
                                        <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                            if (!pickMode) {
                                                setEditData(rowData);
                                            }
                                        }} />
                                    </div>
                                </td>
                            );
                        }}
                    />
                }
            </div>
            <Pagination activePage={activePage} perPage={perPage} count={categorysCount} setActivePage={setActivePage} />

        </div>

    )
}
