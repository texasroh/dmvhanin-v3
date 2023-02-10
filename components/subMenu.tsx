import Link from "next/link";

const SubMenu = () => {
  return (
    <>
      <li>
        <Link href={"/auth/login"}>로그인</Link>
      </li>
    </>
  );
};
export default SubMenu;
