import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.status(201).end();
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
