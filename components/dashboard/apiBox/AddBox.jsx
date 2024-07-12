import Input from '@/components/dashboard/Input';
import { useState, useEffect } from 'react';
import { addApiBox } from '@/services/ApiBox';
import toast from 'react-hot-toast';
import translations from "@/translations.json";

const AddBox = ({ updateList }) => {

    const [name, setName] = useState("");
    const [apiPath, setApiPath] = useState("");
    const [cBuyPrice, setCBuyPrice] = useState("");
    const [cSellPrice, setCSellPrice] = useState("");
    const [formulaBuy, setFormulaBuy] = useState("");
    const [formulaSell, setFormulaSell] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [allowCreate, setAllowCreate] = useState(false);

    const { someThingIsWrong } = translations['fa'];

    const createBox = async () => {
        try {
            const { data } = await addApiBox({ name, apiPath, cBuyPrice, cSellPrice, formulaBuy, formulaSell });
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
        setName("");
        setApiPath("");
        setCBuyPrice("");
        setCSellPrice("");
        setFormulaBuy("");
        setFormulaSell("");
        setEditMode(false);
    }

    useEffect(() => {
        if (name != "" && apiPath != "" && cBuyPrice != null && cSellPrice != null && formulaBuy != "" && formulaSell != "") {
            setAllowCreate(true)
        } else {
            setAllowCreate(false);
        }
    }, [name, apiPath, cBuyPrice, cSellPrice, formulaBuy, formulaSell]);
    return (
        <div className='flex flex-col h-fit bg-green-400 bg-opacity-10 p-3 gap-3 rounded-lg justify-center items-center min-w-40'>
            <Input placeholder={"نام"} inputCssClass={"text-center rtl text-accent"} divCssClass={"border-none"} value={name} onChange={(e) => {
                setName(e.target.value);
                setEditMode(true);
            }} />
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
                    <button className='bg-red-500 p-2 rounded-md w-full ' onClick={() => {
                        reset();
                    }}>لغو</button>

                    <button className={`bg-green-500 p-2 rounded-md w-full opacity-50 ${allowCreate && "!opacity-100"}`} onClick={() => {
                        if (allowCreate)
                            createBox();
                    }}>ثبت</button>

                </div>
            }
        </div>
    );
};

export default AddBox;