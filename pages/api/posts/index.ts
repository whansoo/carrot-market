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

      if (req.method === "POST") {
        
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
      if (req.method === "GET") {
      
       
        const posts = await client.post.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                wondering: true,
                answers: true,
              },
            },
          },
        });
        res.json({
          ok: true,
          posts,
        });
      }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler}));