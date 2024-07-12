import { useSelector } from 'react-redux';
import { getObjectByKey, addCommas } from '@/utils/main';
import { useEffect, useState } from "react";

const BoxPrice = ({ box_id , updateParent = null, sellPrice = true }) => {


    const boxPrices = useSelector((state) => state.boxPrices.value);

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

        if (boxPrices == null) {
            return;
        }
        let data = getObjectByKey(boxPrices, '_id', box_id);

        if (data == null || data == undefined) {
            return;
        }

        let targetPrice = null
        if (sellPrice) {
            targetPrice = data.sellPrice;
        } else {
            targetPrice = data.buyPrice;
        }

        if (targetPrice == null || targetPrice == undefined) {
            return;
        }

        setTimeout(() => {
            setPrice(addCommas(targetPrice));
            setLoading(false);
            if (updateParent != null)
                updateParent(targetPrice);
        }, 500);

    }
    useEffect(() => {
        makePrice();
    }, [boxPrices]);

    return (
        <div className='rtl'>
            {loading ? loadingComponent : `${price} ریال`}
        </div>
    );
};

export default BoxPrice;
