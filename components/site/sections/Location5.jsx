import Card from '@/components/site/Card';

const Location5 = ({ data, sectionTitle }) => {

    const renderCard = (index) => {
        if (data[index]) {
            const { title, disc, imageH, createdAt, category_id } = data[index];
            return (
                <div className='relative h-[320px]'>
                    <Card key={index} title={title} disc={disc} image={imageH.url} blurHash={imageH.blurHash} date={createdAt} category={category_id.name} />
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className='flex my-3'>
                <div className='border-l-4 border-accent_s pr-1'></div>
                <span className='text-xl'>{sectionTitle}</span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full'>
                {data.map((value, index) => renderCard(index))}
            </div>
        </>
    );
};

export default Location5;