import { useSelector } from 'react-redux';
import { getObjectByKey, addCommas } from '@/utils/main';
import { useEffect, useState } from "react";

const ProductPrice = ({ product_id, updateParent = null, apiData, productPrices }) => {



    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(null);

    const loadingComponent = (
        <div className="relative w-4 h-4">
            <div className="w-full h-full rounded-full absolute border-4 border-solid border-gray-200"></div>
            <div className="w-full h-full rounded-full absolute animate-spin border-4 border-solid border-accent border-t-transparent shadow-md"></div>
        </div>
    );


    const makePrice = () => {

        if (!loading) setLoading(true);

        if (productPrices == null) {
            return;
        }
        const data = getObjectByKey(productPrices, '_id', product_id);

        if (data == null || data.price == null || data.price == undefined) {
            return;
        }

        setTimeout(() => {
            setPrice(addCommas(data.price));
            setLoading(false);
            if (updateParent != null)
                updateParent(data.price);
        }, 500);

    }
    useEffect(() => {
        makePrice();
    }, [productPrices]);

    return (
        <div className='rtl'>
            {loading ? loadingComponent : `${price} ریال`}
        </div>
    );
};

export default ProductPrice;
