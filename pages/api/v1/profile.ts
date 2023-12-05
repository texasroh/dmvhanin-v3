import { profileQuery } from "@/libs/server/profile";
import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    session: { user },
    body,
  } = req;

  if (!user?.id) return res.status(403).end();

  await profileQuery.patchProfile(user.id, body);

  return res.status(200).end();
};

export default withApiSession(
  withHandler({
    methods: ["PATCH"],
    handler,
  })
);
