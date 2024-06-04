'use client'

import ProductCard from '@/components/dashboard/ProductCard';
import { useState, useEffect } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import Create from '@/components/dashboard/category/Create';
import Delete from '@/components/dashboard/category/Delete';
import { productList as RproductList } from '@/services/Product';
import toast from 'react-hot-toast';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import translations from "@/translations.json";

const page = () => {

    const [products, setProducts] = useState(null);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [editData, setEditData] = useState(null);

    const { someThingIsWrong, categoryPage } = translations['fa'];


    const productList = async () => {
        try {
            const { data } = await RproductList({ page: activePage, perPage });
            const { productsCount, products } = data;
            setProducts(products);
            setProductsCount(productsCount);
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
    }, [activePage]);

    return (
        <div className='flex w-full '>
            <div className='w-1/2 justify-center items-center flex'>
                <div>
                    <ProductCard />
                </div>
            </div>
            <div className='w-1/2 '>
                <div className='flex grow w-full p-2 overflow-x-scroll'>
                    {products &&
                        <Table
                            headers={[
                                { name: categoryPage.id, cssClass: "hidden lg:table-cell" },
                                { name: categoryPage.name, cssClass: "" },
                                { name: categoryPage.updatedAt, cssClass: "hidden sm:table-cell" },
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
                                if (pickMode) {
                                    selectListener(row);
                                }
                            }}
                        />
                    }
                </div>
                <Pagination activePage={activePage} perPage={perPage} count={setProductsCount} setActivePage={setActivePage} />
            </div>
        </div>
    );
};

export default page;