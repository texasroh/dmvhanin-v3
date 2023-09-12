import Image from "next/image";
import Link from "next/link";
import logo from "../images/short-logo.png";
import MainMenu from "./mainMenu";
import ProfileMenu from "./profileMenu";

const TinyHeader = () => {
  return (
    <header className="container mx-auto flex h-full items-center justify-between px-4">
      <div className="flex items-center space-x-10">
        <Link href="/">
          <Image src={logo} alt="DMV hanin logo" height={30} />
        </Link>
        <ul className="flex space-x-6 text-lg font-bold text-gray-600">
          <MainMenu />
        </ul>
      </div>
      <ul className="flex space-x-6 text-lg font-bold text-gray-600">
        <ProfileMenu />
      </ul>
    </header>
  );
};

export default TinyHeader;
