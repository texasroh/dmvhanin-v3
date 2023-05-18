import { useUser } from "@/hooks/useUser";
import Link from "next/link";

const SubMenu = () => {
  const { user } = useUser();
  return <li>{user ? null : <Link href={"/auth/login"}>로그인</Link>}</li>;
};
export default SubMenu;
