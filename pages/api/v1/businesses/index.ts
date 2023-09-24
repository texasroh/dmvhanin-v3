import { businessQuery } from "@/libs/server/business";
import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { data },
  } = req;

  if (!req.session.user) {
    return res.status(403).end();
  }

  await businessQuery.postBusiness(
    req.session.user.uid,
    data.titleKor,
    data.titleEng,
    data.subcategory,
    data.description,
    data.address,
    data.city,
    data.state,
    data.zipcode,
    data.phone,
    data.email,
    data.website
  );

  return res.status(201).end();
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
