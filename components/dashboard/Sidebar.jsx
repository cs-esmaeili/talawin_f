import { PiFolderFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = ({ open, setOpen }) => {

  const pathname = usePathname();
  const { replace } = useRouter();
  const permissions = useSelector((state) => state.permissions.value);

  const allItems = [
    { name: "Dashboard", url: "/dashboard", icon: <MdSpaceDashboard className="text-2xl" /> },
    { name: "File Manager", url: "/dashboard/filemanager", icon: <PiFolderFill className="text-2xl" /> },
    { name: "Category", url: "/dashboard/category", icon: <BiSolidCategoryAlt className="text-2xl" /> },
    { name: "Create Post", url: "/dashboard/post/createPost", icon: <MdPostAdd className="text-2xl" /> },
    { name: "Post List", url: "/dashboard/post/postList", icon: <HiOutlineClipboardDocumentList className="text-2xl" /> },
    { name: "Permissions", url: "/dashboard/role", icon: <BsShieldLockFill className="text-2xl" /> },
    { name: "Users", url: "/dashboard/user", icon: <FaUserPlus className="text-2xl" /> },
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    let tempItems = [...items];
    allItems.forEach(item => {
      permissions.forEach(permission => {
        if (item.url == permission.route) {
          tempItems.push(item);
        }
      });
    });
    setItems(tempItems);

  }, []);

  return (
    <div
      className={
        open
          ? "absolute bottom-0 left-0 top-0 z-30 h-full min-w-max bg-secondary p-7 duration-500 ease-in"
          : "absolute  left-[-100%] h-full z-30 min-w-max bg-secondary p-7 duration-500 ease-in lg:static lg:block"
      }
    >
      <div className="flex items-center justify-center">
        <Image
          className="rounded-md"
          src="/logo.jpg"
          alt="Site logo"
          width={60}
          height={60}
        />
        <span className="ml-3 font-bold"> WEB site Name </span>
      </div>

      <div className="mb-5 mt-8 flex items-center rounded-md bg-secondary_dark p-3">
        <Image
          className="rounded-full"
          src="/avatar.jpg"
          alt="Site logo"
          width={45}
          height={45}
        />
        <span className="ml-3"> Javad Esmaeili </span>
      </div>
      <div>
        {items.map((item, index) => {
          const { url, icon, name } = item;
          return (
            <Link href={url} key={index}>
              <div className={(pathname == url) ?
                "bg-siebar_item mb-5 flex items-center rounded-lg bg-active_background p-3 text-accent"
                :
                "mb-5 flex items-center p-3 text-dactive"
              }>
                {icon}
                <span className="ml-3">{name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
