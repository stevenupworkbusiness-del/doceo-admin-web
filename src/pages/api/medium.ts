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
      case "PUT": {
        const { reaction_id, data } = req.body;
        let updateRes = await client.reactions.update(reaction_id, data);
        return res.status(200).json(updateRes);
      }
      case "POST":
      default: {
        const { activity_id, user_id, data } = req.body;
        let addRes = await client.reactions.add("items", activity_id, data, {
          userId: user_id,
        });

        return res.status(200).json(addRes);
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};

export default handler;
