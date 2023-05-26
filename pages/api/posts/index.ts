import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
import { withApiSession } from "@components/libs/server/withSession";



async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
   

      if (req.method === "POST") {
        const {
          body: { question, latitude, longitude },
          session: { user },
        } = req;
        const post = await client.post.create({
          data: {
            question,
            latitude,
            longitude,
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
        const {
          query: { latitude, longitude },
        } = req;
        const parsedLatitude = latitude? parseFloat(latitude.toString() ) : undefined;
        const parsedLongitue = longitude? parseFloat(longitude.toString()) : undefined;
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
          where: {
            latitude: {
              gte: parsedLatitude? parsedLatitude - 0.01 : undefined,
              lte: parsedLatitude? parsedLatitude + 0.01 : undefined,
            },
            longitude: {
              gte: parsedLongitue? parsedLongitue - 0.01 : undefined,
              lte: parsedLongitue? parsedLongitue + 0.01 : undefined,
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