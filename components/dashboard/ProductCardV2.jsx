import ProductPrice from './ProductPrice';
import Input from './Input';
import { addCommas } from '@/utils/main'
import { useState } from 'react';
import { executeTrade } from '@/services/CoWorker';
import toast from 'react-hot-toast';

const ProductCardV2 = ({ product }) => {

    const [weight, setWeight] = useState(product.weight);
    const [buyPrice, setBuyPrice] = useState(product.buyPrice);
    const [sellPrice, setSellPrice] = useState(product.sellPrice);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [loadingSell, setLoadingSell] = useState(false);

    const submitExecuteTrade = async (purchase) => {
        try {
            if (purchase) {
                setLoadingBuy(true);
            } else {
                setLoadingSell(true);
            }
            let result = await executeTrade({
                price: (purchase) ? (buyPrice * (weight == 0 ? 1 : weight)) : (sellPrice * (weight == 0 ? 1 : weight)),
                purchase, product_id: product._id,
                product_price: (purchase) ? buyPrice : sellPrice,
                weight
            });
            setLoadingBuy(false);
            setLoadingSell(false);
            const { data } = result;
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            setLoadingBuy(false);
            setLoadingSell(false);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }
    return (
        <div key={product._id} className="w-full sm:w-1/2 p-2">
            <div className="flex flex-col  rounded-lg  rtl bg-secondary">

                <div className='flex'>
                    <div className='text-lg bg-accent w-full h-full  justify-center flex items-center rounded-tr-lg p-3'>
                        نام کالا
                    </div>
                    <div className={`text-lg bg-accent w-full h-full justify-center flex items-center  p-3 ${(product.weight == null || product.weight <= 0) && "text-transparent"}`}>
                        وزن
                    </div>
                    <div className='text-lg bg-accent w-full h-full justify-center flex items-center  p-3'>
                        خرید
                    </div>
                    <div className='text-lg bg-accent w-full h-full justify-center flex items-center rounded-tl-lg p-3'>
                        فروش
                    </div>
                </div>

                <div className='flex'>

                    <div className='text-md  w-full h-auto flex  justify-center  items-center  p-3'>
                        {product.name}
                    </div>
                    <div className={`w-full h-auto flex justify-center items-center p-3 ${product.weight == null || product.weight <= 0 ? "invisible" : ""}`}>
                        <Input
                            type="number"
                            min="1"
                            placeholder={"وزن (گرم)"}
                            inputCssClass={"flex justify-center text-center ltr w-[50px] disabled"}
                            value={weight}
                            onChange={(e) => {
                                if (e.target.value > 0) setWeight(e.target.value);
                            }}
                        />
                    </div>

                    <div className='text-md  w-full h-auto flex  justify-center  items-center  p-3'>
                        {(loadingBuy) ?
                            <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
                                <div className="w-10 h-10 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
                            </div>
                            :
                            <button className=' bg-green-500 rounded-md p-2' onClick={() => {
                                submitExecuteTrade(true);
                            }}>
                                <ProductPrice product_id={product._id} sellPrice={false}
                                    hidden={(product.weight && product.weight > 0)}
                                    priceListener={(product.weight && product.weight > 0) ? (price) => {
                                        setBuyPrice(price);
                                    } : null}
                                />
                                {(product.weight != null && product.weight > 0) &&
                                    <div className='flex gap-1'>
                                        {addCommas(buyPrice * weight)}
                                        <span>ریال</span>
                                    </div>
                                }
                                <span>خرید</span>
                            </button>
                        }
                    </div>


                    <div className='text-md  w-full h-auto flex  justify-center  items-center  p-3'>
                        {(loadingSell) ?
                            <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
                                <div className="w-10 h-10 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
                            </div>
                            :
                            <button className=' bg-red-500 rounded-md p-2' onClick={() => {
                                submitExecuteTrade(false);
                            }}>
                                <ProductPrice product_id={product._id} sellPrice
                                    hidden={(product.weight && product.weight > 0)}
                                    priceListener={(product.weight && product.weight > 0) ? (price) => {
                                        setSellPrice(price);
                                    } : null}
                                />
                                {(product.weight != null && product.weight > 0) &&
                                    <div className='flex gap-1'>
                                        {addCommas(sellPrice * weight)}
                                        <span>ریال</span>
                                    </div>
                                }
                                <span>فروش</span>
                            </button>
                        }
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ProductCardV2;