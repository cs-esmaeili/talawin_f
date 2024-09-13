'use client'

import { productList as RproductList } from '@/services/Product';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import translations from "@/translations.json";
import config from "@/config.json";
import { io } from 'socket.io-client';
import ProductDiscount from '@/components/site/board/ProductDiscount';
import ProductPrice from '@/components/site/board/ProductPrice';
import Image from 'next/image';
import { getObjectByKey } from '@/utils/main';
import ApiBoxPrices from '@/components/site/board/ApiBoxPrices';

const page = () => {
    const [productPrices, setProductPrices] = useState(null);
    const [boxPrices, setBoxPrices] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const { someThingIsWrong } = translations['fa'];
    const [perPage, setPerPage] = useState(8);
    const [size, setSize] = useState(null);

    const productList = async (page) => {
        try {
            const { data } = await RproductList({ page, perPage });
            const { productsCount, products } = data;
            setProducts(products);
            setProductsCount(productsCount);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
            setTimeout(() => {
                productList(activePage);
            }, 5000);
        }
    };

    useEffect(() => {
        productList(activePage);
    }, [activePage, perPage]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setSize(width)
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const socket = io(config.api, {
            query: { token: config.board_key }
        });
        socket.on('productPrices', (data) => {
            setProductPrices(data);
        });

        socket.on('boxPrices', (data) => {
            setBoxPrices(data);
        });

        socket.on("disconnect", () => {
            setProductPrices(null);
            setBoxPrices(null);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (size && size >= 1024) {
        return (
            <div className='flex h-screen max-h-screen overflow-y-hidden grow justify-center'>
                <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-screen p-2 gap-2">
                    {products && products.length > 0 &&
                        products.map(product => (
                            <div key={product._id} className="w-full h-full min-h-fit flex flex-col bg-secondary items-center  p-2 rounded-lg shadow-lg overflow-hidden">

                                <div className='grow w-full  relative flex justify-center items-center'>
                                    <Image
                                        src={product.image.url}
                                        // width={200}
                                        // height={200}
                                        fill
                                        alt="Picture of the product"
                                        className='object-contain'
                                    />
                                </div>

                                <div className='h-fit flex flex-col items-center justify-center  '>
                                    <div className="text-xl mb-2 text-nowrap font-bold">{product.name}</div>
                                    <div className='flex flex-col h-fit justify-center items-center my-3 mt-2'>

                                        <div className='text-xs sm:text-sm  lg:text-base xl:text-lg  mb-2 rtl flex flex-wrap justify-center gap-2 text-nowrap font-bold'>
                                            <span className='rtl'>فروش :</span>
                                            <ProductPrice productPrices={productPrices} product_id={product._id} sellPrice />
                                        </div>

                                        <div className='text-xs sm:text-sm  lg:text-base xl:text-lg  mb-2 rtl flex flex-wrap justify-center gap-2 text-nowrap font-bold'>
                                            <span className='rtl'>خرید :</span>
                                            <ProductPrice productPrices={productPrices} product_id={product._id} sellPrice={false} />
                                        </div>

                                        <div className={`'text-xs sm:text-sm  lg:text-base xl:text-lg  mb-2 rtl flex flex-wrap justify-center gap-2 text-nowrap font-bold ${product.discount == 0 && "opacity-0"}`}>
                                            <span className='rtl'>تخفیف : </span>
                                            <ProductDiscount productPrices={productPrices} product_id={product._id} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-col gap-1 p-5 w-full md:w-1/3 lg:w-1/4'>
                    <div className='flex flex-col gap-2 p-3 rounded-lg bg-secondary'>
                        <div className='flex justify-center items-center text-2xl md:text-4xl rtl'>
                            <span className='text-accent'>طلا</span>
                            <span>وین</span>
                        </div>
                        <div className='flex justify-center items-center text-xl md:text-3xl'>
                            <span className='text-accent'>Tala</span>
                            <span>Win</span>
                        </div>
                    </div>
                    {boxPrices &&
                        <>
                            <div className='flex text-center justify-center items-center bg-secondary p-1 rounded-lg font-bold'>
                                {getObjectByKey(boxPrices, 'apiPath', "137120").updatedAt}
                            </div>
                            <div className='flex flex-col'>
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137120")} />
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137121")} />
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137119")} />
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137137")} />
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex p-2 h-screen overflow-y-auto flex-wrap-reverse sm:flex-nowrap">
                <div className="flex flex-wrap justify-start items-center grow overflow-y-auto">
                    {products && products.length > 0 &&
                        products.map(product => (
                            <div key={product._id} className="w-full sm:w-full md:w-2/4 lg:w-1/4 p-2">
                                <div className="flex flex-col   bg-secondary items-center justify-center p-4 rounded-lg shadow-lg">
                                    <div className="relative max-w-full h-auto mb-4">
                                        <Image
                                            src={product.image.url}
                                            width={220}
                                            height={420}
                                            objectFit="cover"
                                            className="object-cover"
                                            alt="Picture of the product"
                                        />
                                    </div>

                                    <div className='h-fit flex flex-col items-center justify-center  '>
                                        <div className="text-xl mb-2 text-nowrap font-bold">{product.name}</div>
                                        <div className='flex flex-col h-fit justify-center items-center my-3 mt-2'>

                                            <div className='text-xs sm:text-sm  lg:text-base xl:text-lg  mb-2 rtl flex flex-wrap justify-center gap-2 text-nowrap font-bold'>
                                                <span className='rtl'>فروش :</span>
                                                <ProductPrice productPrices={productPrices} product_id={product._id} sellPrice />
                                            </div>

                                            <div className='text-xs sm:text-sm  lg:text-base xl:text-lg  mb-2 rtl flex flex-wrap justify-center gap-2 text-nowrap font-bold'>
                                                <span className='rtl'>خرید :</span>
                                                <ProductPrice productPrices={productPrices} product_id={product._id} sellPrice={false} />
                                            </div>

                                            <div className={`'text-xs sm:text-sm  lg:text-base xl:text-lg  mb-2 rtl flex flex-wrap justify-center gap-2 text-nowrap font-bold ${product.discount == 0 && "opacity-0"}`}>
                                                <span className='rtl'>تخفیف : </span>
                                                <ProductDiscount productPrices={productPrices} product_id={product._id} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-col gap-1 p-5   overflow-hidden min-w-fit w-full   sm:w-1/3 md:w-1/3 lg:w-1/4'>
                    <div className='flex flex-col gap-2 p-3 rounded-lg bg-secondary'>
                        <div className='flex justify-center items-center text-2xl md:text-4xl rtl'>
                            <span className='text-accent'>طلا</span>
                            <span>وین</span>
                        </div>
                        <div className='flex justify-center items-center text-xl md:text-3xl'>
                            <span className='text-accent'>Tala</span>
                            <span>Win</span>
                        </div>
                    </div>
                    {boxPrices &&
                        <>
                            <div className='flex text-center justify-center items-center bg-secondary p-1 rounded-lg font-bold'>
                                {getObjectByKey(boxPrices, 'apiPath', "137120").updatedAt}
                            </div>
                            <div className='flex flex-col min-w-fit'>
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137120")} />
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137121")} />
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137119")} />
                                <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137137")} />
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
};

export default page;
