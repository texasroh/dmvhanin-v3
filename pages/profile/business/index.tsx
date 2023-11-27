import Button from "@/components/button";
import {
  BUSINESS_CREATION_PAGE,
  BUSINESS_OWNER_DETAIL_PAGE,
  MAIN_PAGE,
} from "@/constants/urls";
import { profileQuery } from "@/libs/server/profile";
import { withSsrSession } from "@/libs/server/withSession";
import { Business } from "@prisma/client";
import { NextPageContext } from "next";
import Link from "next/link";
import { sprintf } from "sprintf-js";

interface BusinessesProps {
  businesses: Business[];
}

const Businesses = ({ businesses }: BusinessesProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">내 업소</h1>

        <div>
          <Link href={BUSINESS_CREATION_PAGE}>
            <Button.White className="px-4">+ New</Button.White>
          </Link>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        {businesses.map((business, idx) => (
          <Link
            key={idx}
            href={sprintf(BUSINESS_OWNER_DETAIL_PAGE, business.uuid)}
          >
            <div className="rounded border border-gray-300 px-4 py-2">
              {business.titleKor}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Businesses;

export const getServerSideProps = withSsrSession(
  async ({ req }: NextPageContext) => {
    const uid = req?.session.user?.uid;
    if (!uid) {
      return {
        redirect: {
          destination: MAIN_PAGE,
        },
      };
    }

    const businesses = await profileQuery.getBusinesses(uid);
    if (businesses.length == 0)
      return {
        redirect: {
          destination: BUSINESS_CREATION_PAGE,
        },
      };
    return { props: { businesses: JSON.parse(JSON.stringify(businesses)) } };
  }
);
