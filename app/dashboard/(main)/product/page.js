'use client'

import ProductCardEdit from '@/components/dashboard/ProductCardEdit';
import { useState, useEffect } from 'react';
import { productList as RproductList } from '@/services/Product';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSelector } from 'react-redux';

const page = () => {

    const [products, setProducts] = useState(null);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [editData, setEditData] = useState(null);
    const [updateList, setUpdateList] = useState(false);
    const [loading, setLoading] = useState(true);
    const apiData = useSelector((state) => state.apiData.value);

    const { someThingIsWrong, product } = translations['fa'];


    const productList = async () => {
        try {
            setLoading(true);
            const { data } = await RproductList({ page: activePage, perPage });
            const { productsCount, products } = data;
            setProducts(products);
            setProductsCount(productsCount);
            setLoading(false);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    useEffect(() => {
        productList();
    }, [activePage, updateList]);


    return (
        <div className='flex w-full '>
            <div className='w-1/2 justify-center items-center flex'>
                <div>
                    <ProductCardEdit editData={editData} setEditData={setEditData} updateList={() => setUpdateList(!updateList)} />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center w-1/2 '>
                {loading ?
                    <div className="relative  w-12 h-12">
                        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                    </div>
                    :
                    <>
                        <div className='flex grow w-full p-2 overflow-x-scroll'>
                            {products &&
                                <Table
                                    headers={[
                                        { name: product.id, cssClass: "hidden lg:table-cell" },
                                        { name: product.name, cssClass: "" },
                                        { name: product.updatedAt, cssClass: "hidden sm:table-cell" },
                                    ]}
                                    rowData={[
                                        { name: '_id', cssClass: "hidden lg:table-cell" },
                                        { name: 'name', cssClass: "" },
                                        { name: 'updatedAt', cssClass: "hidden sm:table-cell" }
                                    ]}
                                    rows={products}
                                    rowCountstart={(perPage * (activePage - 1))}
                                    selectMode={true}
                                    selectListener={(row, index) => {
                                        setEditData(row);
                                    }}
                                />
                            }
                        </div>
                        <Pagination activePage={activePage} perPage={perPage} count={productsCount} setActivePage={setActivePage} />
                    </>
                }
            </div>
        </div>
    );
};

export default page;