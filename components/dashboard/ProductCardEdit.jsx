import Image from 'next/image';
import { LuImage } from "react-icons/lu";
import Input from './Input';
import { useState } from 'react';
import { createProduct } from '@/services/Product';
import translations from "@/translations.json";
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import { useModalContext } from '@/components/dashboard/Modal';
import toast from 'react-hot-toast';

const ProductCard = ({ editData, setEditData, apiMode, setApiMode, apiData }) => {

    const [name, setName] = useState("");
    const [disc, setDisc] = useState("");
    const [apiPath, setApiPath] = useState("");
    const [formula, setFormula] = useState("");
    const [discount, setDiscount] = useState("");
    const [visible, setVisible] = useState(true);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");
    const { openModal, closeModal } = useModalContext();
    const { someThingIsWrong } = translations['fa'];

    const addCommas = (number) => {
        if (number)
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const submitProduct = async () => {
        console.log(name, disc, apiPath, formula, discount);
        try {
            const { data } = await createProduct({ name, disc, image, price, discount, apiPath, formula, visible });
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    return (
        <div className='bg-secondary p-3 rounded-xl items-center justify-between flex flex-col gap-2 hover:bg-opacity-75'>
            <div className='relative max-w-full w-[180px] lg:w-[200px] xl:w-[210px] h-[210px] m-3 flex justify-center items-center' onClick={() => {
                openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                    const { baseUrl, file } = selectedFile;
                    setImage({ url: baseUrl + file.name, blurHash: file.blurHash });
                    closeModal();
                }} />);
            }}>
                {image ?
                    <Image
                        src={image.url}
                        alt="Picture of the author"
                        placeholder="blur"
                        blurDataURL={image.blurHash}
                        fill
                    />
                    :
                    <LuImage className='text-9xl text-accent' />
                }
            </div>
            <div className='text-center rtl' >
                <Input placeholder={"نام کالا"} inputCssClass={"text-center"} value={editData != null ? editData.name : name} onChange={(e) => {
                    if (editData != null) {
                        //.....
                    } else {
                        setName(e.target.value);
                    }
                }} />
            </div>
            <div className='text-center rtl' >
                <Input placeholder={"توضیحات کالا"} inputCssClass={"text-center"} value={editData != null ? editData.disc : disc} onChange={(e) => {
                    if (editData != null) {
                        //.....
                    } else {
                        setDisc(e.target.value);
                    }
                }} />
            </div>
            <div className='text-center' >
                <label className='flex gap-2'>
                    <span>نمایش کالا</span>
                    <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
                </label>
            </div>
            <div className='flex flex-wrap-reverse border-2 border-accent rounded-lg p-2 w-full gap-2'>

                <div className='flex flex-col grow items-center justify-center gap-2'>
                    <div className='text-nowrap rtl w-fit flex justify-center overflow-hidden'>
                        بروز رسانی در
                    </div>
                    <div className='text-nowrap rtl w-fit flex justify-center'>
                        03:00
                    </div>
                </div>

                <div className='grow flex items-center flex-col justify-center gap-2'>
                    <button className="text-center bg-primary p-3 rounded-md w-full" onClick={() => { setApiMode(true); }} >قیمت کالا</button>
                    {apiMode &&
                        <>
                            <Input placeholder={"مسیر api"} inputCssClass={"text-center rtl"} value={editData != null ? editData.apiPath : apiPath} onChange={(e) => {
                                if (editData != null) {
                                    //.....
                                } else {
                                    setApiPath(e.target.value);
                                }
                            }} />
                            <Input placeholder={"فرمول قیمت"} inputCssClass={"text-center ltr"} value={editData != null ? editData.formula : formula} onChange={(e) => {
                                if (editData != null) {
                                    //.....
                                } else {
                                    setFormula(e.target.value);
                                }
                            }} />
                        </>
                    }
                    <div className='text-red-400'>
                        <Input placeholder={"تخفیف"} inputCssClass={"text-center ltr"} value={editData != null ? editData.discount : discount} onChange={(e) => {
                            if (editData != null) {
                                //.....
                            } else {
                                setDiscount(e.target.value);
                            }
                        }} />
                    </div>
                </div>

            </div>
            <button className='bg-green-500 w-full rounded-lg p-2' onClick={() => submitProduct()}>{editData ? "ثبت تغییرات" : "ثبت کالا"}</button>

            {editData != null &&
                <button className='bg-red-500 w-full rounded-lg p-2' onClick={() => {
                    setEditData(null);
                }}>لغو</button>
            }
        </div>
    );
};

export default ProductCard;