import { MAIN_PAGE } from "@/constants/urls";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo-black.png";
import MainMenu from "./mainMenu";
import ProfileMenu from "./profileMenu";

const Header = () => {
  return (
    <header className="flex h-60 flex-col items-center justify-evenly px-2">
      <div className="flex items-center justify-center">
        <Link href={MAIN_PAGE}>
          <Image src={logo} alt="DMV hanin Logo" width={350} />
        </Link>
      </div>
      <nav className="mx-auto flex w-full max-w-[770px] justify-between space-x-6 text-lg font-bold text-gray-600">
        <ul className="flex space-x-10">
          <MainMenu />
        </ul>
        <div>
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );
};
export default Header;
