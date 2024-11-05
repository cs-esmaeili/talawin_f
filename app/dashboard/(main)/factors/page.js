'use client'

import { useState, useEffect } from 'react';
import { factorListUser, changeFactorStatus } from '@/services/Factor';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";
import { addCommas } from '@/utils/main';
import { RiMore2Fill } from "react-icons/ri";
import { useModalContext } from '@/components/dashboard/Modal';
import ProductsList from '@/components/dashboard/coWorker/ProductsList';
import { useSelector } from 'react-redux';

const page = () => {


    const [factors, setfactors] = useState(null);
    const [factorsCount, setfactorsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [editData, setEditData] = useState(null);
    const [updateList, setUpdateList] = useState(false);
    const [loading, setLoading] = useState(true);
    const { someThingIsWrong } = translations['fa'];
    const { openModal, closeModal } = useModalContext();

    const roleName = useSelector((state) => state.information.value.role_id.name);

    const factorsList = async () => {
        try {
            setLoading(true);
            const { data } = await factorListUser({ page: activePage, perPage });
            const { factorsCount, factors } = data;
            setfactors(factors);
            setfactorsCount(factorsCount);
            setLoading(false);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    const changeStatus = async (factor_id, status) => {
        try {
            setLoading(true);
            const { data } = await changeFactorStatus({ factor_id, status });
            const { message } = data;
            toast.success(message);
            factorsList();
        } catch (error) {
            toast.error(message);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        factorsList();
    }, [activePage, updateList]);


    return (
        <div className='flex grow flex-col justify-center items-center'>
            {loading ?
                <div className="relative  w-12 h-12">
                    <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                    <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                </div>
                :
                <>
                    <div className='flex grow w-full p-2'>
                        {factors &&
                            <Table
                                headers={["زمان", "قیمت", "وضعیت", "عنوان"]}
                                rowsData={["time", "price", "type", "title"]}
                                rows={factors}
                                headerClasses={["", "", "", ""]}
                                rowClasses={(row, rowIndex) => {
                                    return "";
                                }}
                                cellClasses={(cell, cellIndex, row, rowIndex) => {
                                    if (cell == "خرید") {
                                        return "text-green-400";
                                    } else if (cell == "فروش") {
                                        return "text-red-400";
                                    }
                                }}
                                dataModifier={(cellData, cellIndex, rowIndex) => {
                                    if (cellIndex == 1) {
                                        return (<div className='rtl'> {addCommas(cellData) + " " + "ریال"} </div>);
                                    }
                                    if (cellIndex == 2) {
                                        if (cellData == 1 || cellData == 2) {
                                            return "در انتظار تایید"
                                        }
                                        if (cellData == 3) {
                                            return "تایید شده"
                                        }
                                        if (cellData == 4) {
                                            return "رد شده"
                                        }
                                    }
                                    return cellData;
                                }}
                                columnVisibilityClasses={[
                                    "",
                                    "",
                                    "",
                                    ""
                                ]}
                                actionComponent={({ rowData, rowIndex }) => {
                                    return (
                                        <div className="flex h-fit items-center gap-3 justify-center text-nowrap ">

                                            {roleName == "coWorker" && (rowData.type == 1 || rowData.type == 2) &&
                                                <>
                                                    <button className='bg-red-400 p-3 rounded-md' onClick={() => {
                                                        changeStatus(rowData._id, 4);
                                                    }}>
                                                        رد
                                                    </button>
                                                    <button className='bg-green-400 p-3 rounded-md' onClick={() => {
                                                        changeStatus(rowData._id, 3);
                                                    }}>
                                                        ثبت
                                                    </button>

                                                </>
                                            }
                                            <button className='bg-accent p-3 rounded-md' onClick={() => {
                                                openModal(<ProductsList products={rowData.products} />);
                                            }}>
                                                کالاها
                                            </button>
                                        </div>
                                    );
                                }}
                                rowCountstart={(perPage * (activePage - 1))}
                                selectListener={(row, rowIndex) => {
                                    setEditData(row);
                                }}
                            />
                        }
                    </div>
                    <Pagination activePage={activePage} perPage={perPage} count={factorsCount} setActivePage={setActivePage} />
                </>
            }
        </div >
    );
};

export default page;