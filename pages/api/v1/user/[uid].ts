import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.json({ sucess: "hello" });
  }
};
export default handler;
