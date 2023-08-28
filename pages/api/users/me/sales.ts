import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
import { withApiSession } from "@components/libs/server/withSession";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    const {
      session: { user },
    } = req;
  
    const sales = await client.sale.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        product: {
          include: {
            _count: {
              select: {
                favs: true,
              }
            }
          }
        },
      },
    });
    res.json({
      ok: true,
      sales,
    });
  }
  
  export default withApiSession(
    withHandler({
      methods: ["GET"],
      handler,
    })
  );