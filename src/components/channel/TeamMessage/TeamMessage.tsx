import React from 'react';
import { Attachment, Avatar, MessageOptions, MessageRepliesCountButton, MessageStatus, MessageText, MessageTimestamp, MessageUIComponentProps, ReactionSelector, ReactionsList, useMessageContext } from 'stream-chat-react';

type Props = MessageUIComponentProps & {
  setPinsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamMessage: React.FC<Props> = (props) => {

	const {
		message,
	} = useMessageContext();


	return (
		<div className={message.pinned ? 'pinned-message' : 'unpinned-message'}>
			<div>
				<MessageStatus />
				<Avatar />
				<div>
					<MessageOptions />
					<div>
						<ReactionsList />
						<ReactionSelector />
					</div>
					<div>
						{ message.attachments && <Attachment attachments={message.attachments} /> }
						<MessageText />
						{/* <MML source={ message. } /> */}
					</div>
					<MessageRepliesCountButton />
					<div>
						<MessageTimestamp />
					</div>
				</div>
			</div>
		</div>
	);
};
