import Image from 'next/image';
import Link from "next/link";

const ImageCard = ({ image, blurHash, title, text, roundMode = false }) => {
    return (
        <Link href={`/post/${title}`}>
            <div className='relative flex flex-col w-full h-full items-center'>
                <div className={`relative w-full h-full ${(roundMode) && "rounded-2xl overflow-hidden"}`}>
                    <Image
                        src={image}
                        alt="Picture of the author"
                        placeholder="blur"
                        fill
                        blurDataURL={blurHash}
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className='flex z-10 flex-col absolute bottom-0 m-5 text-center'>
                    <span>
                        {text}
                    </span>
                </div>
                <div className='absolute  bottom-0 h-2/4 w-full bg-gradient-to-t from-black to-transparent' />
            </div>
        </Link>
    );
};

export default ImageCard;