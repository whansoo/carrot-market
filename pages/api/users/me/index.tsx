import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
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

export default withApiSession(withHandler({ methods:["GET"], handler}));