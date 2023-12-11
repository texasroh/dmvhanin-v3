import { BUSINESS_MAIN_PAGE, FLEAMARKET_MAIN_PAGE } from "@/constants/urls";
import Link from "next/link";

const MainMenu = () => {
  return (
    <>
      <li>
        <Link href={BUSINESS_MAIN_PAGE}>한인업소록</Link>
      </li>
      {process.env.NODE_ENV === "development" && (
        <li>
          <Link href={FLEAMARKET_MAIN_PAGE}>중고거래</Link>
        </li>
      )}
      {/* <li>
        <Link href={"/"}>구인구직</Link>
      </li> */}
    </>
  );
};
export default MainMenu;
