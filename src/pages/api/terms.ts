import { connect } from "getstream";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = connect(
    process.env.NEXT_PUBLIC_STREAM_KEY as string,
    process.env.NEXT_PUBLIC_STREAM_SECRET as string,
    process.env.NEXT_PUBLIC_STREAM_APP
  );
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        const terms = await client.collections.get("terms", "basic");
        return res.status(200).json(terms.data!.content);
      }
      case "POST": {
        const { terms } = req.body;
        try {
          await client.collections.add("terms", "basic", { content: terms });
        } catch (e) {
          await client.collections.update("terms", "basic", { content: terms });
        }
        return res.status(200).json("ok");
      }
      default:
        return res.status(405).end("Method Not Allowed");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};

export default handler;
