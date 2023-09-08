import { userQuery } from "@/libs/server/user";
import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      body: {
        user: { uid, displayName, photoURL, email },
      },
    } = req;
    const user = await userQuery.loginUser(uid, displayName, photoURL, email);
    const userInfo = {
      id: user.id,
      photoURL: user.photoURL,
      displayName: user.displayName,
      businessOwner: user.businessOwner,
    };
    req.session.user = {
      id: user.id,
      uid: user.uid,
    };
    await req.session.save();

    res.json({ success: true, userInfo });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
