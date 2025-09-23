import React from 'react';

import { AddChannel } from '@/assets/icons';
import { CHANNEL_TYPE_TITLE } from '@/lib/constants/gestream';

import type { ChannelListMessengerProps } from 'stream-chat-react';
import { DefaultGenerics } from 'stream-chat';

export type TeamChannelListProps = ChannelListMessengerProps<DefaultGenerics> & {
	setCreateType: React.Dispatch<React.SetStateAction<string>>;
	setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	type: string;
};

const ChannelList: React.FC<TeamChannelListProps & { children?: React.ReactNode }> = (props) => {
	const {
		children,
		error = false,
		loading,
		setCreateType,
		setIsCreating,
		setIsEditing,
		type,
	} = props;

	if (error) {
		return (
			<div className='team-channel-list'>
				<p className='team-channel-list__message'>
					Connection error, please wait a moment and try again.
				</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className='team-channel-list'>
				<p className='team-channel-list__message loading'>
					Channels loading....
				</p>
			</div>
		);
	}

	return (
		<div className='team-channel-list'>
			<div className='team-channel-list__header'>
				<p className='team-channel-list__header__title'>
					{CHANNEL_TYPE_TITLE[type]}
				</p>
				<AddChannel
					{...{ setCreateType, setIsCreating, setIsEditing }}
					type={type}
				/>
			</div>
			<div className='team-channel-list__body'>
				{children}
			</div>
		</div>

	);
};

export const TeamChannelList = React.memo(ChannelList);
