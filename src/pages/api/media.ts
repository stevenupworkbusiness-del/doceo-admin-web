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
      case "PUT":
        {
          const { foreign_id, time, text } = req.body;
          await client.activityPartialUpdate({
            foreign_id: foreign_id,
            time: time,
            set: {
              message: text,
            },
          });
        }
        break;
      case "POST":
      default:
        {
          const { user_id, text, room } = req.body;
          const userFeed = client.feed("media", user_id);

          await userFeed.addActivity({
            actor: client.user(user_id).ref(),
            verb: "media",
            foreign_id: `${user_id}:media:${Date.now()}`,
            time: new Date().toISOString(),
            object: `admin:media:id`,
            room,
            to: [`room_media:${room}`],
            message: text,
          });
        }
        break;
    }

    return res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};

export default handler;
