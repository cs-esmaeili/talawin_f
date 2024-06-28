import Image from 'next/image';
import ProductPrice from './ProductPrice';
import ProductDiscount from './ProductDiscount';


const ProductList = ({ products }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-start items-center">
                {products && products.length > 0 && products.map((product) => (
                    <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <div className="flex flex-col   bg-secondary items-center justify-center p-4 rounded-lg shadow-lg">
                            <div className="relative max-w-full h-auto mb-4">
                                <Image
                                    src={product.image.url}
                                    alt={product.name}
                                    width={250}
                                    height={450}
                                    objectFit="cover"
                                    className="object-cover"
                                    placeholder='blur'
                                    blurDataURL={product.image.blurHash}
                                />
                            </div>
                            <h2 className="text-xl  mb-2">{product.name}</h2>
                            <h2 className="text-xl  mb-2">{product.disc}</h2>
                            <div className='flex flex-col grow justify-center items-center h-16 my-3'>
                                {product.discount != 0 &&
                                    <h3 className="text-lg  mb-2 rtl line-through text-red-500 ">
                                        <ProductDiscount product_id={product._id} />
                                    </h3>
                                }
                                <h3 className={`text-lg  mb-2 rtl ${product.discount != 0 && "text-green-500"}`}>
                                    <ProductPrice product_id={product._id} />
                                </h3>
                            </div>
                            <button className="bg-accent w-full rounded-md p-3 opacity-50 cursor-not-allowed" disabled>افزودن به سبد خرید</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
