import React from "react";
import MiniProfile from "./MiniProfile";
import { FaBell } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { BiSolidStar } from "react-icons/bi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { GiOpenTreasureChest } from "react-icons/gi";

const Header = ({ open, setOpen }) => {
  return (
    <div className="flex items-center p-2">
      <RiMenu3Line
        className="mr-3 text-2xl lg:hidden"
        onClick={() => setOpen(!open)}
      />
      <div className="flex  grow flex-wrap justify-around gap-1 rounded-xl bg-secondary p-2">
        <div className="hidden md:flex ">
          <BiSolidStar className="text-2xl  text-blue-400" />
          <span className="text-md">300</span>
        </div>
        <div className="flex text-green-400">
          <PiArrowFatDownFill className="text-2xl" />
          <span className="text-md">12,000,000 M</span>
        </div>
        <div className="flex  text-red-400">
          <PiArrowFatUpFill className="text-2xl" />
          <span className="text-md">10,000,000 M</span>
        </div>
        <div className="hidden text-yellow-400 md:flex">
          <GiOpenTreasureChest className="text-2xl" />
          <span className="text-md">10 G</span>
        </div>
      </div>
      <div className="ml-3 hidden sm:flex">
        <MdSunny className="text-2xl" />
        <FaBell className="ml-3 text-2xl" />
      </div>
      <MiniProfile sliderIsOpen={open} />
    </div>
  );
};

export default Header;
