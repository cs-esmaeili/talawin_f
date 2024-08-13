import Image from 'next/image';
import { LuImage } from "react-icons/lu";
import Input from './Input';
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '@/services/Product';
import translations from "@/translations.json";
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import ApiBox from '@/app/dashboard/(main)/apibox/page';
import { useModalContext } from '@/components/dashboard/Modal';
import toast from 'react-hot-toast';

const ProductCard = ({ editData, setEditData, updateList }) => {

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [disc, setDisc] = useState("");

    const [box, setBox] = useState(null);

    const [cBuyPrice, setCBuyPrice] = useState(0);
    const [cSellPrice, setCSellPrice] = useState(0);
    const [formulaBuy, setFormulaBuy] = useState('p');
    const [formulaSell, setFormulaSell] = useState('p');

    const [discount, setDiscount] = useState(0);
    const [visible, setVisible] = useState(true);
    const [image, setImage] = useState(null);
    const { openModal, closeModal } = useModalContext();

    const { someThingIsWrong, ProductCardEdit } = translations['fa'];


    const ResetForm = () => {
        setBox(null);
        setName("");
        setDisc("");
        setFormulaBuy('p');
        setFormulaSell('p');
        setCBuyPrice(0);
        setCSellPrice(0);
        setDiscount(0);
        setVisible(true);
        setImage(null);
        setId(null);
    }

    const submitProduct = async () => {
        try {
            let result = null;
            if (id && id != null) {
                result = await updateProduct({ box_id: box._id, id, name, cBuyPrice, cSellPrice, formulaBuy, formulaSell, disc, image, discount, visible });
            } else {
                result = await createProduct({ box_id: box._id, name, cBuyPrice, cSellPrice, formulaBuy, formulaSell, disc, image, discount, visible });
            }
            const { data } = result;
            toast.success(data.message);
            ResetForm();
            updateList();
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
        if (editData != null) {
            setBox(editData.apiBox_id)
            setId(editData._id);
            setName(editData.name);
            setDisc(editData.disc);
            setFormulaBuy(editData.formulaBuy);
            setFormulaSell(editData.formulaSell);
            setCBuyPrice(editData.cBuyPrice);
            setCSellPrice(editData.cSellPrice);
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
            <div className='flex flex-wrap-reverse  rounded-lg p-2 w-full gap-2'>

                <div className='grow flex items-center flex-col justify-center gap-2'>
                    <button className='rtl bg-accent p-3 w-full rounded-lg' onClick={() => {
                        openModal(
                            <ApiBox selectMode boxSelectListener={(box) => {
                                setBox(box);
                                closeModal();
                            }} />
                        );
                    }}>{box ? box.name : "انتخاب api"}</button>

                    <Input placeholder={ProductCardEdit.formulaBuy} title={ProductCardEdit.formulaBuy} inputCssClass={"text-center ltr"} value={formulaBuy} onChange={(e) => {
                        setFormulaBuy(e.target.value);
                    }} />

                    <Input placeholder={ProductCardEdit.formulaSell} title={ProductCardEdit.formulaSell} inputCssClass={"text-center ltr"} value={formulaSell} onChange={(e) => {
                        setFormulaSell(e.target.value);
                    }} />

                    <Input placeholder={ProductCardEdit.cBuyPrice} title={ProductCardEdit.cBuyPrice} inputCssClass={"text-center ltr"} value={cBuyPrice} onChange={(e) => {
                        setCBuyPrice(e.target.value);
                    }} />

                    <Input placeholder={ProductCardEdit.cSellPrice} title={ProductCardEdit.cSellPrice} inputCssClass={"text-center ltr"} value={cSellPrice} onChange={(e) => {
                        setCSellPrice(e.target.value);
                    }} />

                    <div className='text-red-400 w-full'>
                        <Input placeholder={ProductCardEdit.discount} title={ProductCardEdit.discount} inputCssClass={"text-center ltr"} value={discount} onChange={(e) => {
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
                }}>لغو</button>
                :
                <button className='bg-red-500 w-full rounded-lg p-2' onClick={() => {
                    ResetForm();
                }}>{"پاک کردن"}</button>
            }
        </div>
    );
};

export default ProductCard;