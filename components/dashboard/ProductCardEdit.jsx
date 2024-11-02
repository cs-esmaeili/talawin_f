import Image from 'next/image';
import { LuImage } from "react-icons/lu";
import Input from './Input';
import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '@/services/Product';
import translations from "@/translations.json";
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import CategoryPage from '@/app/dashboard/(main)/category/page';
import ApiBox from '@/app/dashboard/(main)/apibox/page';
import { useModalContext } from '@/components/dashboard/Modal';
import toast from 'react-hot-toast';

const ProductCard = ({ editData, setEditData, updateList }) => {

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [disc, setDisc] = useState("");
    const [box, setBox] = useState(null);
    const [Category, setCategory] = useState(null);
    const [cBuyPrice, setCBuyPrice] = useState(0);
    const [cSellPrice, setCSellPrice] = useState(0);
    const [formulaBuy, setFormulaBuy] = useState('p');
    const [formulaSell, setFormulaSell] = useState('p');
    const [enabledInputBuy, setEnabledInputBuy] = useState("formulaBuy");
    const [enabledInputSell, setEnabledInputSell] = useState("formulaSell");
    const [discount, setDiscount] = useState(0);
    const [status, setStatus] = useState(0);
    const [image, setImage] = useState(null);

    const [inventory, setInventory] = useState(0);
    const [weight, setWeight] = useState("");
    const [ayar, setAyar] = useState(750);
    const [ang, setAng] = useState(0);
    const [ojrat, setOjrat] = useState(0);
    const [labName, setLabName] = useState("");

    const { openModal, closeModal } = useModalContext();
    const { someThingIsWrong, ProductCardEdit } = translations['fa'];


    const ResetForm = () => {
        setBox(null);
        setCategory(null);
        setName("");
        setDisc("");
        setFormulaBuy('p');
        setFormulaSell('p');
        setCBuyPrice(0);
        setCSellPrice(0);
        setDiscount(0);
        setStatus(0);
        setImage(null);
        setId(null);

        setInventory(0);
        setWeight("");
        setAyar(750);
        setAng(0);
        setOjrat(0);
        setLabName("");
    }

    const submitProduct = async () => {
        try {
            let result = null;
            if (id && id != null) {
                result = await updateProduct({ box_id: box._id, id, name, category_id: Category._id, cBuyPrice, cSellPrice, formulaBuy, formulaSell, disc, image, discount, status, inventory, weight, ayar, ang, ojrat, labName });
            } else {
                result = await createProduct({ box_id: box._id, name, category_id: Category._id, cBuyPrice, cSellPrice, formulaBuy, formulaSell, disc, image, discount, status, inventory, weight, ayar, ang, ojrat, labName });
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
            setCategory(editData.category_id)
            setId(editData._id);
            setName(editData.name);
            setDisc(editData.disc);
            setFormulaBuy(editData.formulaBuy);
            setFormulaSell(editData.formulaSell);
            setCBuyPrice(editData.cBuyPrice);
            setCSellPrice(editData.cSellPrice);
            setDiscount(editData.discount);
            setStatus(editData.status);
            setImage(editData.image);
            setInventory(editData.inventory);
            setWeight(editData.weight);
            setAyar(editData.ayar);
            setAng(editData.ang);
            setOjrat(editData.ojrat);
            setLabName(editData.labName);
            if (editData.cBuyPrice != 0) {
                setEnabledInputBuy("cBuyPrice");
            } else {
                setEnabledInputBuy("formulaBuy");
            }
            if (editData.cSellPrice != 0) {
                setEnabledInputSell("cSellPrice");
            } else {
                setEnabledInputSell("formulaSell");
            }
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
            <div className='text-center flex gap-3 rtl mt-3' >

                <label className='flex gap-2'>
                    <input
                        type="radio"
                        name="status"
                        value={0}
                        checked={status === 0}
                        onChange={() => setStatus(0)}
                    />
                    فروش کالا
                </label>

                <label className='flex gap-2'>
                    <input
                        type="radio"
                        name="status"
                        value={1}
                        checked={status === 1}
                        onChange={() => setStatus(1)}
                    />
                    عدم فروش کالا
                </label>

                <label className='flex gap-2'>
                    <input
                        type="radio"
                        name="status"
                        value={2}
                        checked={status === 2}
                        onChange={() => setStatus(2)}
                    />
                    عدم نمایش کالا
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

                    <button className='rtl bg-accent p-3 w-full rounded-lg' onClick={() => {
                        openModal(
                            <CategoryPage pickMode selectListener={(Category) => {
                                setCategory(Category);
                                closeModal();
                            }} />
                        );
                    }}>{Category ? Category.name : "انتخاب دسته بندی"}</button>

                    <div className='flex flex-col border-2 border-accent p-3 gap-3'>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder={ProductCardEdit.formulaBuy}
                                title={ProductCardEdit.formulaBuy}
                                inputCssClass={"text-center ltr"}
                                value={formulaBuy}
                                disabled={enabledInputBuy !== 'formulaBuy'}
                                onChange={(e) => setFormulaBuy(e.target.value)}
                            />
                            <input
                                type="radio"
                                name="input-toggle-buy"
                                checked={enabledInputBuy === 'formulaBuy'}
                                onChange={() => {
                                    setEnabledInputBuy('formulaBuy');
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder={ProductCardEdit.cBuyPrice}
                                title={ProductCardEdit.cBuyPrice}
                                inputCssClass={"text-center ltr"}
                                value={cBuyPrice}
                                disabled={enabledInputBuy !== 'cBuyPrice'}
                                onChange={(e) => setCBuyPrice(e.target.value)}
                            />
                            <input
                                type="radio"
                                name="input-toggle-buy"
                                checked={enabledInputBuy === 'cBuyPrice'}
                                onChange={() => {
                                    setEnabledInputBuy('cBuyPrice');
                                }}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col border-2 border-accent p-3 gap-3'>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder={ProductCardEdit.formulaSell}
                                title={ProductCardEdit.formulaSell}
                                inputCssClass={"text-center ltr"}
                                value={formulaSell}
                                disabled={enabledInputSell !== 'formulaSell'}
                                onChange={(e) => setFormulaSell(e.target.value)}
                            />
                            <input
                                type="radio"
                                name="input-toggle-sell"
                                checked={enabledInputSell === 'formulaSell'}
                                onChange={() => {
                                    setEnabledInputSell('formulaSell');
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder={ProductCardEdit.cSellPrice}
                                title={ProductCardEdit.cSellPrice}
                                inputCssClass={"text-center ltr"}
                                value={cSellPrice}
                                disabled={enabledInputSell !== 'cSellPrice'}
                                onChange={(e) => setCSellPrice(e.target.value)}
                            />
                            <input
                                type="radio"
                                name="input-toggle-sell"
                                checked={enabledInputSell === 'cSellPrice'}
                                onChange={() => {
                                    setEnabledInputSell('cSellPrice');
                                }}
                            />
                        </div>
                    </div>
                    <div className=' w-full'>
                        <Input placeholder={"موجودی"} title={"موجودی"} inputCssClass={"text-center ltr"} value={inventory} onChange={(e) => {
                            setInventory(e.target.value);
                        }} />
                    </div>
                    <div className='text-red-400 w-full'>
                        <Input placeholder={ProductCardEdit.discount} title={ProductCardEdit.discount} inputCssClass={"text-center ltr"} value={discount} onChange={(e) => {
                            setDiscount(e.target.value);
                        }} />
                    </div>

                    <div className=' w-full'>
                        <Input placeholder={"اجرت"} title={"اجرت"} inputCssClass={"text-center ltr"} value={ojrat} onChange={(e) => {
                            setOjrat(e.target.value);
                        }} />
                    </div>
                    <div className=' w-full'>
                        <Input placeholder={"عیار"} title={"عیار"} inputCssClass={"text-center ltr"} value={ayar} onChange={(e) => {
                            setAyar(e.target.value);
                        }} />
                    </div>
                    <div className=' w-full'>
                        <Input placeholder={"وزن (گرم)"} title={"وزن (گرم)"} inputCssClass={"text-center ltr"} value={weight} onChange={(e) => {
                            setWeight(e.target.value);
                        }} />
                    </div>
                    <div className=' w-full'>
                        <Input placeholder={"کد انگ"} title={"کد انگ"} inputCssClass={"text-center ltr"} value={ang} onChange={(e) => {
                            setAng(e.target.value);
                        }} />
                    </div>
                    <div className='w-full'>
                        <Input placeholder={"نام آزمایشگاه"} title={"نام آزمایشگاه"} inputCssClass={"text-center ltr"} value={labName} onChange={(e) => {
                            setLabName(e.target.value);
                        }} />
                    </div>
                </div>

            </div>

            <button className={`bg-green-500 w-full rounded-lg p-2 ${box == null && "opacity-50"}`} onClick={() => {
                if (box != null)
                    submitProduct()
            }}>{editData ? ProductCardEdit.submit : ProductCardEdit.update}</button>

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