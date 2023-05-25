import { NextApiRequest, NextApiResponse } from "next";
import client from "@components/libs/server/client";
import { withApiSession } from "@components/libs/server/withSession";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import products from ".";



async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
   const { query: {id}, session: {user} } = req;
  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: id? +id.toString() : undefined,
      userId: user?.id
    },
  });
  if(alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: id? +id.toString() : undefined,
          }
        }
      },
    });
  }
  res.json({ok: true})
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);