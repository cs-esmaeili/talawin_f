import { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import translations from "@/translations.json";
import useLogout from "@/hooks/useLogout"
import UserInformation from '@/app/dashboard/(main)/user/page';
import { useModalContext } from '@/components/dashboard/Modal';
import { useSelector } from 'react-redux';

const MiniProfile = ({ sliderIsOpen }) => {

  const [open, setOpen] = useState(false);
  const information = useSelector((state) => state.information.value);
  const role = useSelector((state) => state.role.value);
  const [userName, setUserName] = useState("");
  const { push } = useRouter();
  const { openModal, closeModal } = useModalContext();
  const { miniProfile } = translations['fa'];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserName(getCookie('userName'));
  }, []);

  useEffect(() => {
    if (information != null) {
      setLoading(false);
    }
  }, [information]);

  return (
    <div
      className="relative mr-3 flex cursor-pointer"
      onClick={() => {
        setOpen(!open);
      }}
    >
      {loading ?
        <div className="flex grow w-full justify-center items-center">
          <div className="relative w-10 h-10">
            <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
            <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
          </div>
        </div>
        :
        <>
          <Image
            className="rounded-md"
            src="/avatar.jpg"
            alt="Site logo"
            width={50}
            height={50}
          />
          <div className="ml-3 hidden flex-col text-center sm:flex">
            <span>{information?.data?.fullName ?? userName}</span>
            <span>{role.name}</span>
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
                  <span>{information?.data?.fullName ?? userName}</span>
                  <span>{role.name}</span>
                </div>
              </div>
              <hr className=" mb-2 mt-2 sm:hidden" />
              <div className="flex flex-col justify-end">
                <div className="text-right hover:bg-accent rounded-md p-1 cursor-pointer" onClick={() => {
                  openModal(<UserInformation selfMode />);
                }}>{miniProfile.profile}</div>

                <div className="text-right hover:bg-accent rounded-md p-1 cursor-pointer" onClick={() => {
                  useLogout(push);
                }}>{miniProfile.exit}</div>
              </div>
              {/* <hr className="mt-2" />
          <div className="flex flex-row justify-end mt-2">
            <div className="flex">
              <MdSunny className="text-2xl" />
            </div>
            <div className="flex">
              <FaBell className="ml-3 text-2xl" />
            </div>
          </div> */}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default MiniProfile;
