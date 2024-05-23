import React from 'react';
import { BsImageFill } from 'react-icons/bs';
import { PiTextAaFill } from 'react-icons/pi';
import { RiCloseFill } from 'react-icons/ri';
import { AiTwotoneVideoCamera } from 'react-icons/ai';
import { useModalContext } from '@/components/dashboard/Modal';
import Filemanager from '@/app/dashboard/(main)/filemanager/page';
import VideoJS from "@/components/dashboard/videoPlayer";
import Image from 'next/image';
import translations from "@/translations.json";

const PostList = ({ content, setContent }) => {

    const { openModal, closeModal } = useModalContext();
    const { postList } = translations['fa'];

    const handleItemClick = (newType, newContent, index) => {
        setContent(prevContent => {
            const temp = [...prevContent];
            temp[index] = {
                type: newType,
                content: newContent
            };
            return temp;
        });
    };

    const renderPanelContent = (row, index) => {
        if (row.type == "Text") {
            return (
                <textarea placeholder={postList.textAreaPlaceHolder} type="text" value={row.content} className='resize-none w-full min-w-0 bg-transparent' onChange={(e) => {
                    handleItemClick("Text", e.target.value, index);
                }} />
            );
        } else if (row.type == "Image") {
            const selectImage = () => {
                openModal(<Filemanager fileType={"image"} fileSelectListener={(selectedFile) => {
                    const { baseUrl, file } = selectedFile;
                    handleItemClick("Image", { url: (baseUrl + file.name), blurHash: file.blurHash, size: file.size }, index);
                    closeModal();
                }} />);
            }
            if (row.content == "") {
                return (
                    <div className='flex grow justify-center items-center w-fit'>
                        <BsImageFill className={`text-green-400 text-8xl`} onClick={() => {
                            selectImage();
                        }} />
                    </div>
                );
            } else {
                return (
                    <div className='flex grow justify-center items-center w-fit'>
                        <Image
                            src={row.content.url}
                            alt="Picture of the author"
                            width={200}
                            height={200}
                            placeholder="blur"
                            blurDataURL={row.content.blurHash}
                            onClick={(e) => {
                                selectImage();
                            }}
                        />
                    </div>
                );
            }
        } else if (row.type == "Video") {
            const selectVideo = () => {
                openModal(<Filemanager fileType={"video"} fileSelectListener={(selectedFile) => {
                    const { baseUrl, file } = selectedFile;
                    handleItemClick("Video", { url: (baseUrl + file.name) }, index);
                    closeModal();
                }} />);
            }
            if (row.content == "") {
                return (
                    <div className='flex grow justify-center items-center w-fit'>
                        <AiTwotoneVideoCamera className={`text-blue-400 text-8xl`} onClick={() => {
                            selectVideo();
                        }} />
                    </div>
                );
            } else {
                return (
                    <div className='h-full bg-red-400 w-full'>
                        <VideoJS
                            options={{
                                autoplay: false,
                                controls: true,
                                responsive: true,
                                fluid: true,
                                sources: [
                                    {
                                        src: row.content.url,
                                        type: "video/mp4",
                                    },
                                ],
                            }}
                        />
                    </div>
                );
            }
        }
    }
    const renderPanels = () => {
        return content.map((row, index) => {
            return (
                <div className="flex gap-2 mb-2" key={index}>
                    <div className="flex flex-col grow bg-secondary rounded-md p-2 basis-0" key={index}>
                        <div className="flex justify-between items-center mb-3 max-h-5 mt-2">
                            <span>{content.type} {postList.placeText}</span>
                            <div className="flex items-center gap-4 ">
                                <PiTextAaFill
                                    className={`text-yellow-400 text-3xl opacity-50 ${row.type == "Text" && "!opacity-100"}`}
                                    onClick={() => handleItemClick("Text", "", index)}
                                />
                                <BsImageFill
                                    className={`text-green-400 text-2xl opacity-50 ${row.type == "Image" && "!opacity-100"}`}
                                    onClick={() => handleItemClick("Image", "", index)}
                                />
                                <AiTwotoneVideoCamera
                                    className={`text-blue-400 text-3xl opacity-50 ${row.type == "Video" && "!opacity-100"}`}
                                    onClick={() => handleItemClick("Video", "", index)}
                                />
                                <RiCloseFill className="text-red-400 text-3xl" onClick={() => {
                                    const temp = [...content];
                                    temp.splice(index, 1);
                                    setContent(temp);
                                }} />
                            </div>
                        </div>
                        <div className="flex bg-primary relative rounded-sm p-1  h-fit min-h-52  grow">
                            {renderPanelContent(row, index)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className='flex flex-col'>
            {renderPanels()}
        </div>
    );
};

export default PostList;