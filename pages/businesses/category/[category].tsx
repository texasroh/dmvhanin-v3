import CustomImage from "@/components/customImage";
import LoadingSpinner from "@/components/loadingSpinner";
import { BUSINESS_PER_PAGE } from "@/constants/numbers";
import { businessAPI } from "@/libs/client/api/business";
import { businessQuery } from "@/libs/server/business";
import { Business, BusinessSubcategory } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsChatText, BsDot, BsStar } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { categories } from "..";

interface IExtendedBusiness extends Business {
  businessSubcategory: BusinessSubcategory;
}

interface ICategoryIndexProps {
  businesses: IExtendedBusiness[];
  totalPage: number;
}

interface IGetBusinesses extends ICategoryIndexProps {
  page: number;
  totalResult: number;
}

const CategoryIndex = ({ businesses, totalPage }: ICategoryIndexProps) => {
  const [data, setData] = useState<IExtendedBusiness[]>([]);

  const currentPage = useRef(1);

  const router = useRouter();
  const { category } = router.query;
  const categoryKor = categories.find((obj) => obj.key === category)?.label;
  useEffect(() => {
    if (!categoryKor) {
      router.replace("/businesses");
    }
  }, [categoryKor]);

  const {
    data: fetchedData,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery<IGetBusinesses>(
    ["business", category],
    businessAPI.getBusinesses,
    {
      enabled: false,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page < lastPage.totalPage
          ? lastPage.page + 1
          : undefined;
      },
      onSuccess: (newPageData) => {
        const lastPage = newPageData.pages[newPageData.pages.length - 1];
        if (!lastPage) return;

        setData([
          ...businesses,
          ...newPageData.pages.map((page) => page.businesses).flat(),
        ]);
        currentPage.current = lastPage.page;
      },
    }
  );

  useEffect(() => {
    if (fetchedData) {
      currentPage.current =
        fetchedData.pages[fetchedData.pages.length - 1].page;
      setData([
        ...businesses,
        ...fetchedData.pages.map((page) => page.businesses).flat(),
      ]);
    } else {
      currentPage.current = 1;
      setData(businesses);
    }
  }, [businesses]);

  const { ref, inView } = useInView({
    rootMargin: "30px",
  });

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="space-y-6">
      <ul className="hide-x-scroll sticky top-16 flex flex-nowrap space-x-4 overflow-x-auto bg-white p-4">
        {categories.map((cat, idx) => (
          <li
            key={idx}
            className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
              cat.key === category ? "bg-gray-600 text-white" : "text-gray-600"
            }`}
            onClick={() => router.push(cat.key)}
          >
            {cat.label}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.map((business, idx) => (
          <div className="px-2" key={idx}>
            <Link
              href={`/businesses/profile/${business.titleKor}-${business.uuid}`}
            >
              <div className="flex space-x-4 border-b py-4 px-4">
                <CustomImage
                  imgSrc={business.logoImageId}
                  alt={business.titleKor}
                  circle
                />
                <div className="space-y-1">
                  <div className="flex items-end gap-2">
                    <div className="break-all line-clamp-1">
                      {business.titleKor}
                    </div>
                    <span className="shrink-0 text-sm font-medium text-gray-400">
                      {business.city}
                    </span>
                  </div>
                  <div className="text-sm leading-4 line-clamp-2">
                    {business.description}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BsChatText />
                    <div className="ml-1">{business.totalReview}</div>
                    <div className="mx-2">
                      <BsDot />
                    </div>
                    <BsStar />
                    <div className="ml-1">
                      <>{business.avgRating}</>
                    </div>
                    <div className="mx-2">
                      <BsDot />
                    </div>
                    <div>{business.businessSubcategory.name}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {currentPage.current < totalPage && (
        <div className="flex justify-center" ref={ref}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default CategoryIndex;

export const getServerSideProps = async ({
  query: { category },
}: NextPageContext) => {
  const businesses = await businessQuery.getBusinesses(category + "", 1);

  const totalResult = await businessQuery.getTotalBusinessCount(category + "");

  const totalPage = Math.ceil(totalResult / BUSINESS_PER_PAGE);

  return {
    props: {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalPage,
    },
  };
};
