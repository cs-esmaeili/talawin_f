'use client'

import ProductList from "@/components/dashboard/ProductList";
import { useState, useEffect } from 'react';
import Pagination from '@/components/dashboard/Pagination';
import toast from 'react-hot-toast';
import translations from "@/translations.json";
import { productList as RproductList } from '@/services/Product';
import { useSelector } from 'react-redux';

export default function Dashboard() {

    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const { someThingIsWrong } = translations['fa'];
    const roleName = useSelector((state) => state.information.value.role_id.name);

    const productList = async () => {
        try {
            setLoading(true);

            const { data } = await RproductList({ page: activePage, perPage, category: roleName });
            const { productsCount, products } = data;
            setProducts(products);
            setProductsCount(productsCount);
            setLoading(false);
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
        productList();
    }, [activePage]);

    return (
        <div className="flex flex-col items-center  grow">
            {loading ?
                <div className="relative w-20 h-20">
                    <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                    <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                </div>
                :
                <div className="overflow-auto mb-5 w-full">
                    <ProductList products={products} />
                    <Pagination activePage={activePage} perPage={perPage} count={productsCount} setActivePage={setActivePage} />
                </div>
            }
        </div>
    )
}
