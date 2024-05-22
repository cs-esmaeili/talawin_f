'use client'

import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import SideBarShdow from "./SideBarShdow";
import config from "../../config.json";

const Sidebar = ({ open, setOpen, categorys }) => {

  const pathname = usePathname();


  return (
    <>
      <SideBarShdow open={open} setOpen={setOpen} />
      <div
        className={
          open
            ? "fixed bottom-0 right-0  top-0 z-30 h-full min-w-max bg-primary_s p-7 duration-500 ease-in overflow-y-auto"
            : "fixed  right-[-100%] h-full z-30 min-w-max bg-primary_s p-7 duration-500 ease-in"
        }
      >
        <div className="flex items-center justify-between mb-5 min-w-36 bg-red-300">
          <Image
            className="rounded-md"
            src={config.api + config.logo_url}
            alt="Site logo"
            width={60}
            height={60}
          />
          <span className="ml-3 font-bold">{config.app_name}</span>
        </div>

        <div>
          {categorys && categorys.map((item, index) => {
            const { name, url = `/category/${name}` } = item;
            return (
              <Link href={url} key={index} onClick={() => { setOpen(false) }}>
                <div className={(pathname == url) ?
                  "bg-siebar_item mb-5 flex items-center rounded-lg bg-dactive p-3 text-black"
                  :
                  "mb-5 flex items-center p-3 text-dactive"
                }>
                  <span className="ml-3">{name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
