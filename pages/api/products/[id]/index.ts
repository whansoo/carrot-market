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
   
   const product = await client.product.findUnique({
    where: {
        id: Number(id),
    },
    include: {
        user: {
            select: {
                id: true,
                name: true,
                avatar: true,
            }
        }
    }
   });
   
   const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    }
  })
  const isLiked = Boolean(
    await client.fav.findFirst({
    where: {
      productId: product?.id,
      userId: user?.id
    },
    select: {
      id: true,
    }
  })
  );
  res.json({ok: true, product, isLiked, relatedProducts})
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);