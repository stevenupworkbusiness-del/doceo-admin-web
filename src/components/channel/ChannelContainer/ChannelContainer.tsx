import { useState } from 'react';
import { Channel, useChatContext, ThreadHeaderProps } from 'stream-chat-react';

import { ChannelInner } from './ChannelInner';
import { ChannelEmptyState } from '../ChannelEmptyState/ChannelEmptyState';
import { CreateChannel } from '../CreateChannel/CreateChannel';
import { EditChannel } from '../EditChannel/EditChannel';
import { TeamMessageInput } from '../TeamMessageInput/TeamMessageInput';

import { CloseThreadIcon } from '@/assets/icons';

import type { ChannelFilters } from 'stream-chat';

import type { TeamChatGenerics } from '@/types';

type Props = {
  createType: string;
  isCreating: boolean;
  isEditing?: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

type HeaderProps = ThreadHeaderProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreadHeader: React.FC<HeaderProps> = (props) => {
	const { closeThread, setPinsOpen, thread } = props;

	const getReplyCount = () => {
		if (!thread?.reply_count) return '';
		if (thread.reply_count === 1) return '1 reply';
		return `${thread.reply_count} Replies`;
	};

	return (
		<div className='custom-thread-header'>
			<div className='custom-thread-header__left'>
				<p className='custom-thread-header__left-title'>Thread</p>
				<p className='custom-thread-header__left-count'>{getReplyCount()}</p>
			</div>
			<CloseThreadIcon {...{ closeThread, setPinsOpen }} />
		</div>
	);
};

export const ChannelContainer: React.FC<Props> = (props) => {
	const { createType, isCreating, isEditing, setIsCreating, setIsEditing } = props;

	const { channel } = useChatContext<TeamChatGenerics>();

	const [pinsOpen, setPinsOpen] = useState(false);

	if (isCreating) {
		const filters: ChannelFilters[] = [];

		return (
			<div className='channel__container'>
				<CreateChannel {...{ createType, filters, setIsCreating, channel}} />
			</div>
		);
	}

	if (isEditing) {
		const filters: ChannelFilters[] = [];

		if (channel?.state?.members) {
			const channelMembers = Object.keys(channel.state.members);
			if (channelMembers.length) {
				// @ts-expect-error
				filters.id = { $nin: channelMembers };
			}
		}

		return (
			<div className='channel__container'>
				<EditChannel {...{ filters, setIsEditing }} />
			</div>
		);
	}

	return (
		<div className='channel__container bg-white'>
			<Channel
				EmptyStateIndicator={ChannelEmptyState}
				Input={TeamMessageInput}
				// Message={TeamMessage}
				ThreadHeader={(threadProps) => <ThreadHeader {...threadProps} {...{ setPinsOpen }} />}
				TypingIndicator={() => null}
			>
				<ChannelInner
					{...{
						pinsOpen,
						setIsEditing,
						setPinsOpen,
					}}
				/>
			</Channel>
		</div>
	);
};
