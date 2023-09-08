import { profileQuery } from "@/libs/server/profile";
import { withSsrSession } from "@/libs/server/withSession";
import { Business } from "@prisma/client";
import { NextPageContext } from "next";

interface BusinessesProps {
  businesses: Business[];
}

const Businesses = ({ businesses }: BusinessesProps) => {
  return (
    <div>
      <h1>Business</h1>
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
          destination: "/",
        },
      };
    }

    const businesses = await profileQuery.getBusinesses(uid);
    if (businesses.length == 0)
      return {
        redirect: {
          destination: "/profile/business/new",
        },
      };
    return { props: { businesses } };
  }
);
