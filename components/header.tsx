import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo-black.png";
import MainMenu from "./mainMenu";

const Header = () => {
  return (
    <header className="flex h-60 flex-col justify-evenly">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image src={logo} alt="DMV hanin Logo" width={350} />
        </Link>
      </div>
      <nav className="mx-auto w-full max-w-[600px] px-4">
        <ul className="flex justify-evenly text-sm font-medium md:text-base lg:text-xl">
          <MainMenu />
        </ul>
      </nav>
    </header>
  );
};
export default Header;
