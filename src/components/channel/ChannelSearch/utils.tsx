import type { Channel, ChannelFilters, UserResponse, StreamChat } from 'stream-chat';

import type { TeamChatGenerics } from '@/types';

export type ChannelOrUserType =
  | Channel<TeamChatGenerics>
  | UserResponse<TeamChatGenerics>;

export const isChannel = (
	channel: ChannelOrUserType,
): channel is Channel<TeamChatGenerics> =>
	(channel as Channel<TeamChatGenerics>).cid !== undefined;

type Props = {
  client: StreamChat<TeamChatGenerics>;
  setActiveChannel: (
    newChannel?: Channel<TeamChatGenerics>,
    watchers?: {
      limit?: number;
      offset?: number;
    },
    event?: React.SyntheticEvent,
  ) => void;
  user: UserResponse<TeamChatGenerics>;
};

export const channelByUser = async (props: Props) => {
	const { client, setActiveChannel, user } = props;

	const filters: ChannelFilters = {
		type: 'messaging',
		member_count: 2,
		members: { $eq: [user.id as string, client.userID || ''] },
	};

	const [existingChannel] = await client.queryChannels(filters);

	if (existingChannel) {
		return setActiveChannel(existingChannel);
	}

	const newChannel = client.channel('messaging', {
		members: [user.id as string, client.userID || ''],
	});
	return setActiveChannel(newChannel);
};
