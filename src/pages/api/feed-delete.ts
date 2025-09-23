import { connect } from 'getstream';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = connect(process.env.NEXT_PUBLIC_STREAM_KEY as string, process.env.NEXT_PUBLIC_STREAM_SECRET as string, process.env.NEXT_PUBLIC_STREAM_APP);
	try {
		const { activity_id, user_id, slug = 'user' } = req.body;
		const userFeed = client.feed(slug, user_id);
		const delRes = await userFeed.removeActivity(activity_id);

		return res.status(200).json(delRes);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export default handler;