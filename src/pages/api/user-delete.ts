
import { StreamChat } from 'stream-chat';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY as string, process.env.NEXT_PUBLIC_STREAM_SECRET as string);
	try {
		const { user_id } = req.body;
		const delRes = await client.deleteUser(user_id);

		return res.status(200).json(delRes);
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export default handler;