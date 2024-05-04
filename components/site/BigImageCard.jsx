import Image from 'next/image';
import Link from "next/link";

const ImageCard = ({ image, blurHash, text }) => {
    return (
        <Link href={`/post/${text}`}>
            <div className='relative flex flex-col w-[287px] h-[367px] items-center'>
                <div className='relative w-full h-full  rounded-2xl overflow-hidden'>
                    <Image
                        src={image}
                        alt="Picture of the author"
                        placeholder="blur"
                        fill
                        blurDataURL={blurHash}
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className='flex z-10 flex-col absolute bottom-0 m-10 text-center'>
                    <span>{text}</span>
                </div>
                <div className='absolute  bottom-0 h-2/4 w-full bg-gradient-to-t from-black to-transparent' />
            </div>
        </Link>
    );
};

export default ImageCard;