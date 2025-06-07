import { useState } from "react";
import HHImage from "./HHImage";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full  h-16 flex items-center justify-between ">
      {/* LOGO */}
      <Link to="/" className=" flex items-center gap-4 text-2xl font-bold">
        <HHImage src="/logo.png" alt="logo 图片" width={32} height={32} />
        <span>你好啊李银河</span>
      </Link>
      {/* MOBILR MENU */}
      <div className="md:hidden">
        {/* mobile button */}
        <div
          className="cursor-pointer text-2xl "
          //   onClick={() => setOpen(!open)}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>
        {/* mobile link list */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg  absolute top-16 transition-all ease-in-out  ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/">主页</Link>
          <Link to="/">热门</Link>
          <Link to="/">趋势</Link>
          <Link to="/">关于</Link>
          <Link to="">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              登录 &#x1F600;
            </button>
          </Link>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">主页</Link>
        <Link to="/">热门</Link>
        <Link to="/">趋势</Link>
        <Link to="/">关于</Link>

        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              登录 &#x1F600;
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
