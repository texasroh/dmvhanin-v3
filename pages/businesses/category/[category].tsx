import { useRouter } from "next/router";
import client from "@/libs/server/client";
import { NextPageContext } from "next";
import { Business, BusinessSubcategory } from "@prisma/client";
import { categories } from "..";
import { useEffect, useRef, useState } from "react";
import CustomImage from "@/components/customImage";
import { BsStar, BsChatText, BsDot } from "react-icons/bs";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { businessAPI } from "@/libs/client/api";
import LoadingSpinner from "@/components/loadingSpinner";
import { useInView } from "react-intersection-observer";

interface ExtendedBusiness extends Business {
  businessSubcategory: BusinessSubcategory;
}

interface ICategoryIndexProps {
  businesses: ExtendedBusiness[];
  totalPage: number;
}

interface IGetBusinesses extends ICategoryIndexProps {
  page: number;
  totalResult: number;
}

const PERPAGE = 20;

const CategoryIndex = ({ businesses, totalPage }: ICategoryIndexProps) => {
  const [data, setData] = useState(businesses);
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = useRef(false);
  const currentPage = useRef(1);
  const router = useRouter();
  const { category } = router.query;
  const categoryKor = categories.find((obj) => obj.key === category)?.label;
  useEffect(() => {
    if (!categoryKor) {
      router.replace("/businesses");
    }
  }, [categoryKor]);

  const { fetchNextPage } = useInfiniteQuery<IGetBusinesses>(
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
        console.log("onSuccess lastPage", lastPage.page);

        setData((prev) => [...prev, ...lastPage.businesses]);
        currentPage.current = lastPage.page;
        isLoading.current = false;
        // setIsLoading(false);
      },
    }
  );

  const { ref, inView } = useInView({
    rootMargin: "30px",
  });

  useEffect(() => {
    if (inView && !isLoading.current) {
      isLoading.current = true;
      // setIsLoading(true);
      fetchNextPage();
    }
  }, [inView, isLoading]);

  return (
    <div className="space-y-6">
      <ul className="sticky top-16 flex flex-nowrap space-x-4 overflow-x-auto bg-white p-4">
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
                      {business.titleEng}
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
  const businesses = await client.business.findMany({
    select: {
      titleKor: true,
      titleEng: true,
      uuid: true,
      logoImageId: true,
      description: true,
      city: true,
      state: true,
      totalRating: true,
      totalReview: true,
      avgRating: true,
      businessSubcategory: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      {
        avgRating: "desc",
      },
      {
        totalReview: "desc",
      },
      {
        id: "asc",
      },
    ],
    where: {
      businessSubcategory: {
        businessCategory: {
          key: category + "",
        },
      },
    },
    take: 20,
    skip: 0,
  });

  // const categories = await client.businessCategory.findMany({
  //   select: {
  //     name: true,
  //     key: true,
  //   },
  //   orderBy: {
  //     sort: "asc",
  //   },
  // });

  const totalResult = await client.business.count({
    where: {
      businessSubcategory: {
        businessCategory: {
          key: category + "",
        },
      },
    },
  });
  const totalPage = Math.ceil(totalResult / PERPAGE);

  return {
    props: {
      businesses: JSON.parse(JSON.stringify(businesses)),
      totalPage,
    },
  };
};
