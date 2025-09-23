import { useChannelActionContext, useChannelStateContext, Message } from 'stream-chat-react';

import type { TeamChatGenerics } from '@/types';

import { CloseThreadIcon } from '@/assets/icons';

type Props = {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PinnedMessageList: React.FC<Props> = (props) => {
	const { setPinsOpen } = props;

	const { closeThread } = useChannelActionContext<TeamChatGenerics>();

	const { channel } = useChannelStateContext<TeamChatGenerics>();

	return (
		<div className='pinned-messages__container'>
			<div className='pinned-messages__header'>
				<p className='pinned-messages__header-text'>Pins</p>
				<CloseThreadIcon {...{ closeThread, setPinsOpen }} />
			</div>
			<div className='pinned-messages__list'>
				{channel.state.pinnedMessages.map((message) => (
					<Message
						groupStyles={['single']}
						// Message={MessageTeam}
						key={message.id}
						message={message}
					/>
				))}
			</div>
		</div>
	);
};
