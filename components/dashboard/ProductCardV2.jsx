import ProductPrice from './ProductPrice';
import Input from './Input';
import { addCommas } from '@/utils/main'
import { useState } from 'react';

const ProductCardV2 = ({ product }) => {

    const [weight, setWeight] = useState(product.weight);
    const [buyPrice, setBuyPrice] = useState(product.buyPrice);

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
                        <button className=' bg-green-500 rounded-md p-2'>
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
                    </div>

                    <div className='text-md  w-full h-auto flex  justify-center  items-center  p-3'>
                        <button className='bg-red-500 rounded-md p-2'>
                            <ProductPrice product_id={product._id} sellPrice />
                            <span>فروش</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductCardV2;