import BusinessListItem from "@/components/business/businessListItem";
import LoadingSpinner from "@/components/loadingSpinner";
import { BUSINESS_PER_PAGE } from "@/constants/numbers";
import { BUSINESS_DETAIL_PAGE } from "@/constants/urls";
import { businessAPI } from "@/libs/client/api/business";
import { businessQuery } from "@/libs/server/business";
import { Business, BusinessSubcategory } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { sprintf } from "sprintf-js";
import { categories } from "..";

export interface IExtendedBusiness extends Business {
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
  }, [categoryKor, router]);

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
  }, [businesses, fetchedData]);

  const { ref, inView } = useInView({
    rootMargin: "30px",
  });

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);

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
              href={sprintf(
                BUSINESS_DETAIL_PAGE,
                business.titleKor,
                business.uuid
              )}
            >
              <BusinessListItem business={business} />
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
}: GetServerSidePropsContext) => {
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
