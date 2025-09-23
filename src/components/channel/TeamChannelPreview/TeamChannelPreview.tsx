import { Avatar, ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react';

import type { TeamChatGenerics } from '@/types';
import { MouseEventHandler } from 'react';
import { RemoveChannel } from '@/assets/icons/RemoveChannel';
import { DefaultGenerics } from 'stream-chat';

type Props = ChannelPreviewUIComponentProps<DefaultGenerics> & {
	setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
};

export const TeamChannelPreview: React.FC<Props> = (props) => {
	const { channel, setActiveChannel, setIsCreating, setIsEditing, type } = props;

	const { channel: activeChannel, client } = useChatContext<TeamChatGenerics>();

	const removeChannel: MouseEventHandler = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (window.confirm('Are you sure want to delete this channel?')) {
			try {
				await activeChannel?.delete();
			} catch (e) {
				window.alert('Error occurred');
			}
		}
	}

	const ChannelPreview = () => (
		<>
			<p className='channel-preview__item text-justify'>
				{'#' + (channel?.data?.name || channel?.data?.id || 'random')}
				{channel?.id === activeChannel?.id && <a className='inline-block float-right text-white ml-auto mr-2' href="#" onClick={removeChannel}><RemoveChannel /></a>}
			</p>
		</>
	);

	return (
		<div
			className={
				channel?.id === activeChannel?.id
					? 'channel-preview__wrapper__selected'
					: 'channel-preview__wrapper'
			}
			onClick={() => {
				setIsCreating(false);
				setIsEditing(false);
				if (setActiveChannel) {
					setActiveChannel(channel);
				}
			}}
		>
			<ChannelPreview />
		</div>
	);
};
