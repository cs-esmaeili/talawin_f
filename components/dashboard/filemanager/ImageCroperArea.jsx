import { LuRectangleVertical, LuRectangleHorizontal } from "react-icons/lu";
import { useRef, useState, useEffect } from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const ImageCroperArea = ({ file, imageCroperListener }) => {

    const [aspectRatio, setAspectRatio] = useState(1.5);
    const [minDimenstion, setMinDimenstion] = useState(150);

    const [activeSize, setActiveSize] = useState(0);

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");


    const onSelectFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < minDimenstion || naturalHeight < minDimenstion) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };


    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (minDimenstion / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            aspectRatio,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    useEffect(() => {
        onSelectFile(file);
    }, [file]);

    useEffect(() => {
        setCrop(null);
        setImgSrc("");
        if (activeSize == 0) {
            setAspectRatio(0.5);
        } else {
            setAspectRatio(1.5);
        }
        onSelectFile(file);
    }, [activeSize]);

    return (
        <div className='flex gap-2'>
            <div className='flex  p-3 border-2 border-secondary justify-center items-center'>
                {imgSrc && (
                    <div className="flex flex-col items-center">
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                            // circularCrop
                            keepSelection
                            aspect={aspectRatio}
                            minWidth={minDimenstion}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                alt="Upload"
                                style={{ maxHeight: "70vh" }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>
                )}
                {crop && (
                    <canvas
                        ref={previewCanvasRef}
                        className="mt-4"
                        style={{
                            display: "none",
                            border: "1px solid black",
                            objectFit: "contain",
                            width: 150,
                            height: 150,
                        }}
                    />
                )}
            </div>
            <div className='flex flex-col bg-secondary p-3 rounded-md justify-between min-w-fit'>
                <div className="flex flex-col gap-3 ">
                    <div className={`flex items-center bg-primary p-2 rounded-sm justify-center ${activeSize == 0 && "!bg-accent"}`} onClick={() => {
                        setActiveSize(0);
                    }}>
                        <span>Post vertical - </span>
                        <LuRectangleVertical className="text-2xl ml-1" />
                    </div>
                    <div className={`flex items-center bg-primary p-2 rounded-sm justify-center ${activeSize == 1 && "!bg-accent"}`} onClick={() => {
                        setActiveSize(1);
                    }}>
                        <span>Post horizontal - </span>
                        <LuRectangleHorizontal className="text-2xl ml-1" />
                    </div>
                </div>
                <button className="bg-green-600 py-1 rounded-md mt-5"
                    onClick={async () => {
                        await setCanvasPreview(
                            imgRef.current, // HTMLImageElement
                            previewCanvasRef.current, // HTMLCanvasElement
                            convertToPixelCrop(
                                crop,
                                imgRef.current.width,
                                imgRef.current.height
                            )
                        );
                        const canvas = previewCanvasRef.current;
                        canvas.toBlob((blob) => imageCroperListener(blob));
                    }}>
                    upload
                </button>

            </div>
        </div>
    );
};

export default ImageCroperArea;