
import Image from 'next/image';
import { MdOutlineDateRange } from "react-icons/md";
import { getPost as RgetPost } from '@/services/Post';
import VideoJS from "@/components/dashboard/videoPlayer";

const getPost = async (postTitle) => {
    try {
        postTitle = postTitle.replace(/%20/g, " ");
        const { data } = await RgetPost({ title: postTitle });
        return data;
    } catch (error) {
        console.log(error);
    }
}

const Post = async ({ params }) => {

    const postTitle = params.title;
    const { imageH, title, disc, metaTags, category_id, body, views, auther, createdAt } = await getPost(postTitle);

    return (
        <div className='flex flex-col w-full max-w-full items-center gap-3'>
            <div className='relative w-full h-max  rounded-md overflow-hidden'>
                <div className='absolute top-0 -z-10 w-full h-full'>
                    <Image
                        src={imageH.url}
                        alt="Picture of the author"
                        placeholder="blur"
                        fill
                        blurDataURL={imageH.blurHash}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className='mt-[80px] mb-[80px] flex flex-col   justify-center items-center mx-2'>
                    <div className='flex flex-wrap gap-2 justify-center grow lg:max-w-[1140px]'>
                        <div className='flex  items-center'>
                            <div className='flex flex-col bg-secondary bg-opacity-50 rounded-md p-5 gap-3'>
                                <span className='text-4xl'>{title}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-center lg:max-w-[1140px] max-w-full gap-3 px-2 w-full sm:justify-between mt-[30px] items-center'>
                        <div className='bg-gray-700 rounded-xl px-2 py-1 bg-opacity-50'>
                            {category_id.name}
                        </div>
                        <div className='flex bg-gray-700 rounded-xl px-2 py-1 bg-opacity-50'>
                            <div>{createdAt}</div>
                            <MdOutlineDateRange className='text-2xl' />
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-primary_s to-transparent' />
            </div>
            <div className='flex  flex-col lg:max-w-[1140px] lg:min-w-[1140px] min-w-full max-w-full gap-3 px-2'>
                {body && body.map((value, index) => {
                    if (value.type == "Text") {
                        return (
                            <div key={index}>{value.content}</div>
                        )
                    } else if (value.type == "Image") {
                        return (
                            <div className='relative w-full h-[200px]' key={index}>
                                <Image
                                    src={value.content.url}
                                    alt="Picture of the author"
                                    placeholder="blur"
                                    fill
                                    blurDataURL={value.content.blurHash}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )
                    } else if (value.type == "Video") {
                        return (
                            <div className='h-fit bg-red-400 w-full' key={index}>
                                <VideoJS
                                    options={{
                                        autoplay: false,
                                        controls: true,
                                        responsive: true,
                                        fluid: true,
                                        sources: [
                                            {
                                                src: value.content.url,
                                                type: "video/mp4",
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default Post;