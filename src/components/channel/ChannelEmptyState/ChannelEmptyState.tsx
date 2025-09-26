import { useChatContext } from 'stream-chat-react';

import { HashIcon } from '@/assets/icons';

import type { TeamChatGenerics } from '@/types';

export const ChannelEmptyState = () => {
	const { channel } = useChatContext<TeamChatGenerics>();

	return (
		<div className='channel-empty__container'>
			<HashIcon />
			<p className='channel-empty__first'>
				This is the beginning of your chat history in {`#${channel?.data?.name || channel?.data?.id}`}.
			</p>
			<p className='channel-empty__second'>Send messages, attachments, links, emojis, and more.</p>
		</div>
	);
};
