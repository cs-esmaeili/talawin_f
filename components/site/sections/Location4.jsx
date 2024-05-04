import Card from '@/components/site/Card';
import ImageCard from '@/components/site/ImageCard';

const Location4 = ({ data }) => {

    const renderCard = (index) => {
        if (data[index]) {
            const { title, disc, imageH, createdAt, category_id } = data[index];
            return (
                <div className="grow w-full sm:w-1/3 md:w-1/5 relative h-[320px]" key={index}>
                    <Card title={title} disc={disc} image={imageH.url} blurHash={imageH.blurHash} date={createdAt} category={category_id.name} />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex-col">
            <div className="flex gap-3 mb-3 flex-wrap md:flex-nowrap">
                {data.slice(0, 2).map((item, index) => (
                    <div className="relative w-full md:w-1/2 h-[264px] pl-0" key={index}>
                        <ImageCard title={item.title} image={item.imageH.url} blurHash={item.imageH.blurHash} />
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap justify-between gap-3">
                {[2, 3, 4, 5].map((index) => renderCard(index))}
            </div>
        </div>
    );
};

export default Location4;
