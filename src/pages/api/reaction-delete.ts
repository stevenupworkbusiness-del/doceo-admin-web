import { connect } from 'getstream';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = connect(process.env.NEXT_PUBLIC_STREAM_KEY as string, process.env.NEXT_PUBLIC_STREAM_SECRET as string, process.env.NEXT_PUBLIC_STREAM_APP);
    try {
        const { id } = req.body;

        let removeRes = await client.reactions.delete(id);
        return res.status(200).json(removeRes);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}

export default handler;