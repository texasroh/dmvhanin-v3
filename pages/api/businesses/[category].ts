import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";

const PERPAGE = 20;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { category },
  } = req;

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

  let page;
  try {
    if ("page" in req.query && typeof req.query.page === "string") {
      page = parseInt(req.query.page);
      if (page > totalPage) {
        page = totalPage;
      }
    }
  } catch {
    page = 1;
  }

  const businesses = await client.business.findMany({
    select: {
      titleKor: true,
      titleEng: true,
      uuid: true,
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
    where: {
      businessSubcategory: {
        businessCategory: {
          key: category + "",
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
    take: PERPAGE,
    skip: PERPAGE * (page ? page - 1 : 1),
  });

  res.json({ page, businesses, totalResult, totalPage });
};
