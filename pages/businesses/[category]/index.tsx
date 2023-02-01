import { useRouter } from "next/router";
import client from "@/libs/server/client";
import { NextPageContext } from "next";
import { Business, BusinessImage } from "@prisma/client";
import { categories } from "..";
import { useEffect } from "react";
import Image from "next/image";

interface BusinessWithImages extends Business {
  businessImages: BusinessImage[];
}
interface ICategoryIndexProps {
  businesses: BusinessWithImages[];
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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {businesses.map((business) => (
          <div className="border p-2">
            <Image src={business.businessImages[0]?.url} alt={business.uuid} />
            {business.titleEng} {business.businessImages[0]?.url}
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

  return {
    props: {
      businesses: JSON.parse(JSON.stringify(businesses)),
    },
  };
};
