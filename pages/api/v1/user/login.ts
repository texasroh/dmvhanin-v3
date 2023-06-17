import client from "@/libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body: {
        user: { uid, displayName, photoURL, email },
      },
    } = req;
    try {
      await client.user.upsert({
        where: {
          uid,
        },
        update: {
          lastLogin: new Date(),
        },
        create: {
          uid,
          displayName,
          photoURL,
          email,
        },
      });
      res.json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  }
};

export default handler;
