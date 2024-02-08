import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none justify-center">
      <div className="flex flex-grow items-center justify-between py-5 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span className="relative top-0 left-0 my-1 block h-0.5  rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white !w-full delay-300"></span>
                <span className="relative top-0 left-0 my-1 block h-0.5  rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white delay-400 !w-full"></span>
                <span className="relative top-0 left-0 my-1 block h-0.5  rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white !w-full delay-500"></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span className="absolute left-2.5 top-0 block  w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white !h-0 !delay-[0]"></span>
                <span className="delay-400 absolute left-0 top-2.5 block w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white !h-0 !delay-200"></span>
              </span>
            </span>
          </button>
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
          </Link>
        </div>
        <div className="w-full justify-center flex text-4xl text-black-2">
          USB CAMERA LIVE STREAM
        </div>
      </div>
    </header>
  );
};

export default Header;
