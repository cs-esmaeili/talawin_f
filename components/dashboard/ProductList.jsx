import ProductCard from './ProductCard';
import ProductCardV2 from './ProductCardV2';
import { useSelector } from 'react-redux';

const ProductList = ({ products }) => {

    const roleName = useSelector((state) => state.information.value.role_id.name);

    return (
        <div className="mx-auto p-4">
            <div className='p-2 justify-end flex text-3xl'>خرید و فروش</div>
            <div className="flex flex-wrap justify-start items-center">
                {products && products.length > 0 && products.map((product) => {
                    if (roleName == "coWorker") {
                        return (<ProductCardV2 product={product}/>)
                    } else {
                        return (<ProductCard product={product} />)
                    }
                })}
            </div>
        </div>
    );
};

export default ProductList;
