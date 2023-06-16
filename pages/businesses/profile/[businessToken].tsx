import ReviewForm from "@/components/business/reviewForm";
import CustomImage from "@/components/customImage";
import ImageSlider from "@/components/imageSlider";
import { useUser } from "@/hooks/useUser";
import { formatPhone } from "@/libs/client/number";
import client from "@/libs/server/client";
import { Business, BusinessImage, BusinessSubcategory } from "@prisma/client";
import { NextPageContext } from "next";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsDot, BsGlobe, BsTelephone } from "react-icons/bs";

interface ExtendedBusiness extends Business {
  businessImages: BusinessImage[];
  businessSubcategory: BusinessSubcategory;
}

interface IBusinessDetailProps {
  business: ExtendedBusiness;
  businessToken: string;
}

const BusinessDetail = ({ business, businessToken }: IBusinessDetailProps) => {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      {business.businessImages.length ? (
        <ImageSlider imgSrcs={business.businessImages} />
      ) : null}
      <div className="flex items-center space-x-4">
        <CustomImage
          imgSrc={business.logoImageId}
          alt={business.titleKor}
          circle
        />
        <div>
          <div>
            {business.titleKor}{" "}
            <span className="text-sm">({business.titleEng})</span>
          </div>
          <div className="flex items-center text-gray-400">
            <div>{business.city}</div>
            <div className="mx-1">
              <BsDot />
            </div>
            <div>{business.businessSubcategory.name}</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="py-3 text-lg font-bold">Description</h3>
        <p>{business.description ?? "No descriptions yet."}</p>
      </div>
      <div className="space-y-2">
        {business.address && (
          <div className="flex items-center space-x-3">
            <BiMap size={20} />
            <div>
              {business.address}. {business.city}, {business.state}{" "}
              {business.zipcode}
            </div>
          </div>
        )}
        {business.phone && (
          <div className="flex items-center space-x-3">
            <BsTelephone size={20} />
            <div>{formatPhone(business.phone)}</div>
          </div>
        )}
        {business.website && (
          <div className="flex items-center space-x-3">
            <BsGlobe size={20} />
            <div>{business.website}</div>
          </div>
        )}
        {business.email && (
          <div className="flex items-center space-x-3">
            <AiOutlineMail size={20} />
            <div>{business.email}</div>
          </div>
        )}
      </div>
      <div>
        <h3 className="py-3 text-lg font-bold">Reviews</h3>
        {user ? (
          <ReviewForm businessToken={businessToken} />
        ) : (
          <div className="rounded border border-gray-300 p-4 text-center text-gray-400">
            Please{" "}
            <Link href="/auth/login" className="underline">
              sign-in
            </Link>{" "}
            for leaving a comment.
          </div>
        )}
        <p>No reviews yet.</p>
      </div>
    </div>
  );
};

export default BusinessDetail;

export const getServerSideProps = async ({
  query: { category, businessToken },
}: NextPageContext) => {
  const uuid = businessToken?.toString().split("-").pop();
  const business = await client.business.findUnique({
    include: {
      businessImages: true,
      businessSubcategory: true,
    },
    where: {
      uuid,
    },
  });
  if (!business) {
    return {
      redirect: {
        destination: "/businesses",
      },
    };
  }

  return {
    props: {
      business: JSON.parse(JSON.stringify(business)),
      businessToken: uuid,
    },
  };
};
