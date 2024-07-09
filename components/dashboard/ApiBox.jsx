import Input from '@/components/dashboard/Input';
import { useState, useEffect } from 'react';

const ApiBox = ({ box }) => {

    const [name, setName] = useState(box.name);
    const [price, setPrice] = useState(box.price);
    const [apiPath, setApiPath] = useState(box.apiPath);
    const [formula, setFormula] = useState(box.formula);

    const [editMode, setEditMode] = useState(false);

    const reset = () => {
        setEditMode(false);
        setName(box.name);
        setPrice(box.price);
        setApiPath(box.apiPath);
        setFormula(box.formula);
    }

    return (
        <div className='flex flex-col h-fit bg-secondary p-3 gap-3 rounded-lg justify-center items-center min-w-40'>
            <Input placeholder={"نام"} inputCssClass={"text-center rtl text-accent"} divCssClass={"border-none"} value={name} onChange={(e) => {
                setName(e.target.value);
                setEditMode(true);
            }} />
            <div className='border-[1px]  w-full' />

            <Input placeholder={"قیمت"} inputCssClass={"text-center ltr"} value={price} onChange={(e) => {
                setPrice(e.target.value);
                setEditMode(true);
            }} />
            <Input placeholder={"مسیر Api"} inputCssClass={"text-center ltr"} value={apiPath} onChange={(e) => {
                setApiPath(e.target.value);
                setEditMode(true);
            }} />
            <Input placeholder={"فرمول"} inputCssClass={"text-center ltr"} value={formula} onChange={(e) => {
                setFormula(e.target.value);
                setEditMode(true);
            }} />
            {editMode &&
                <div className='flex  w-full gap-2'>
                    <button className='bg-red-500 p-2 rounded-md w-full opacity-75' onClick={() => {
                        reset();
                    }}>لغو</button>
                    <button className='bg-green-500 p-2 rounded-md w-full'>ثبت</button>
                </div>
            }
        </div>
    );
};

export default ApiBox;