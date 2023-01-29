import Link from "next/link";

const MainMenu = () => {
  return (
    <>
      <li>
        <Link href={"/businesses"}>한인업소록</Link>
      </li>
      <li>
        <Link href={"/"}>중고거래</Link>
      </li>
      <li>
        <Link href={"/"}>구인구직</Link>
      </li>
    </>
  );
};
export default MainMenu;
