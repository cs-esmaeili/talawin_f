import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineDateRange } from 'react-icons/md';
import Date from './Date';

const Card = ({ image, blurHash, title, disc, category, date, roundMode = false }) => {
    return (
        <Link href={`/post/${title}`}>
            <div className="relative flex flex-col w-full h-full gap-2 hover:border-2 hover:border-accent_s">
                <div className={`relative w-full h-full ${roundMode ? 'rounded-2xl overflow-hidden' : ''}`}>
                    <Image
                        src={image}
                        alt="Picture of the author"
                        placeholder="blur"
                        fill
                        blurDataURL={blurHash}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="justify-center">
                    <div className="flex flex-wrap-reverse justify-start max-w-full mb-2">
                        <div className='flex bg-gray-700  rounded-xl px-2 py-1 bg-opacity-50'>
                            {category}
                        </div>
                        <div className="m-auto">
                        </div>
                        <div className="flex items-center opacity-75 ">
                            <Date date={date} />
                            <MdOutlineDateRange className="text-2xl pl-1" />
                        </div>
                    </div>
                    <div className='ml-1'>
                        <div className="text-pretty">{title}</div>
                        <div className="opacity-50">{disc}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
