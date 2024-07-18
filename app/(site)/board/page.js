'use client'

import { productList as RproductList } from '@/services/Product';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import translations from "@/translations.json";
import ProductList from "@/components/site/board/ProductList";
import config from "@/config.json";
import { io } from 'socket.io-client';
import ProductDiscount from '@/components/site/board/ProductDiscount';
import ProductPrice from '@/components/site/board/ProductPrice';
import Image from 'next/image';
import { getObjectByKey } from '@/utils/main';
import ApiBoxPrices from '@/components/site/board/ApiBoxPrices';

const page = () => {
    const [apiData, setApiData] = useState(null);
    const [productPrices, setProductPrices] = useState(null);
    const [boxPrices, setBoxPrices] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const { someThingIsWrong } = translations['fa'];
    const [loading, setLoading] = useState(true);
    const [perPage, setPerPage] = useState(8);

    const productList = async (page) => {
        try {
            setLoading(true);
            const { data } = await RproductList({ page, perPage });
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
            }, 25000);
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

        socket.on('boxPrices', (data) => {
            console.log(data);
            setBoxPrices(data);
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
        <div className='flex h-screen max-h-screen overflow-y-hidden grow justify-center'>

            <div className="flex flex-wrap justify-start w-full h-full p-3">
                {loading ?
                    <div className='flex grow justify-center items-center'>
                        <div className="relative  w-40 h-40">
                            <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                            <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                        </div>
                    </div>
                    : (
                        products && products.map(product => (
                            <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                <div className="flex flex-col   bg-secondary items-center justify-center p-4 rounded-lg shadow-lg">

                                    <div className='h-auto w-full flex justify-center items-center'>
                                        <Image
                                            src={product.image.url}
                                            width={200}
                                            height={200}
                                            placeholder="blur"
                                            blurDataURL={product.image.blurHash}
                                            alt="Picture of the author"
                                            className='object-contain'
                                        />
                                    </div>


                                    <h2 className="text-xl  mb-2">{product.name}</h2>
                                    <h2 className="text-xl  mb-2">{product.disc}</h2>

                                    <div className='flex flex-col h-fit justify-center items-center my-3 mt-2'>
                                        {product.discount != 0 &&
                                            <h3 className={`text-lg  mb-2 rtl`}>
                                                <div className='flex flex-nowrap gap-2 '>
                                                    <span className='rtl '>تخفیف : </span>
                                                    <ProductDiscount productPrices={productPrices} product_id={product._id} />
                                                </div>
                                            </h3>
                                        }
                                        <h3 className={`text-lg  mb-2 rtl `}>
                                            <div className='flex flex-nowrap gap-2 text-accent'>
                                                <span className='rtl'>فروش به شما :</span>
                                                <ProductPrice productPrices={productPrices} product_id={product._id} sellPrice />
                                            </div>
                                        </h3>
                                        <h3 className={`text-lg  mb-2 rtl `}>
                                            <div className='flex flex-nowrap gap-2'>
                                                <span className='rtl'>خرید از شما :</span>
                                                <ProductPrice productPrices={productPrices} product_id={product._id} sellPrice={false} />
                                            </div>
                                        </h3>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                <div id="bottom-of-list" className="h-1"></div>
            </div>
            <div className='flex flex-col gap-3 p-5 w-1/4'>

                <div className='flex flex-col gap-5 p-3 rounded-lg bg-secondary'>
                    <div className='flex justify-center items-center  text-7xl rtl'>
                        <span className='text-accent'>طلا</span>
                        <span>وین</span>
                    </div>
                    <div className='flex justify-center items-center text-5xl'>
                        <span className='text-accent'>Tala</span>
                        <span>Win</span>
                    </div>
                </div>
                {boxPrices &&
                    <div className='flex justify-center items-center  bg-secondary p-3 rounded-lg'>
                        <span className=''>{getObjectByKey(boxPrices, 'apiPath', "137120").updatedAt}</span>
                    </div>
                }
                {boxPrices &&
                    <div className='flex flex-col'>
                        <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137120")} />
                        <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137121")} />
                        <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137119")} />
                        <ApiBoxPrices box={getObjectByKey(boxPrices, 'apiPath', "137137")} />
                    </div>
                }

            </div>
        </div>
    );
};

export default page;
