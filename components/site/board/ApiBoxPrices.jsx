import { addCommas } from '@/utils/main';

const ApiBoxPrices = ({ box }) => {
    return (
        <div className='flex flex-col mb-3  w-ful rtl gap-3 rounded-lg bg-secondary p-3'>

            <div className='flex justify-between'>
                <div>
                    {box.name + " خرید"}
                </div>
                <div>
                    {addCommas(box.buyPrice)}
                </div>
            </div>
            <div className='flex justify-between'>
                <div>
                    {box.name + " فروش"}
                </div>
                <div>
                    {addCommas(box.sellPrice)}
                </div>
            </div>

        </div>
    );
};

export default ApiBoxPrices;