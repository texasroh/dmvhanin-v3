import {
  BUSINESS_OWNER_PAGE,
  LOGIN_PAGE,
  LOGOUT_PAGE,
  PROFILE_PAGE,
} from "@/constants/urls";
import { useUser } from "@/hooks/useUser";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, HTMLAttributes } from "react";
import Avatar from "./avatar";

interface SubMenuItemProps extends HTMLAttributes<HTMLDivElement> {}

const SubMenuItem = ({}: SubMenuItemProps) => {
  return <div></div>;
};

const ProfileMenu = () => {
  const { user } = useUser();
  return user ? (
    <Menu as="div" className="relative">
      <Menu.Button>
        <Avatar photoURL={user.photoURL || ""} alt={user.displayName || ""} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 space-y-1 rounded bg-white text-base font-normal shadow">
          {process.env.NODE_ENV === "development" && (
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link href={PROFILE_PAGE}>
                    <div
                      className={clsx("px-4 py-2", {
                        "bg-orange-300 font-bold text-white": active,
                      })}
                    >
                      프로필
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={BUSINESS_OWNER_PAGE}>
                    <div
                      className={clsx("px-4 py-2", {
                        "bg-orange-300 font-bold text-white": active,
                      })}
                    >
                      비지니스
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </>
          )}
          <Menu.Item>
            {({ active }) => (
              <Link href={LOGOUT_PAGE}>
                <div
                  className={clsx("px-4 py-2", {
                    "bg-orange-300 font-bold text-white": active,
                  })}
                >
                  로그아웃
                </div>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <Link href={LOGIN_PAGE}>로그인</Link>
  );
};

export default ProfileMenu;
