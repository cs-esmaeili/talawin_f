import Image from 'next/image';
import ProductPrice from './ProductPrice';
import ProductDiscount from './ProductDiscount';

const ProductCardV2 = ({ product }) => {

    return (
        <div key={product._id} className="w-full sm:w-1/2 p-2">
            <div className="flex flex-col  rounded-lg  rtl bg-secondary">

                <div className='flex'>
                    <div className='text-lg bg-accent w-full h-full  justify-center flex items-center rounded-tr-lg p-3'>
                        نام کالا
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

                    <div className='text-md  w-full h-auto flex  justify-center  items-center  p-3'>
                        <button className=' bg-green-500 rounded-md p-2'>
                            <ProductPrice product_id={product._id} sellPrice={false} />
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