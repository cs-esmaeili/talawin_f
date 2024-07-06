import Image from 'next/image'; 
import ProductDiscount from './ProductDiscount';
import ProductPrice from './ProductPrice';

const ProductPage = ({ products, apiData, productPrices }) => {
    return (
        <div className="container mx-auto p-2 h-full">
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="flex h-full flex-col bg-secondary items-center justify-center p-4 rounded-lg shadow-lg">
                        <div className="relative w-full flex grow mb-4">
                            <Image
                                src={product.image.url}
                                alt={product.name}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                placeholder='blur'
                                blurDataURL={product.image.blurHash}
                            />
                        </div>
                        <h2 className="text-xl mb-2">{product.name}</h2>
                        <h2 className="text-xl mb-2">{product.disc}</h2>
                        <div className='flex flex-col grow justify-center items-center h-16 my-3'>
                            {product.discount !== 0 && (
                                <h3 className="text-lg mb-2 rtl line-through text-red-500">
                                    <ProductDiscount product_id={product._id} apiData={apiData} productPrices={productPrices} />
                                </h3>
                            )}
                            <h3 className={`text-lg mb-2 rtl ${product.discount !== 0 && "text-green-500"}`}>
                                <ProductPrice product_id={product._id} apiData={apiData} productPrices={productPrices} />
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
