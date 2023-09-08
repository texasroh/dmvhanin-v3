import { businessQuery } from "@/libs/server/business";
import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: { businessToken, pageParam },
    } = req;
    const reviews = await businessQuery.getReviews(businessToken + "");
    res.json({ success: true, reviews });
  } else if (req.method === "POST") {
    if (!req.session.user) {
      return res.status(403).end();
    }
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
export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler, isPrivate: false })
);
