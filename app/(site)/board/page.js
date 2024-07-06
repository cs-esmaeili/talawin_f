'use client'

import { productList as RproductList } from '@/services/Product';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import translations from "@/translations.json";
import ProductList from "@/components/site/ProductList";
import config from "@/config.json";
import { io } from 'socket.io-client';
import ProductDiscount from '@/components/site/ProductDiscount';
import ProductPrice from '@/components/site/ProductPrice';
import Image from 'next/image';

const page = () => {
    const [apiData, setApiData] = useState(null);
    const [productPrices, setProductPrices] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(2);
    const { someThingIsWrong } = translations['fa'];
    const [loading, setLoading] = useState(true);
    const [perPage, setPerPage] = useState(8);

    const productList = async (page) => {
        try {
            setProducts([]);
            setLoading(true);
            const { data } = await RproductList({ page, perPage });
            const { productsCount, products } = data;
            setProducts(prevProducts => [...prevProducts, ...products]);
            setProductsCount(productsCount);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        productList(activePage);
    }, [activePage]);

    useEffect(() => {
        if (loading === false) {
            setTimeout(() => {
                const totalPages = Math.ceil(productsCount / perPage);
                if (activePage < totalPages) {
                    setActivePage(activePage + 1);
                } else if (activePage === totalPages) {
                    setActivePage(1);
                }
            }, 20000);
        }
    }, [loading]);

    useEffect(() => {
        const socket = io(config.api);

        socket.on('apiData', (data) => {
            setApiData(data);
        });
        socket.on('productPrices', (data) => {
            setProductPrices(data);
        });

        socket.on("disconnect", () => {
            setApiData(null);
            setProductPrices(null);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className='flex h-screen max-h-screen overflow-y-hidden grow'>
            <div className="flex flex-wrap justify-start w-full h-full p-3">
                {loading ? (
                    Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className="product flex flex-col bg-secondary items-center justify-center p-4 rounded-lg shadow-lg animate-pulse m-2" style={{ flex: '1 1 calc(25% - 1rem)' }}>
                            <div className="rounded-full bg-slate-700 w-28 h-28"></div>
                            <div className="h-2 bg-slate-700 rounded my-2 w-3/4"></div>
                            <div className="flex flex-col gap-5 w-3/4">
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    products && products.map(product => (
                        <div key={product._id} className="product flex flex-col bg-secondary items-center justify-center p-4 rounded-lg shadow-lg m-2 h-fit" style={{ flex: '1 1 calc(25% - 1rem)' }}>
                            <div className="relative w-full h-48 mb-4">
                                <Image
                                    src={product.image.url}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                    placeholder='blur'
                                    blurDataURL={product.image.blurHash}
                                />
                            </div>
                            <h2 className="text-xl mb-2">{product.name}</h2>
                            <h2 className="text-xl mb-2">{product.disc}</h2>
                            <div className='flex flex-col grow justify-center items-center h-16 my-3'>
                                {product.discount !== 0 && (
                                    <h3 className="text-lg mb-2 rtl line-through text-red-500">
                                        <ProductDiscount product_id={product._id} apiData={apiData} productPrices={productPrices} />
                                    </h3>
                                )}
                                <h3 className={`text-lg mb-2 rtl ${product.discount !== 0 && "text-green-500"}`}>
                                    <ProductPrice product_id={product._id} apiData={apiData} productPrices={productPrices} />
                                </h3>
                            </div>
                        </div>
                    ))
                )}
                <div id="bottom-of-list" className="h-1"></div>
            </div>
            <div className='flex w-fit'>
                <button onClick={() => setActivePage(prev => prev + 1)}>Load More</button>
            </div>
        </div>
    );
};

export default page;
