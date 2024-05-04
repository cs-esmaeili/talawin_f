import ImageCard from '@/components/site/ImageCard';
import Image from 'next/image';
import { categorys as Rcategorys } from '@/services/Category';

const categorysData = async () => {
    try {
        const { data } = await Rcategorys();
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error);
        }
    }
}

const categoryList = async () => {

    const categorys = await categorysData();

    return (
        <div className='flex flex-col w-full max-w-full items-center gap-3'>
            <div className='relative w-full h-max  rounded-md overflow-hidden'>
                <div className='absolute top-0 -z-10 w-full h-full'>
                    <Image
                        src="/big.png"
                        alt="Picture of the author"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className='mt-[80px] flex flex-col   justify-center items-center mx-2' />
                <div className='absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-primary_s to-transparent' />
            </div>
            <div className='flex flex-col w-screen lg:max-w-[1140px] lg:w-[1130px] max-w-full gap-3 px-2'>

                <div className='flex flex-wrap'>

                    {categorys.map((item, index) => {
                        return (
                            <div className='relative p-1 w-full sm:w-1/2 md:w-1/4 h-[290px]'>
                                <ImageCard image={item.image.url} blurHash={item.image.blurHash} text={item.name} url={`/category/${item.name}/1`} roundMode />
                            </div>
                        );
                    })}

                </div>


            </div>

        </div>
    );
};

export default categoryList;