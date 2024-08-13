import { PiFolderFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdPostAdd, MdOutlineHistory, MdProductionQuantityLimits } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import config from "@/config.json";
import translations from "@/translations.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { GiMagicPortal } from "react-icons/gi";
import { useSelector } from 'react-redux';

const Sidebar = ({ open, setOpen }) => {

  const pathname = usePathname();
  const text = translations["fa"].sideBar;
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const information = useSelector((state) => state.information.value);
  const permissions = useSelector((state) => state.permissions.value);

  const allItems = [
    { name: text["/dashboard"], url: "/dashboard", icon: <MdSpaceDashboard className="text-2xl" /> },
    { name: text["/dashboard/product"], url: "/dashboard/product", icon: <MdProductionQuantityLimits className="text-2xl" /> },
    { name: text["/dashboard/admintradeportal"], url: "/dashboard/admintradeportal", icon: <GiMagicPortal className="text-2xl" /> },
    { name: text["/dashboard/apibox"], url: "/dashboard/apibox", icon: <GiMagicPortal className="text-2xl" /> },
    { name: text["/dashboard/filemanager"], url: "/dashboard/filemanager", icon: <PiFolderFill className="text-2xl" /> },
    { name: text["/dashboard/category"], url: "/dashboard/category", icon: <BiSolidCategoryAlt className="text-2xl" /> },
    { name: text["/dashboard/post/createPost"], url: "/dashboard/post/createPost", icon: <MdPostAdd className="text-2xl" /> },
    { name: text["/dashboard/post/postList"], url: "/dashboard/post/postList", icon: <HiOutlineClipboardDocumentList className="text-2xl" /> },
    { name: text["/dashboard/role"], url: "/dashboard/role", icon: <BsShieldLockFill className="text-2xl" /> },
    { name: text["/dashboard/user"], url: "/dashboard/user", icon: <FaUserPlus className="text-2xl" /> },
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (permissions != null) {
      let tempItems = [];
      allItems.forEach(item => {
        permissions.forEach(permission => {
          if (item.url == permission.route) {
            tempItems.push(item);
          }
        });
      });
      setItems(tempItems);
    }
  }, [permissions , information]);

  useEffect(() => {
    if (permissions != null && permissions.length > 0 && information != null) {
      setLoading(false);
    }
  }, [permissions, information]);

  useEffect(() => {
    setUserName(getCookie('userName'));
  }, []);

  return (
    <div
      className={
        open
          ? "fixed bottom-0 right-0 top-0 z-30 h-full min-w-max bg-secondary p-7 duration-500 ease-in overflow-y-auto"
          : "fixed  right-[-100%] h-full z-30 min-w-max bg-secondary p-7 duration-500 ease-in lg:static lg:flex overflow-y-auto flex-col"
      }
    >
      <div className="flex items-center justify-between min-w-[256px]">
        <div className="flex grow justify-center">
          <span className="ml-3 text-2xl "> {config.app_name} </span>
        </div>
        <Image
          className="rounded-md"
          src={config.api + config.logo_url}
          alt="Site logo"
          width={60}
          height={60}
        />

      </div>
      {loading ?
        <div className="flex grow w-full justify-center items-center">
          <div className="relative w-20 h-20">
            <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
            <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
          </div>
        </div>
        :
        <>
          <div className="mb-5 mt-8 flex items-center justify-between rounded-md bg-secondary_dark p-3">
            <div className="flex grow justify-center mr-3">
              <span>{information?.data?.fullName ?? userName}</span>
            </div>
            <Image
              className="rounded-full"
              src="/avatar.jpg"
              alt="Site logo"
              width={45}
              height={45}
            />
          </div>
          <div>
            {items.map((item, index) => {
              const { url, icon, name } = item;
              return (
                <Link href={url} key={index}>
                  <div className={(pathname == url) ?
                    "bg-siebar_item mb-5 flex items-center rounded-lg bg-active_background p-3 text-accent rtl"
                    :
                    "mb-5 flex items-center p-3 text-dactive rtl"
                  }>
                    {icon}
                    <span className="mr-3">{name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      }
    </div>
  );
};

export default Sidebar;
