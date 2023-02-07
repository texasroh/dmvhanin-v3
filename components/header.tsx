import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo-black.png";
import MainMenu from "./mainMenu";
import SubMenu from "./subMenu";

const Header = () => {
  return (
    <header className="flex h-60 flex-col justify-evenly px-2">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image src={logo} alt="DMV hanin Logo" width={350} />
        </Link>
      </div>
      <nav className="mx-auto flex w-full max-w-[770px] justify-between space-x-6 text-lg font-bold text-gray-600">
        <ul className="flex space-x-10">
          <MainMenu />
        </ul>
        <ul>
          <SubMenu />
        </ul>
      </nav>
    </header>
  );
};
export default Header;
