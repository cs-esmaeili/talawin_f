import { PiArrowFatDownFill } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { getObjectByKey, addCommas } from '@/utils/main';
import { useEffect, useState } from "react";

const Prices = () => {

    const apiData = useSelector((state) => state.apiData.value);
    const [loading, setLoading] = useState(true);

    const printPrice = (value) => {

        if (apiData == null) {
            return;
        }
        const data = getObjectByKey(apiData, 'key', value);
        if (data == null) {
            return;
        }
        return addCommas(data.price);
    }

    useEffect(() => {
        setLoading(true);
        if (apiData != null) {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [apiData]);

    const loadingComponent = <div className="relative  w-4 h-4">
        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
    </div>;

    return (
        <>
            <div className="flex text-green-400 gap-2 items-center">
                {loading ? loadingComponent :
                    <>
                        <span>ریال</span>
                        <span className="text-md">{printPrice(137120)}</span>
                    </>
                }
                <PiArrowFatDownFill className="text-2xl" />
            </div>
            <div className="flex  text-red-400  gap-2 items-center">
                {loading ? loadingComponent :
                    <>
                        <span>ریال</span>
                        <span className="text-md">{printPrice(137120)}</span>
                    </>
                }
                <PiArrowFatUpFill className="text-2xl" />
            </div>
        </>
    );
};

export default Prices;

