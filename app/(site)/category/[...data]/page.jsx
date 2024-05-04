import Pagination from '@/components/site/Pagination';
import Card from '@/components/site/Card';
import Image from 'next/image';
import { getCategoryData as RgetCategoryData } from '@/services/Category';
import { redirect, notFound } from 'next/navigation'

const perPage = 8;

const categorysData = async (params) => {
    try {
        const { data } = await RgetCategoryData({ name: params[0], page: params[1], perPage });
        return data;

    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error);
        }
    }
}

const Category = async ({ params }) => {

    let pageParams = params.data;

    if (pageParams[1] == null || pageParams[1] < 1) {
        notFound();
    }

    let categoryName = pageParams[0];
    let pageNumber = pageParams[1];

    const { category, postsCount, posts } = await categorysData(pageParams);

    const totalPages = Math.ceil(postsCount / perPage);
    if (pageParams[1] > totalPages) {
        notFound();
    }

    return (
        <div className='flex flex-col w-full max-w-full items-center gap-3'>
            <div className='relative w-full h-max  rounded-md overflow-hidden'>
                <div className='absolute top-0 -z-10 w-full h-full'>
                    <Image
                        src={category.image.url}
                        alt="Picture of the author"
                        placeholder="blur"
                        fill
                        blurDataURL={category.image.blurHash}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className='mt-[80px] mb-[80px] flex  justify-center mx-2'>
                    <div className='flex flex-wrap gap-2 justify-center grow lg:max-w-[1140px]'>
                        <div className='flex  items-center'>
                            <div className='flex flex-col bg-secondary bg-opacity-50 rounded-md p-5 gap-3'>
                                <span className='text-4xl'>{categoryName}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-primary_s to-transparent' />
            </div>
            <div className='flex flex-col lg:max-w-[1140px] w-full max-w-full gap-3 px-2'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5  p-2">
                    {posts && posts.map((value, index) => {
                        const { title, disc, createdAt, imageH } = value;
                        const { url, blurHash } = imageH;
                        return (
                            <div className='h-[300px] relative' key={index}>
                                <Card title={title} date={createdAt} disc={disc} category={category.name} image={url} blurHash={blurHash} />
                            </div>
                        )
                    })}
                </div>
                <Pagination activePage={pageNumber} count={postsCount} perPage={perPage} />
            </div>
        </div>
    );
};

export default Category;