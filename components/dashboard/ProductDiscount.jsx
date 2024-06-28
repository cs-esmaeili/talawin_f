import { useSelector } from 'react-redux';
import { getObjectByKey, addCommas } from '@/utils/main';
import { useEffect, useState } from "react";

const ProductDiscount = ({ product_id, updateParent = null }) => {


    const productPrices = useSelector((state) => state.productPrices.value);

    const [loading, setLoading] = useState(true);
    const [discount, setDiscount] = useState(null);

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
        
        if (data == null || data.discount == null || data.discount == undefined) {
            return;
        }

        setTimeout(() => {
            setDiscount(addCommas(data.discount));
            setLoading(false);
            if (updateParent != null)
                updateParent(data.discount);
        }, 500);

    }
    useEffect(() => {
        makePrice();
    }, [productPrices]);

    return (
        <div className='rtl'>
            {loading ? loadingComponent : `${discount} ریال`}
        </div>
    );
};

export default ProductDiscount;
