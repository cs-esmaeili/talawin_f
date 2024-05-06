import Image from 'next/image';

const ProductCard = () => {


    return (
        <div className='bg-secondary p-3 rounded-xl items-center justify-between flex flex-col gap-2 hover:bg-opacity-75'>
            <div className='relative max-w-full w-[180px] lg:w-[200px] xl:w-[210px] h-[210px] m-3 '>
                <Image
                    src={"/coin.png"}
                    alt="Picture of the author"
                    // placeholder="blur"
                    fill
                    // blurDataURL={blurHash}
                />
            </div>
            <div className='text-center'>
                طلا
            </div>
            <div className='text-center'>
                18 عیار
            </div>
            <div className='flex flex-wrap-reverse border-2 border-accent rounded-lg p-2 w-full'>

                <div className='flex flex-col grow items-center justify-center gap-2'>

                    <div className='text-nowrap rtl w-fit flex justify-center overflow-hidden'>
                        بروز رسانی در
                    </div>
                    <div className='text-nowrap rtl w-fit flex justify-center'>
                        03:00
                    </div>
                    
                </div>

                <div className='grow flex items-center flex-col justify-center'>
                    <div>10000000</div>
                    <div className='line-through text-red-400'>400</div>
                </div>

            </div>

            <button className='bg-accent w-full rounded-lg p-2'>خرید</button>
        </div>
    );
};

export default ProductCard;