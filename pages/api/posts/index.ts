import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
import { withApiSession } from "@components/libs/server/withSession";



async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        body: { question },
        session: { user },
      } = req;

    const post = await client.post.create({
        data: {
          question,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
 res.json({
    ok: true,
    post,
 });
}

export default withApiSession(withHandler({ methods:["POST"], handler}));