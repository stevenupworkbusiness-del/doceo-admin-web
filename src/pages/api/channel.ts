import { StreamChat } from "stream-chat";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new StreamChat(
    process.env.NEXT_PUBLIC_STREAM_KEY as string,
    process.env.NEXT_PUBLIC_STREAM_SECRET as string
  );
  const { type, id, mode, clearImage, user_id, ...data } = req.body;
  try {
    if (mode == "new") {
      const channel = client.channel(type, id, data);
      const response = await channel.create();

      return res.status(200).json(response);
    } else {
      const channel = client.channel(type, id);
      await channel.watch();
      let published = false;
      if (channel.data?.frozen == true && data.frozen == false) {
        published = true;
      }
      const response = await channel.updatePartial({
        set: data,
        unset: clearImage ? ["image"] : [],
      });
      if (published) {
        await channel.sendEvent({
          // @ts-ignore
          type: "channel_published",
          text: "Room published",
          user_id: user_id,
        });
      }

      return res.status(200).json(response);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json("Error");
  }
};

export default handler;
