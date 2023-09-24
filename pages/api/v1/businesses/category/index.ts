import { categoryQuery } from "@/libs/server/category";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { sub },
  } = req;
  if (sub) {
    const subcategories = await categoryQuery.getSubcategory();
    res.json(subcategories);
  }
  res.status(400).end();
};

export default withHandler({
  methods: ["GET"],
  handler,
  isPrivate: false,
});
