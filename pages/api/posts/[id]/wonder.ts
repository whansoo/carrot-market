import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import { withApiSession } from "@components/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@components/libs/server/client";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    const {
      query: { id },
      session: { user },
    } = req;
    const alreadyExists = await client.wondering.findFirst({
      where: {
        userId: user?.id,
        postId: id? +id.toString() : undefined,
      },
      select: {
        id: true,
      },
    });
    if (alreadyExists) {
      await client.wondering.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await client.wondering.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          post: {
            connect: {
              id: id? +id.toString() : undefined,
            },
          },
        },
      });
    }
    res.json({
      ok: true,
    });
  }
  
  export default withApiSession(
    withHandler({
      methods: ["POST"],
      handler,
    })
  );