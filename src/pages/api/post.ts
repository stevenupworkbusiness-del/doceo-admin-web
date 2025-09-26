import { connect } from 'getstream';
import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = connect(process.env.NEXT_PUBLIC_STREAM_KEY as string, process.env.NEXT_PUBLIC_STREAM_SECRET as string, process.env.NEXT_PUBLIC_STREAM_APP);
	try {
		const { user_id, room, type, text, attachment = '', survey, choices, period } = req.body;
		const userFeed = client.feed('user', user_id);
		let targets = [],
			until;

		if (room == '') {
			targets.push('user:all');
		} else {
			targets.push(`room:${room}`);
		}

		if (type == 'qa') {
			targets.push(`room_qa:${room}`);
		}

		if (period == '3days') {
			until = moment().add(3, 'days');
		} else if (period == 'week') {
			until = moment().add(1, 'week');
		} else if (period == 'month') {
			until = moment().add(1, 'month');
		}

		await userFeed.addActivity({
			actor: client.user(user_id).ref(),
			verb: type,
			foreign_id: `${user_id}:${type}:${Date.now()}`,
			object: `admin:${type}:id`,
			room,
			to: targets,
			message: text,
			filePath: attachment,
			fileType: attachment ? 'image' : '',
			survey,
			choices: JSON.stringify(choices),
			period: until?.format()
		})

		return res.status(200).json({});
	} catch (e) {
		console.error(e);
		res.status(500).json(e);
	}
}

export default handler;