import React, { useState } from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import translations from "@/translations.json";
import useLogout from "@/hooks/useLogout"

const MiniProfile = ({ sliderIsOpen }) => {

  const [open, setOpen] = useState(false);
  const user = getCookie('user') && JSON.parse(getCookie('user'));
  const userName = getCookie('userName');
  const role = getCookie('role');
  const { push } = useRouter();

  const { miniProfile } = translations['fa'];



  return (
    <div
      className="relative mr-3 flex cursor-pointer"
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
        <span>{(user && user.fullName != null) ? user.fullName : userName}</span>
        <span>{role}</span>
      </div>

      <div
        className={
          !open
            ? "hidden"
            : "absolute right-0  top-[100%] mt-2 flex min-w-max flex-wrap rounded-md bg-secondary p-3 z-10"
        }
      >
        <div className="flex flex-col justify-center text-center p-2">
          <div className="flex flex-row justify-around sm:hidden">
            <Image
              className="rounded-md"
              src="/avatar.jpg"
              alt="Site logo"
              width={50}
              height={50}
            />
            <div className="ml-2 flex flex-col text-center">
              <span>{(user && user.fullName != null) ? user.fullName : userName}</span>
              <span>{role}</span>
            </div>
          </div>
          <hr className=" mb-2 mt-2 sm:hidden" />
          <div className="flex flex-col justify-end">
            <div className="text-right hover:bg-accent rounded-md p-1 cursor-pointer">{miniProfile.profile}</div>
            <div className="text-right hover:bg-accent rounded-md p-1 cursor-pointer" onClick={() => {
              useLogout(push);
            }}>{miniProfile.exit}</div>
          </div>
          <hr className="mt-2" />
          <div className="flex flex-row justify-end mt-2">
            <div className="flex">
              <MdSunny className="text-2xl" />
            </div>
            <div className="flex">
              <FaBell className="ml-3 text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
