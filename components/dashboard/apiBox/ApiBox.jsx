import Input from '@/components/dashboard/Input';
import { useState, useEffect } from 'react';
import BoxPrice from '../price/BoxPrice';
import { updateApiBox } from '@/services/ApiBox';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

const ApiBox = ({ box, updateList, selectMode, boxSelectListener }) => {

    const [name, setName] = useState(box.name);
    const [apiPath, setApiPath] = useState(box.apiPath);
    const [cBuyPrice, setCBuyPrice] = useState(box.cBuyPrice);
    const [cSellPrice, setCSellPrice] = useState(box.cSellPrice);
    const [formulaBuy, setFormulaBuy] = useState(box.formulaBuy);
    const [formulaSell, setFormulaSell] = useState(box.formulaSell);
    const [editMode, setEditMode] = useState(false);
    const { someThingIsWrong } = translations['fa'];

    const updateBox = async () => {
        try {
            const { data } = await updateApiBox({ box_id: box._id, name, apiPath, cBuyPrice, cSellPrice, formulaBuy, formulaSell });
            const { message } = data;
            toast.success(message);
            reset();
            updateList();
        } catch (error) {

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }


    const reset = () => {
        setEditMode(false);
        setName(box.name);
        setCBuyPrice(box.cBuyPrice);
        setCSellPrice(box.cSellPrice);
        setFormulaBuy(box.formulaBuy);
        setFormulaSell(box.formulaSell);
        setApiPath(box.apiPath);
    }

    return (
        <div className='flex flex-col h-fit bg-secondary p-3 gap-3 rounded-lg justify-center items-center min-w-40 hover:opacity-75' onClick={() => {
            if (selectMode) {
                boxSelectListener(box);
            }
        }}>
            <Input placeholder={"نام"} inputCssClass={"text-center rtl text-accent"} divCssClass={"border-none"} value={name} onChange={(e) => {
                setName(e.target.value);
                setEditMode(true);
            }} />
            <div className='border-[1px]  w-full' />

            <div className='flex flex-nowrap gap-2'>
                <BoxPrice box_id={box._id} sellPrice={false} />
                <span className='rtl'>خرید : </span>
            </div>
            <div className='flex flex-nowrap gap-2'>
                <BoxPrice box_id={box._id} sellPrice />
                <span className='rtl'>فروش : </span>
            </div>


            <div className='border-[1px]  w-full' />
            <Input placeholder={"مسیر Api"} title={"مسیر Api"} inputCssClass={"text-center ltr"} value={apiPath} onChange={(e) => {
                setApiPath(e.target.value);
                setEditMode(true);
            }} />

            <Input placeholder={"قیمت خرید دستی"} title={"قیمت خرید دستی"} inputCssClass={"text-center ltr"} value={cBuyPrice} onChange={(e) => {
                setCBuyPrice(e.target.value);
                setEditMode(true);
            }} />
            <Input placeholder={"قیمت فروش دستی"} title={"قیمت فروش دستی"} inputCssClass={"text-center ltr"} value={cSellPrice} onChange={(e) => {
                setCSellPrice(e.target.value);
                setEditMode(true);
            }} />

            <Input placeholder={"فرمول خرید"} title={"فرمول خرید"} inputCssClass={"text-center ltr"} value={formulaBuy} onChange={(e) => {
                setFormulaBuy(e.target.value);
                setEditMode(true);
            }} />
            <Input placeholder={"فرمول فروش"} title={"فرمول فروش"} inputCssClass={"text-center ltr"} value={formulaSell} onChange={(e) => {
                setFormulaSell(e.target.value);
                setEditMode(true);
            }} />

            {editMode &&
                <div className='flex  w-full gap-2'>
                    <button className='bg-red-500 p-2 rounded-md w-full opacity-75' onClick={() => {
                        reset();
                    }}>لغو</button>
                    <button className='bg-green-500 p-2 rounded-md w-full' onClick={() => {
                        updateBox();
                    }}>بروز رسانی</button>
                </div>
            }
        </div>
    );
};

export default ApiBox;