import React, { useState } from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const MiniProfile = ({ sliderIsOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative ml-3 flex"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Image
        className="rounded-md"
        src="/avatar.jpg"
        alt="Site logo"
        width={50}
        height={50}
      />
      <div className="ml-3 hidden flex-col text-center sm:flex">
        <span>Javad Esmaeili</span>
        <span>Admin</span>
      </div>

      <div
        className={
          !open
            ? "hidden"
            : "absolute right-0  top-[100%] mt-2 flex min-w-max flex-wrap rounded-md bg-secondary p-3 z-10"
        }
      >
        <div className="flex flex-col justify-center text-center">
          <div className="flex flex-row justify-center">
            <Image
              className="rounded-md"
              src="/avatar.jpg"
              alt="Site logo"
              width={50}
              height={50}
            />
            <div className="ml-2 flex flex-col text-center">
              <span className="text-nowrap">Javad Esmaeili</span>
              <span className="opacity-75">Admin</span>
            </div>
          </div>
          <hr className=" mb-2 mt-2" />
          <div>Main menu</div>
          <div className="flex flex-row">
            <div className="flex">
              <MdSunny className="text-2xl" />
              <span className="ml-2">Dark Mode</span>
            </div>
            <div className="flex">
              <FaBell className="ml-3 text-2xl" />
              <span className="ml-2">Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
