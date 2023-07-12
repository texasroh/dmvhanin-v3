import { BUSINESS_PER_PAGE } from "@/constants/numbers";
import { businessQuery } from "@/libs/server/business";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { category, page },
  } = req;

  const totalResult = await businessQuery.getTotalBusinessCount(category + "");
  const totalPage = Math.ceil(totalResult / BUSINESS_PER_PAGE);

  let pageInt;
  try {
    pageInt = parseInt(page + "");
    if (pageInt > totalPage) {
      pageInt = totalPage;
    }
  } catch {
    pageInt = 1;
  }

  const businesses = await businessQuery.getBusinesses(category + "", pageInt);

  res.json({ page: pageInt, businesses, totalResult, totalPage });
};
