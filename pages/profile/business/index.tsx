import Button from "@/components/button";
import { BUSINESS_CREATION_PAGE, MAIN_PAGE } from "@/constants/urls";
import { profileQuery } from "@/libs/server/profile";
import { withSsrSession } from "@/libs/server/withSession";
import { Business } from "@prisma/client";
import { NextPageContext } from "next";
import Link from "next/link";

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
            <Button.white className="px-4">+ New</Button.white>
          </Link>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        {businesses.map((business, idx) => (
          <div key={idx} className="rounded border border-gray-300 px-4 py-2">
            {business.titleKor}
          </div>
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
