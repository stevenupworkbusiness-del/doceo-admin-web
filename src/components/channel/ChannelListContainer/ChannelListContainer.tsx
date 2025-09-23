import { ChannelList, ChannelListProps } from 'stream-chat-react';

import { ChannelSearch } from '../ChannelSearch/ChannelSearch';
import { TeamChannelList } from '../TeamChannelList/TeamChannelList';
import { TeamChannelPreview } from '../TeamChannelPreview/TeamChannelPreview';

import type { Channel, ChannelFilters } from 'stream-chat';
import { getAvatarText } from '@/utils';

type Props = Omit<ChannelListProps, 'filters'> & {
  setCreateType: React.Dispatch<React.SetStateAction<string>>;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  filters: ChannelFilters[];
  roomName: string;
  isCreating: boolean;
};

const SideBar: React.FC<Pick<Props, 'roomName'>> = ({ roomName }) => {


	return (
		<div className='channel-list__sidebar'>
			<div className='channel-list__sidebar__icon1'>
				<div className='icon1__inner'>
					<span className="font-medium text-gray-600 dark:text-gray-300 uppercase">{ getAvatarText(roomName) }</span>
				</div>
			</div>
		</div>
	)
};

const CompanyHeader: React.FC<Pick<Props, 'roomName'>> = ({ roomName }) => (
	<div className='channel-list__header'>
		<p className='channel-list__header__text'>{ roomName }</p>
	</div>
);

const customChannelTeamFilter = (channels: Channel[], type: string) => {
	return channels.filter((channel) => channel.type === type);
};

export const ChannelListContainer: React.FC<Props> = (props) => {
	const {  isCreating, filters, options, setCreateType, setIsCreating, setIsEditing, sort, roomName } = props;

	return (
		<div className='channel-list__container'>
			<SideBar roomName={roomName} />
			<div className='channel-list__list__wrapper'>
				<CompanyHeader roomName={roomName} />
				<ChannelSearch />
				{ filters.map((filter, index) => (
					<ChannelList
						key={index}
						channelRenderFilterFn={(channels) => customChannelTeamFilter(channels, filter.type as string)}
						filters={filter}
						options={options}
						sort={sort}
						setActiveChannelOnMount={!index}
						List={(listProps) => (
							<TeamChannelList
								{...listProps}
								{...{ setCreateType, setIsCreating, setIsEditing }}
								type={ filter.type as string }
							/>
						)}
						Preview={(previewProps) => (
							<TeamChannelPreview
								{...previewProps}
								{...{ setIsCreating, setIsEditing }}
								type={ filter.type as string }
							/>
						)}
					/>
				)) }
			</div>
		</div>
	);
};
