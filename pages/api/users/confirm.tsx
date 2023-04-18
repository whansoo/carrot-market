import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@components/libs/server/withSession";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  
  const { token } = req.body;
  const exists = await client.token.findUnique({where: {
    payload: token,
  },
 });
 if (!exists) return res.status(404).end();
 req.session.user = {
  id: exists.userId,
 }
 await req.session.save();
 await client.token.deleteMany({
  where: {
    userId: exists.userId,
  }
 })
  res.json({ ok: true });
}

export default withApiSession(withHandler({methods:["POST"], handler, isPrivate: false}));