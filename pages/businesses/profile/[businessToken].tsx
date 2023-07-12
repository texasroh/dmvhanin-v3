import Review from "@/components/business/review";
import ReviewForm from "@/components/business/reviewForm";
import CustomImage from "@/components/customImage";
import ImageSlider from "@/components/imageSlider";
import LoadingSpinner from "@/components/loadingSpinner";
import { BUSINESS_REVIEW_PER_PAGE } from "@/constants/numbers";
import { useUser } from "@/hooks/useUser";
import { businessAPI } from "@/libs/client/api/business";
import { formatPhone } from "@/libs/client/number";
import { ExtendedBusinessReview, businessQuery } from "@/libs/server/business";
import { Business, BusinessImage, BusinessSubcategory } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsDot, BsGlobe, BsTelephone } from "react-icons/bs";
import { useInView } from "react-intersection-observer";

interface ExtendedBusiness extends Business {
  businessImages: BusinessImage[];
  businessSubcategory: BusinessSubcategory;
}
interface Reviews {
  reviews: ExtendedBusinessReview[];
  totalReviewPage: number;
}

interface IBusinessDetailProps extends Reviews {
  business: ExtendedBusiness;
  businessToken: string;
}

interface GetReviews extends Reviews {
  page: number;
}

const BusinessDetail = ({
  business,
  businessToken,
  reviews,
  totalReviewPage,
}: IBusinessDetailProps) => {
  const { user } = useUser();
  const currentReviewPage = useRef(1);
  const { ref, inView } = useInView({ rootMargin: "30px" });
  const { fetchNextPage, isFetchingNextPage } = useInfiniteQuery<any>(
    ["businessReview", businessToken],
    businessAPI.getReviews,
    {
      enabled: false,
      getNextPageParam: (lastPage, allPages) => {
        console.log("getNextPageParam");
        return lastPage.page < lastPage.totalReviewPage
          ? lastPage.page + 1
          : undefined;
      },
      onSuccess: (newPageData) => {
        console.log("onSuccess", newPageData);
        // const lastPage = newPageData.pages[newPageData.pages.length - 1];
        // if (!lastPage) return;

        // setData([
        //   ...businesses,
        //   ...newPageData.pages.map((page) => page.businesses).flat(),
        // ]);
        // currentPage.current = lastPage.page;
        // isLoading.current = false;
      },
    }
  );

  console.log("isFetchingNextPage", isFetchingNextPage);

  useEffect(() => {
    // console.log("inview");
    if (inView && !isFetchingNextPage) {
      // isLoading.current = true;
      console.log("hello");
      fetchNextPage();
      console.log("done");
    }
  }, [inView]);

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
        <div className="mt-5">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review, idx) => (
                <Review review={review} key={idx} />
              ))}
              {currentReviewPage.current < totalReviewPage && (
                <div className="flex justify-center" ref={ref}>
                  <LoadingSpinner />
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-sm font-bold text-gray-500">
              No reviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;

export const getServerSideProps = async ({
  query: { businessToken },
}: NextPageContext) => {
  const uuid = businessToken?.toString().split("-").pop() + "";
  const business = await businessQuery.getBusiness(uuid);

  if (!business) {
    return {
      redirect: {
        destination: "/businesses",
      },
    };
  }

  const reviews = await businessQuery.getReviews(uuid, 1);
  const totalReviewCount = await businessQuery.getTotalReviewCount(uuid);
  const totalReviewPage = Math.ceil(
    totalReviewCount / BUSINESS_REVIEW_PER_PAGE
  );

  return {
    props: {
      business: JSON.parse(JSON.stringify(business)),
      businessToken: uuid,
      reviews: JSON.parse(JSON.stringify(reviews)),
      totalReviewPage,
    },
  };
};
