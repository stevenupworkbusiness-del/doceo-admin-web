import {connect} from 'getstream';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = connect(process.env.NEXT_PUBLIC_STREAM_KEY as string, process.env.NEXT_PUBLIC_STREAM_SECRET as string, process.env.NEXT_PUBLIC_STREAM_APP);
	try {
		const userIds = req.body.userIds;
		let temp: Record<string, Object> = {};
		for(let i = 0; i < userIds.length; i++) {
			const userId = userIds[i];
			const timeline = client.feed('timeline', userId);
			const user  = client.feed('user', userId);

			const following = await timeline.followStats({
				followingSlugs: ['user']
			});
			const follower = await user.followStats({
				followerSlugs: ['timeline']
			});

			temp[userId] = {
				follower: follower.results.followers.count,
				following: following.results.following.count
			}
		}

		return res.status(200).json({
			followStatus: temp
		});
	} catch(e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export default handler;