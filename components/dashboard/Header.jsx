import React from "react";
import MiniProfile from "./MiniProfile";
import { FaBell } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { GiOpenTreasureChest } from "react-icons/gi";


import Prices from "./Prices";
import LogOutTimer from "./LogOutTimer";

const Header = ({ open, setOpen }) => {



  return (
    <div className="flex items-center p-2">

      <div className="mr-3 hidden sm:flex">
        <MdSunny className="text-2xl" />
        <FaBell className="ml-3 text-2xl" />
      </div>
      <MiniProfile sliderIsOpen={open} />

      <div className="flex  grow flex-wrap justify-around gap-1 rounded-xl bg-secondary p-2">
        <div className="hidden md:flex ">
          <LogOutTimer />
        </div>
        <Prices />
        <div className="hidden text-yellow-400 md:flex">
          <GiOpenTreasureChest className="text-2xl" />
          <span className="text-md">10 G</span>
        </div>
      </div>

      <RiMenu3Line
        className="ml-3 text-2xl lg:hidden"
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default Header;
