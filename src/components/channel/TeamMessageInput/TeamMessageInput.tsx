import { useCallback, useContext, useState, useEffect } from 'react';
import { ImageDropzone } from 'react-file-utils';
import {
	AttachmentPreviewList,
	ChatAutoComplete,
	EmojiPicker,
	MessageInputProps,
	UploadsPreview,
	useChannelStateContext,
	useChatContext,
	useMessageInputContext,
} from 'stream-chat-react';

import { TeamTypingIndicator } from '../TeamTypingIndicator/TeamTypingIndicator';

import { GiphyContext } from '../ChannelContainer/ChannelInner';

import {
	BoldIcon,
	CodeSnippet,
	ItalicsIcon,
	LightningBoltSmall,
	SendButton,
	SmileyFace,
	StrikeThroughIcon,
} from '@/assets/icons';

import type { TeamChatGenerics } from '@/types';

export type Props = MessageInputProps & {
	pinsOpen?: boolean;
};

export const TeamMessageInput: React.FC<Props> = (props) => {
	const { pinsOpen } = props;

	const { giphyState, setGiphyState } = useContext(GiphyContext);

	const {
		acceptedFiles,
		channel,
		maxNumberOfFiles,
		multipleUploads,
		thread,
	} = useChannelStateContext<TeamChatGenerics>();

	const { client } = useChatContext<TeamChatGenerics>();

	const [boldState, setBoldState] = useState(false);
	const [codeState, setCodeState] = useState(false);
	const [italicState, setItalicState] = useState(false);
	const [strikeThroughState, setStrikeThroughState] = useState(false);

	const resetIconState = () => {
		setBoldState(false);
		setCodeState(false);
		setItalicState(false);
		setStrikeThroughState(false);
	};

	const getPlaceholder = () => {
		return `#${channel?.data?.name || channel?.data?.id || 'random'}`;
	};

	const messageInput = useMessageInputContext<TeamChatGenerics>();

	const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
		(event) => {
			const { value } = event.target;

			const deletePressed =
				event.nativeEvent instanceof InputEvent &&
					event.nativeEvent.inputType === 'deleteContentBackward'
					? true
					: false;

			if (messageInput.text.length === 1 && deletePressed) {
				setGiphyState(false);
			}

			if (!giphyState && messageInput.text.startsWith('/giphy') && !messageInput.numberOfUploads) {
				event.target.value = value.replace('/giphy', '');
				setGiphyState(true);
			}

			if (boldState) {
				if (deletePressed) {
					event.target.value = `${value.slice(0, value.length - 2)}**`;
				} else {
					event.target.value = `**${value.replace(/\**/g, '')}**`;
				}
			} else if (codeState) {
				if (deletePressed) {
					event.target.value = `${value.slice(0, value.length - 1)}\``;
				} else {
					event.target.value = `\`${value.replace(/`/g, '')}\``;
				}
			} else if (italicState) {
				if (deletePressed) {
					event.target.value = `${value.slice(0, value.length - 1)}*`;
				} else {
					event.target.value = `*${value.replace(/\*/g, '')}*`;
				}
			} else if (strikeThroughState) {
				if (deletePressed) {
					event.target.value = `${value.slice(0, value.length - 2)}~~`;
				} else {
					event.target.value = `~~${value.replace(/~~/g, '')}~~`;
				}
			}

			messageInput.handleChange(event);
		},
		[
			boldState,
			codeState,
			giphyState,
			italicState,
			messageInput,
			setGiphyState,
			strikeThroughState,
		],
	);

	// Add event listener to handle Enter key behavior and Ctrl/Cmd+Enter for sending
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.target instanceof HTMLTextAreaElement) {
				const textarea = event.target;
				const messageInputWrapper = textarea.closest('.team-message-input__wrapper');
				if (messageInputWrapper) {
					if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
						event.preventDefault();
						event.stopPropagation();
						messageInput.handleSubmit(event as any);
						return;
					}

					if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
						event.preventDefault();
						event.stopPropagation();

						const { selectionStart, selectionEnd } = textarea;
						const currentValue = textarea.value;

						const newValue =
							currentValue.slice(0, selectionStart) +
							'\n' +
							currentValue.slice(selectionEnd);

						textarea.value = newValue;

						const newCursorPosition = selectionStart + 1;
						textarea.setSelectionRange(newCursorPosition, newCursorPosition);

						const inputEvent = new Event('input', { bubbles: true });
						Object.defineProperty(inputEvent, 'target', { value: textarea });
						Object.defineProperty(inputEvent, 'currentTarget', { value: textarea });

						onChange(inputEvent as unknown as React.ChangeEvent<HTMLTextAreaElement>);
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown, true);

		return () => {
			document.removeEventListener('keydown', handleKeyDown, true);
		};
	}, [messageInput, onChange]);

	const GiphyIcon = () => (
		<div className='giphy-icon__wrapper'>
			<LightningBoltSmall />
			<p className='giphy-icon__text'>GIPHY</p>
		</div>
	);

	return (
		<div className={`team-message-input__wrapper ${(!!thread || pinsOpen) && 'thread-open'}`}>
			<ImageDropzone
				accept={acceptedFiles}
				handleFiles={messageInput.uploadNewFiles}
				multiple={multipleUploads}
				disabled={
					(maxNumberOfFiles !== undefined && messageInput.numberOfUploads >= maxNumberOfFiles) ||
					giphyState
				}
			>
				<div className='team-message-input__input'>
					<div className='team-message-input__top'>
						{giphyState && !messageInput.numberOfUploads && <GiphyIcon />}
						<AttachmentPreviewList />
						{/* <UploadsPreview /> */}
						<div className="team-message-input__form">
							<ChatAutoComplete onChange={onChange} placeholder={`Message ${getPlaceholder()}`} />
							<div
								className='team-message-input__button'
								role='button'
								aria-roledescription='button'
								onClick={messageInput.handleSubmit}
							>
								<SendButton />
							</div>
						</div>
					</div>
					<div className='team-message-input__bottom'>
						<div className='team-message-input__icons'>
							<SmileyFace openEmojiPicker={messageInput.openEmojiPicker} />
							<div className='icon-divider'></div>
							<BoldIcon {...{ boldState, resetIconState, setBoldState }} />
							<ItalicsIcon {...{ italicState, resetIconState, setItalicState }} />
							<StrikeThroughIcon
								{...{
									resetIconState,
									strikeThroughState,
									setStrikeThroughState,
								}}
							/>
							<CodeSnippet {...{ codeState, resetIconState, setCodeState }} />
						</div>
					</div>
				</div>
			</ImageDropzone>
			<TeamTypingIndicator type='input' />
			<EmojiPicker />
		</div>
	);
};
