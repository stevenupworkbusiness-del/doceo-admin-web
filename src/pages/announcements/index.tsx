import Footer from '@/components/layout/Footer';
import AnnouncementModal from '@/components/ui/modals/AnnouncementModal';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TeamChatGenerics } from '@/types';
import { Chat, Channel, MessageList, useMessageContext, MessageUIComponentProps, Attachment } from 'stream-chat-react';
import { useChatClient } from '@/lib/getstream/context';
import { getFormattedDate } from '@/utils';
import { TbTrash } from 'react-icons/tb';

const AnnouncementMessage: React.FC<MessageUIComponentProps<TeamChatGenerics>> = () => {
	const { message, handleDelete } = useMessageContext();

	const onDelete = (e: React.BaseSyntheticEvent) => {
		if (window.confirm('Are you sure you want to delete this message?')) {
			handleDelete(e);
		}
	}

	return (
		<div className="border border-gray-200 bg-gray-700 px-8 py-2 dark:bg-slate-800 text-white flex justify-between items-center" >
			<p>
				{message.type == 'deleted' ? 'This mesage was deleted.' : message.text}
				{message.attachments && <Attachment attachments={message.attachments} />}
			</p>
			<div className='flex items-center'>
				<span>{getFormattedDate(message.created_at!)}</span>
				<button className='ml-2.5' onClick={onDelete}><TbTrash /></button>
			</div>
		</div>
	)
}

const Announcements = () => {
	const [showModal, toggleModal] = useState(false);
	const [data, setData] = useState<any[]>([]);
	const chatClient = useChatClient()?.client;

	useEffect(() => {
		// getNotifications();
	}, [])

	const onHideModal = (newData?: any) => {
		newData && setData([
			...data,
			newData
		]);

		toggleModal(false);
	}

	return (
		<>
			<div className="container  mx-auto px-2">
				<div className="flex flex-wrap">
					<div className="flex items-center py-4 w-full">
						<div className="w-full">
							<div className="">
								<div className="flex flex-wrap justify-between">
									<div className="items-center ">
										<h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Notifications</h1>
										<ol className="list-reset flex text-sm">
											<li><Link href="#" className="text-gray-500">Doceo</Link></li>
											<li><span className="text-gray-500 mx-2">/</span></li>
											<li className="text-blue-600 hover:text-blue-700">Notifications</li>
										</ol>
									</div>
									<div className="flex items-center">
										<button onClick={() => { toggleModal(true) }} className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600">Create New</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-2 min-h-[calc(100vh-138px)] relative pb-14">
				{/* <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-8">
					<div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
						<div className="card shadow-none bg-transparent">
							<div className="card-body p-0">
								<div className="h-40 relative p-4 rounded overflow-hidden">
									<div className="absolute inset-0 h-40 rounded">
										<Image src="/assets/images/banner.jpg" alt="banner" className="w-full h-full object-cover" width={684} height={346} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}

				<div className="mb-4">

					{chatClient && <Chat client={chatClient!} theme={`team light`}>
						<Channel
							channel={chatClient!.channel('announcement', 'all')}
							DateSeparator={() => (<></>)}
							MessageListNotifications={() => (<></>)}
						>
							<MessageList Message={AnnouncementMessage}></MessageList>
						</Channel>
					</Chat>
					}
					{/* <table className="min-h-[300px] w-full border-collapse">
						<tbody>
							{
								loading ? <tr><td colSpan={2}><Spinner size={40} /></td></tr> :
									data.map((item, index) => (
										<tr key={index} className="border border-gray-200 bg-gray-700 px-8 py-2 dark:bg-slate-800 text-white flex justify-between items-center" >
											<td>{item.text}</td><td><button onClick={() => resend(item)}>Resend</button> {item.createdAt}</td></tr>
									))
							}
						</tbody>
					</table> */}
				</div>

				<Footer />
			</div>

			<AnnouncementModal showModal={showModal} onHideModal={onHideModal} />
		</>
	);
}

Announcements.authenticate = true;

export default Announcements;