import { addCommas } from '@/utils/main';

const ApiBoxPrices = ({ box }) => {
    return (
        <div className='flex flex-col mb-3  items-center justify-center  w-full rtl gap-1 rounded-lg bg-secondary p-2'>

       

            <div className='flex flex-wrap  items-center justify-center font-bold gap-2'>
                <div className='flex justify-center w-full xl:w-fit'>
                    {box.name + " فروش"}
                </div>
                <div className='flex gap-2'>
                    <span className='text-accent'>
                        {addCommas(box.sellPrice)}
                    </span>
                    <span>ریال</span>
                </div>
            </div>


            <div className='flex flex-wrap  items-center justify-center font-bold gap-2'>
                <div className='flex justify-center w-full xl:w-fit'>
                    {box.name + " خرید"}
                </div>
                <div className='flex gap-2'>
                    <span className='text-accent'>
                        {addCommas(box.buyPrice)}
                    </span>
                    <span>ریال</span>
                </div>
            </div>
            
        </div>
    );
};

export default ApiBoxPrices;