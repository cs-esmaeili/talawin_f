import Image from 'next/image';
import { LuImage } from "react-icons/lu";
import Input from './Input';
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '@/services/Product';
import translations from "@/translations.json";
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import { useModalContext } from '@/components/dashboard/Modal';
import toast from 'react-hot-toast';

const ProductCard = ({ editData, setEditData, apiMode, setApiMode, apiData, updateList }) => {

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [disc, setDisc] = useState("");
    const [apiPath, setApiPath] = useState("");
    const [formula, setFormula] = useState("");
    const [discount, setDiscount] = useState(0);
    const [visible, setVisible] = useState(true);
    const [image, setImage] = useState(null);
    const { openModal, closeModal } = useModalContext();

    const { someThingIsWrong, ProductCardEdit } = translations['fa'];


    const ResetForm = () => {
        setName("");
        setDisc("");
        setApiPath("");
        setFormula("");
        setDiscount(0);
        setVisible(true);
        setImage(null);
        setId(null);
    }

    const submitProduct = async () => {
        try {
            let result = null;
            if (id) {
                console.log("test");
                result = await updateProduct({ id, name, disc, image, discount, apiPath, formula, visible });
            } else {
                result = await createProduct({ name, disc, image, discount, apiPath, formula, visible });
            }
            const { data } = result;
            toast.success(data.message);
            ResetForm();
            setApiMode(false);
            updateList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }
    useEffect(() => {
        if (editData != null) {
            setId(editData._id);
            setName(editData.name);
            setDisc(editData.disc);
            setApiPath(editData.apiPath);
            setFormula(editData.formula);
            setDiscount(editData.discount);
            setVisible(editData.visible);
            setImage(editData.image);
        }
    }, [editData]);

    return (
        <div className='bg-secondary p-3 rounded-xl items-center justify-between flex flex-col gap-2 hover:bg-opacity-75 w-full'>
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
                <Input placeholder={ProductCardEdit.name} inputCssClass={"text-center"} value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
            </div>
            <div className='text-center rtl' >
                <Input placeholder={ProductCardEdit.disc} inputCssClass={"text-center"} value={disc} onChange={(e) => {
                    setDisc(e.target.value);
                }} />
            </div>
            <div className='text-center' >
                <label className='flex gap-2'>
                    <span>{ProductCardEdit.showProduct}</span>
                    <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
                </label>
            </div>
            <div className='flex flex-wrap-reverse border-2 border-accent rounded-lg p-2 w-full gap-2'>

                <div className='grow flex items-center flex-col justify-center gap-2'>
                    <button className="text-center bg-primary p-3 rounded-md w-full" onClick={() => { setApiMode(true); }} >{ProductCardEdit.productPrice}</button>
                    {apiMode &&
                        <>
                            <Input placeholder={ProductCardEdit.apiPath} inputCssClass={"text-center ltr"} value={apiPath} onChange={(e) => {
                                setApiPath(e.target.value);
                            }} />
                            <Input placeholder={ProductCardEdit.apiFormula} inputCssClass={"text-center ltr"} value={formula} onChange={(e) => {
                                setFormula(e.target.value);
                            }} />
                        </>
                    }
                    <div className='text-red-400'>
                        <Input placeholder={ProductCardEdit.discount} inputCssClass={"text-center ltr"} value={discount} onChange={(e) => {
                            setDiscount(e.target.value);
                        }} />
                    </div>
                </div>

            </div>

            <button className='bg-green-500 w-full rounded-lg p-2' onClick={() => submitProduct()}>{editData ? ProductCardEdit.submit : ProductCardEdit.update}</button>
            {editData != null ?
                <button className='bg-red-500 w-full rounded-lg p-2' onClick={() => {
                    setEditData(null);
                    ResetForm();
                    setApiMode(false);
                }}>لغو</button>
                :
                <button className='bg-red-500 w-full rounded-lg p-2' onClick={() => {
                    ResetForm();
                    setApiMode(false);
                }}>{"پاک کردن"}</button>
            }
        </div>
    );
};

export default ProductCard;