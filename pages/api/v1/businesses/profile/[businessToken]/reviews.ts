import { businessQuery } from "@/libs/server/business";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: { businessToken, pageParam },
    } = req;
    const reviews = await businessQuery.getReviews(businessToken + "", 2);
    res.json({ success: true, reviews });
  } else if (req.method === "POST") {
    const {
      body: { uid, rawContent, rating },
      query: { businessToken },
    } = req;
    try {
      const review = await businessQuery.postBusinessReview(
        uid,
        businessToken + "",
        rawContent,
        rating
      );
      res.json({ success: true, review });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
};
export default handler;
