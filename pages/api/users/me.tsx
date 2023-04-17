import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@components/libs/server/withSession";



async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  
 console.log(req.session.user);
 const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
 });
 res.json({
    ok: true,
    profile,
 });
}

export default withApiSession(withHandler({ method:"GET", handler}));