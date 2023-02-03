import { Business } from "@prisma/client";
import { NextPageContext } from "next";
import client from "@/libs/server/client";
import { useRouter } from "next/router";

interface IBusinessDetailProps {
  business: Business;
}

const BusinessDetail = ({ business }: IBusinessDetailProps) => {
  return <div>Business Detail</div>;
};

export default BusinessDetail;

export const getServerSideProps = async ({
  query: { category, businessToken },
}: NextPageContext) => {
  const uuid = businessToken?.toString().split("-").pop();
  const business = await client.business.findUnique({
    include: {
      businessImages: true,
    },
    where: {
      uuid,
    },
  });

  console.log(business);
  return {
    props: {
      business: JSON.parse(JSON.stringify(business)),
    },
  };
};
