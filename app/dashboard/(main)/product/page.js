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

const page = () => {

    const [products, setProducts] = useState(null);
    const [productsCount, setProductsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [editData, setEditData] = useState(null);
    const [apiMode, setApiMode] = useState(false);
    const [apiData, setApiData] = useState({
        "result": [
            {
                "key": 391296,
                "category": "آبشده",
                "title": "آبشده نقدی",
                "price": "144350000",
                "change": 0,
                "high": "145900000",
                "low": "143850000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137203,
                "category": "ارز آزاد",
                "title": "دلار",
                "price": "0",
                "change": 0,
                "high": "0",
                "low": "0",
                "created_at": "2024-05-23 00:00:00"
            },
            {
                "key": 137252,
                "category": "ارز دولتی",
                "title": "دلار (بانکی)",
                "price": "377145",
                "change": "+0.59",
                "high": "377145",
                "low": "377145",
                "created_at": "2024-06-09 09:16:12"
            },
            {
                "key": 137291,
                "category": "ارز سنا (اسکناس / خرید)",
                "title": "دلار (سنا/خرید)",
                "price": "450990",
                "change": "+0.49",
                "high": "450990",
                "low": "450990",
                "created_at": "2024-06-09 09:20:30"
            },
            {
                "key": 137307,
                "category": "ارز سنا (اسکناس / فروش)",
                "title": "دلار (سنا/فروش)",
                "price": "455086",
                "change": "+0.49",
                "high": "455086",
                "low": "455086",
                "created_at": "2024-06-09 09:14:29"
            },
            {
                "key": 523801,
                "category": "ارز نیما (حواله / خرید)",
                "title": "دلار (نیما/خرید)",
                "price": "421093",
                "change": "+0.39",
                "high": "421093",
                "low": "421093",
                "created_at": "2024-06-09 09:13:07"
            },
            {
                "key": 523800,
                "category": "ارز نیما (حواله / فروش)",
                "title": "دلار (نیما/فروش)",
                "price": "424917",
                "change": "+0.39",
                "high": "424917",
                "low": "424917",
                "created_at": "2024-06-09 09:14:33"
            },
            {
                "key": 137137,
                "category": "سکه نقدی",
                "title": "سکه امامی ",
                "price": "406020000",
                "change": 0,
                "high": "407100000",
                "low": "405800000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137120,
                "category": "طلا",
                "title": "طلای 18 عیار / 750",
                "price": "33328000",
                "change": 0,
                "high": "33688000",
                "low": "33212000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137119,
                "category": "مظنه / مثقال",
                "title": "مثقال طلا ",
                "price": "144330000",
                "change": 0,
                "high": "145920000",
                "low": "143830000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137146,
                "category": "آبشده",
                "title": "آبشده بنکداری ",
                "price": "144410000",
                "change": 0,
                "high": "145970000",
                "low": "143910000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137136,
                "category": "سکه نقدی",
                "title": "سکه بهار آزادی ",
                "price": "375050000",
                "change": 0,
                "high": "375300000",
                "low": "374900000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137121,
                "category": "طلا",
                "title": "طلای ۲۴ عیار",
                "price": "44437000",
                "change": 0,
                "high": "44917000",
                "low": "44283000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137204,
                "category": "ارز آزاد",
                "title": "یورو",
                "price": "641900",
                "change": 0,
                "high": "643500",
                "low": "635000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137253,
                "category": "ارز دولتی",
                "title": "یورو (بانکی)",
                "price": "407577",
                "change": "+0.59",
                "high": "407577",
                "low": "407577",
                "created_at": "2024-06-09 09:16:16"
            },
            {
                "key": 137292,
                "category": "ارز سنا (اسکناس / خرید)",
                "title": "یورو (سنا/خرید)",
                "price": "487381",
                "change": "+0.49",
                "high": "487381",
                "low": "487381",
                "created_at": "2024-06-09 09:20:30"
            },
            {
                "key": 137308,
                "category": "ارز سنا (اسکناس / فروش)",
                "title": "یورو (سنا/فروش)",
                "price": "491807",
                "change": "+0.49",
                "high": "491807",
                "low": "491807",
                "created_at": "2024-06-09 09:14:29"
            },
            {
                "key": 523799,
                "category": "ارز نیما (حواله / خرید)",
                "title": "یورو (نیما/خرید)",
                "price": "455071",
                "change": "+0.39",
                "high": "455071",
                "low": "455071",
                "created_at": "2024-06-09 09:13:07"
            },
            {
                "key": 523764,
                "category": "ارز نیما (حواله / فروش)",
                "title": "یورو (نیما/فروش)",
                "price": "459204",
                "change": "+0.39",
                "high": "459204",
                "low": "459204",
                "created_at": "2024-06-09 09:14:33"
            },
            {
                "key": 137255,
                "category": "ارز دولتی",
                "title": "پوند (بانکی)",
                "price": "479924",
                "change": "+0.59",
                "high": "479924",
                "low": "479924",
                "created_at": "2024-06-09 09:16:12"
            },
            {
                "key": 137293,
                "category": "ارز سنا (اسکناس / خرید)",
                "title": "درهم (سنا/خرید)",
                "price": "122802",
                "change": "+0.49",
                "high": "122802",
                "low": "122802",
                "created_at": "2024-06-09 09:20:31"
            },
            {
                "key": 137309,
                "category": "ارز سنا (اسکناس / فروش)",
                "title": "درهم (سنا/فروش)",
                "price": "123917",
                "change": "+0.49",
                "high": "123917",
                "low": "123917",
                "created_at": "2024-06-09 09:14:29"
            },
            {
                "key": 137205,
                "category": "ارز آزاد",
                "title": "درهم امارات ",
                "price": "162910",
                "change": 0,
                "high": "163300",
                "low": "161160",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 523803,
                "category": "ارز نیما (حواله / خرید)",
                "title": "درهم امارات (نیما/خرید)",
                "price": "114661",
                "change": "+0.39",
                "high": "114661",
                "low": "114661",
                "created_at": "2024-06-09 09:13:07"
            },
            {
                "key": 523802,
                "category": "ارز نیما (حواله / فروش)",
                "title": "درهم امارات (نیما/فروش)",
                "price": "115702",
                "change": "+0.39",
                "high": "115702",
                "low": "115702",
                "created_at": "2024-06-09 09:14:34"
            },
            {
                "key": 391295,
                "category": "طلا",
                "title": "طلای 18 عیار / 740",
                "price": "32883000",
                "change": 0,
                "high": "33239000",
                "low": "32770000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137138,
                "category": "سکه نقدی",
                "title": "نیم سکه ",
                "price": "232000000",
                "change": 0,
                "high": "232000000",
                "low": "231000000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 391297,
                "category": "آبشده",
                "title": "آبشده کمتر از کیلو ",
                "price": "144460000",
                "change": 0,
                "high": "146020000",
                "low": "143960000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137294,
                "category": "ارز سنا (اسکناس / خرید)",
                "title": "پوند (سنا/خرید)",
                "price": "573894",
                "change": "+0.49",
                "high": "573894",
                "low": "573894",
                "created_at": "2024-06-09 09:20:30"
            },
            {
                "key": 137310,
                "category": "ارز سنا (اسکناس / فروش)",
                "title": "پوند (سنا/فروش)",
                "price": "579106",
                "change": "+0.49",
                "high": "579106",
                "low": "579106",
                "created_at": "2024-06-09 09:14:29"
            },
            {
                "key": 137206,
                "category": "ارز آزاد",
                "title": "پوند انگلیس",
                "price": "754600",
                "change": 0,
                "high": "756400",
                "low": "746400",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 523805,
                "category": "ارز نیما (حواله / خرید)",
                "title": "پوند انگلیس (نیما/خرید)",
                "price": "535849",
                "change": "+0.39",
                "high": "535849",
                "low": "535849",
                "created_at": "2024-06-09 09:13:07"
            },
            {
                "key": 523804,
                "category": "ارز نیما (حواله / فروش)",
                "title": "پوند انگلیس (نیما/فروش)",
                "price": "540715",
                "change": "+0.39",
                "high": "540715",
                "low": "540715",
                "created_at": "2024-06-09 09:14:34"
            },
            {
                "key": 137139,
                "category": "سکه نقدی",
                "title": "ربع سکه ",
                "price": "150000000",
                "change": 0,
                "high": "152000000",
                "low": "150000000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 391298,
                "category": "طلا",
                "title": "طلای دست دوم",
                "price": "32883420",
                "change": 0,
                "high": "33238770",
                "low": "32769530",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 391614,
                "category": "مظنه / مثقال",
                "title": "مثقال / بر مبنای سکه",
                "price": "179335780",
                "change": 0,
                "high": "180669520",
                "low": "179216540",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 137140,
                "category": "سکه نقدی",
                "title": "سکه گرمی ",
                "price": "69000000",
                "change": 0,
                "high": "69000000",
                "low": "69000000",
                "created_at": "2024-06-08 00:00:00"
            },
            {
                "key": 790758,
                "category": "ارز دولتی",
                "title": "درهم امارات (بانکی)",
                "price": "102694",
                "change": "+0.59",
                "high": "102694",
                "low": "102694",
                "created_at": "2024-06-09 09:16:13"
            }
        ]
    });

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
                    <ProductCardEdit editData={editData} setEditData={setEditData} setApiMode={setApiMode} apiMode={apiMode} apiData={apiData} />
                </div>
            </div>
            <div className='w-1/2 '>
                {apiMode ?
                    <div className='flex flex-col  w-full relative overflow-x-auto h-full justify-center bg-red-500'>
                        <SyntaxHighlighter language="javascript" style={tomorrowNightEighties} wrapLongLines>
                            {JSON.stringify(apiData, null, 2)}
                        </SyntaxHighlighter>
                        <button className='bg-accent w-full sticky bottom-0 p-3 rounded-md rtl' onClick={() => {
                            setApiMode(false);
                        }}>خروج از API</button>
                    </div>
                    :
                    <>
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
                                        setEditData(row);
                                    }}
                                />
                            }
                        </div>
                        <Pagination activePage={activePage} perPage={perPage} count={setProductsCount} setActivePage={setActivePage} />
                    </>
                }
            </div>
        </div>
    );
};

export default page;