import { connect } from 'getstream';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = connect(process.env.NEXT_PUBLIC_STREAM_KEY as string, process.env.NEXT_PUBLIC_STREAM_SECRET as string, process.env.NEXT_PUBLIC_STREAM_APP);
    try {
        const { activity_id, user_id, actor_id, data } = req.body;

        let addRes = await client.reactions.add('comment', activity_id, data, { userId: user_id, targetFeeds: [`notification_comment:${actor_id}`] });
        return res.status(200).json(addRes);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export default handler;