'use client'

import Input from '@/components/dashboard/Input';
import { useState, useEffect } from 'react';
import { searchProduct as RsearchProduct } from '@/services/Product';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

import DatePicker, { DateObject } from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/yellow.css"
import ProductPrice from '@/components/dashboard/ProductPrice';
import { addCommas } from '@/utils/main';
import { boxProducts as RboxProducts, sellBoxProducts as RsellBoxProducts } from '@/services/User';

const BoxSell = ({ selectedUser, setSelectedUser }) => {

    const [products, setProducts] = useState(null);
    const [time, setTime] = useState(new DateObject());
    const [cardPrice, setCardPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { someThingIsWrong } = translations['fa'];

    const sellBoxProducts = async () => {
        try {
            const { data } = await RsellBoxProducts({ user_id: selectedUser._id, time: time.format(), cardPrice, selectedProducts });
            toast.success(data.message);

            setProducts(null);
            setCardPrice(0);
            setSelectedProducts([]);
            setSelectedUser(null);

        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    const CalcardPrice = () => {
        let price = 0;
        selectedProducts.forEach(product => {
            price = Number(price) + (Number(product.price) * Number(product.count));
        });
        setCardPrice(price);
    }

    const boxProducts = async () => {
        try {

            if (!selectedUser) return;
            const { data } = await RboxProducts({ user_id: selectedUser._id });
            setProducts(data);
        } catch (error) {
            if (error?.response?.data?.message) {
                setProducts(null);
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }


    useEffect(() => {
        boxProducts();
        CalcardPrice();
        setTime(new DateObject());
    }, [selectedUser, selectedProducts, selectedProducts.length]);

    return (
        <>
            <div className='bg-primary w-full rounded-md p-3 flex justify-center'><span>انتخاب کالا</span></div>
            <div className='flex flex-col gap-3 h-fit max-h-60 min-h-32 w-full overflow-y-auto'>
                {products && products.length > 0 &&
                    products.map((value) => {
                        const product = value.product_id;
                        return (
                            <div className='bg-primary flex w-full h-fit gap-2 p-3 rounded-md justify-between' onClick={() => {

                                product.count = value.count;
                                product.maxCount = value.count;
                                product.useCPrice = false;

                                if (!selectedProducts.includes(product))
                                    setSelectedProducts([...selectedProducts, product]);
                            }}>
                                <div>{value.count}</div>
                                <div className='flex items-center justify-center gap-2'>
                                    <div>
                                        ریال
                                    </div>
                                    <div>{product.price}</div>
                                </div>
                                <div>{product._id}</div>
                                <div>{product.name}</div>

                            </div>
                        )
                    })
                }
            </div>

            <div className='flex  flex-col grow w-full gap-2 bg-primary p-3 rounded-md h-full overflow-hidden' >
                <div className='flex justify-evenly items-center gap-3 bg-secondary p-3 text-center rounded-md h-fit'>
                    <div className='flex gap-2'>
                        <div className='rtl'>
                            {cardPrice != 0 && addCommas(cardPrice) + " ریال"}
                        </div>
                        <div>
                            : مبلغ کل
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='rtl text-accent'>
                            <DatePicker
                                format="YYYY/MM/DD HH:MM:SS"
                                plugins={[
                                    <TimePicker position="bottom" />
                                ]}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                className="bg-dark yellow"
                                style={{ backgroundColor: "transparent", textAlign: "center", borderWidth: "0" }}
                                value={time}
                                onChange={(value) => { setTime(value); }}
                            />
                        </div>
                        <div className='rtl'>تاریخ :</div>
                    </div>
                </div>
                <div className='flex flex-col grow gap-3 h-full overflow-auto'>
                    {selectedProducts && selectedProducts.length > 0 &&
                        selectedProducts.map((product, index) => {

                            return (
                                <div className='bg-secondary flex w-full h-fit gap-2 p-3 rounded-md justify-between items-center' onClick={() => {
                                }}>
                                    <div>{product.count}</div>

                                    {product.useCPrice ?
                                        <div className='flex gap-2'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <div>
                                                    ریال
                                                </div>
                                                <Input value={product.price} inputCssClass={"text-center"} onChange={(e) => {
                                                    setSelectedProducts(prevContent => {
                                                        const product = [...prevContent];
                                                        product[index].price = Number(e.target.value);
                                                        return product;
                                                    });
                                                }} />
                                            </div>
                                            <button className='bg-primary p-2 rounded-md' onClick={() => {
                                                setSelectedProducts(prevContent => {
                                                    const product = [...prevContent];
                                                    product[index].useCPrice = false;
                                                    return product;
                                                });
                                            }}>قیمت خودکار</button>
                                        </div>
                                        :
                                        <button className='bg-primary p-2 rounded-md' onClick={() => {
                                            setSelectedProducts(prevContent => {
                                                const product = [...prevContent];
                                                product[index].useCPrice = true;
                                                return product;
                                            });
                                        }}>قیمت دستی</button>
                                    }

                                    <div className='flex items-center justify-center gap-2 opacity-50'>
                                        <ProductPrice product_id={product._id} updateParent={(price) => {
                                            if (!product.useCPrice) {
                                                setSelectedProducts(prevContent => {
                                                    const product = [...prevContent];
                                                    product[index].price = price;
                                                    return product;
                                                });
                                            }
                                        }} />
                                    </div>

                                    <div>{product.name}</div>

                                    <div className='flex gap-3'>
                                        <button className='bg-primary p-2 rounded-md text-red-400 h-10 w-10 text-lg' onClick={() => {
                                            setSelectedProducts(prevContent => {
                                                const product = [...prevContent];
                                                if (product[index].count > 1) {
                                                    product[index].count--;
                                                } else {
                                                    product.splice(index, 1);
                                                }
                                                return product;
                                            });
                                        }}>-</button>
                                        <button className='bg-primary p-2 rounded-md text-green-400 h-10 w-10' onClick={() => {
                                            if (product.count < product.maxCount) {
                                                setSelectedProducts(prevContent => {
                                                    const product = [...prevContent];
                                                    product[index].count++;
                                                    return product;
                                                });
                                            }
                                        }}>+</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button className={`bg-red-400 p-3 text-center rounded-sm h-fit opacity-50 ${selectedUser && selectedProducts.length > 0 && "!opacity-100"}`} onClick={() => {
                    sellBoxProducts();
                }}>
                    فروش
                </button>
            </div>
        </>
    );
};

export default BoxSell;