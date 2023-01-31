import { useRouter } from "next/router";
import client from "@/libs/server/client";
import { NextPageContext } from "next";
import { Business, BusinessImage } from "@prisma/client";

interface BusinessWithImages extends Business {
  businessImages: BusinessImage[];
}
interface ICategoryIndexProps {
  businesses: BusinessWithImages[];
}

const CategoryIndex = ({ businesses }: ICategoryIndexProps) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div>
      <h1>{category}</h1>
      <div>
        {businesses.map((business) => (
          <div>
            {business.titleEng} {business.businessImages[0]?.url}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIndex;

export const getServerSideProps = async ({ req, res }: NextPageContext) => {
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
    take: 20,
    skip: 0,
  });

  return {
    props: {
      businesses: JSON.parse(JSON.stringify(businesses)),
    },
  };
};
