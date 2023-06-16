import client from "@/libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body: { uid, rawContent, reviewHTML },
      query: { businessToken },
    } = req;
    try {
      const review = await client.businessReview.create({
        data: {
          uid,
          rawContent,
          reviewHTML,
          business: {
            connect: {
              uuid: businessToken + "",
            },
          },
        },
      });
      res.json({ success: true, review });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
};
export default handler;
