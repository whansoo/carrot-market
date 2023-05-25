import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@components/libs/server/withHandler";
import client from "@components/libs/server/client";
import { withApiSession } from "@components/libs/server/withSession";




async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    const {
      query: { id },
      session: { user },
      body: { answer },
    } = req;
  
    const newAnswer = await client.answer.create({
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
        answer,
      },
    });
    console.log(newAnswer);
    res.json({
      ok: true,
      answer: newAnswer,
    });
  }
  
  export default withApiSession(
    withHandler({
      methods: ["POST"],
      handler,
    })
  );