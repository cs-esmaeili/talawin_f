import React, { useState, useEffect } from "react";
import Image from "next/image";

const ImageModal = ({ baseUrl, image, blurHash, size }) => {
  console.log(blurHash);
  return (
    <div className="w-screen min-[300px]:w-[20rem]  min-[400px]:w-[25rem] min-[500px]:w-[30rem] md:w-[35rem]">
      <Image
        src={baseUrl + image}
        alt="Picture of the author"
        width={size.width}
        height={size.height}
        layout="responsive"
        placeholder="blur"
        blurDataURL={blurHash}
        onClick={(e) => {e.stopPropagation();}}
      />
    </div>
  );
};

export default ImageModal;
