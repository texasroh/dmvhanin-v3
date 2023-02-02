import { useRouter } from "next/router";
import client from "@/libs/server/client";
import { NextPageContext } from "next";
import { Business, BusinessImage, BusinessSubcategory } from "@prisma/client";
import { categories } from "..";
import { useEffect } from "react";
import Image from "next/image";
import CustomImage from "@/components/customImage";
import { BsStar, BsChatText, BsDot } from "react-icons/bs";
import Link from "next/link";

interface ExtendedBusiness extends Business {
  businessImages: BusinessImage[];
  businessSubcategory: BusinessSubcategory;
}
interface ICategoryIndexProps {
  businesses: ExtendedBusiness[];
}

const CategoryIndex = ({ businesses }: ICategoryIndexProps) => {
  const router = useRouter();
  const { category } = router.query;
  const categoryKor = categories.find((obj) => obj.key === category)?.label;
  useEffect(() => {
    if (!categoryKor) {
      router.replace("/businesses");
    }
  }, [categoryKor]);
  return (
    <div>
      <h1 className="text-lg font-medium">{categoryKor}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {businesses.map((business, idx) => (
          <div className="px-2" key={idx}>
            <Link href={""}>
              <div className="flex space-x-4 border-b py-4 px-4">
                <CustomImage
                  imgSrc={business.businessImages[0]?.url}
                  alt={business.titleKor}
                  circle
                />
                <div>
                  <div className="flex items-end gap-2">
                    <div>{business.titleEng}</div>
                    <span className="text-sm font-medium text-gray-400">
                      {business.city}
                    </span>
                  </div>
                  <div className="line-clamp-2">{business.description}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BsChatText />
                    <div className="ml-1">{business.totalReview}</div>
                    <div className="mx-2">
                      <BsDot />
                    </div>
                    <BsStar />
                    <div className="ml-1">
                      <>{business.avgRating}</>
                      {/* {business.totalReview
                        ? business.totalRating / business.totalReview
                        : 0} */}
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
      businessImages: {
        select: {
          url: true,
        },
        orderBy: {
          sort: "asc",
        },
        take: 1,
      },
    },
    orderBy: [
      {
        avgRating: "desc",
      },
      {
        totalReview: "desc",
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

  console.log(businesses);
  return {
    props: {
      businesses: JSON.parse(JSON.stringify(businesses)),
    },
  };
};
