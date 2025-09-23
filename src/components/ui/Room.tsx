import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { MdOutlineComment, MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import { ChannelDetail } from '@/types';
import { getAvatarText } from '@/utils';
import { roomsActions } from '@/lib/store/rooms';
import { useChatClient } from '@/lib/getstream/context';
import { TbFiles, TbUser } from 'react-icons/tb';
import { Channel, ChannelMemberResponse } from 'stream-chat';
import { Member } from '@/models';
import { Auth, API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { StreamChat } from 'stream-chat';
import { CreateUserToken } from '@/graphql/queries';

type RoomProps = {
	room: ChannelDetail
}

const Room: React.FC<RoomProps> = ({ room }) => {
	const dispatch = useDispatch();
	const chatClient = useChatClient()?.client;
	const [channel, setChannel] = useState<Channel>();
	const [feedsCount, setFeedsCount] = useState<number | undefined>();
	const [membersCount, setMembersCount] = useState<number | undefined>();
	const [doctors, setDoctors] = useState<ChannelMemberResponse[] | (Member | null)[]>(room.members.filter((member) => member?.user?.role === 'doctor'));
	const [recordingSettings, setRecordingSettings] = useState({
		showRecordButton: true,
		interface: "vas",
		dailyLimit: 1,
		sprintLimit: 0,
		showSprintGraph: false,
		maxEffectValue: 5,
		minText: "",
		maxText: "",
		recordingHintText: "",
		sprintHintText: "",
		sprintGuidelines: "",
		guidanceVideo: "",
		guidanceAgreement: "",
	});
	const [settingsLoading, setSettingsLoading] = useState(true);

	// useEffect(() => {
	// 	const fetchRecordingSettings = async () => {
	// 		if (!room?.channel?.id) return;
	// 		setSettingsLoading(true);
	// 		try {
	// 			const currentUser = await Auth.currentAuthenticatedUser();
	// 			const userID = currentUser.username || currentUser.attributes?.sub;
	// 			if (!userID) throw new Error("User ID not found in Amplify auth");
	// 			const createTokenResponse = (await API.graphql({
	// 				query: CreateUserToken,
	// 				variables: { id: userID },
	// 			})) as GraphQLResult<any>;
	// 			const token = createTokenResponse?.data?.CreateUserToken?.token;
	// 			if (!token) throw new Error("Failed to retrieve Stream token");
	// 			const client = new StreamChat(
	// 				process.env.NEXT_PUBLIC_STREAM_KEY as string,
	// 				{
	// 					enableInsights: true,
	// 					enableWSFallback: true,
	// 				}
	// 			);
	// 			await client.connectUser({ id: userID }, token);
	// 			const channel = client.channel("recording_settings", room.channel.id);
	// 			await channel.watch();
	// 			const data = channel.data || {};
	// 			console.log("data inside the Room.tsx : ", data);
	// 			setRecordingSettings({
	// 				showRecordButton:
	// 					typeof data.showRecordButton === "boolean"
	// 						? data.showRecordButton
	// 						: true,
	// 				interface:
	// 					typeof data.interface === "string" ? data.interface : "vas",
	// 				dailyLimit: typeof data.dailyLimit === "number" ? data.dailyLimit : 1,
	// 				sprintLimit:
	// 					typeof data.sprintLimit === "number" ? data.sprintLimit : 0,
	// 				showSprintGraph:
	// 					typeof data.showSprintGraph === "boolean"
	// 						? data.showSprintGraph
	// 						: false,
	// 				maxEffectValue:
	// 					typeof data.maxEffectValue === "number" ? data.maxEffectValue : 5,
	// 				minText: typeof data.minText === "string" ? data.minText : "",
	// 				maxText: typeof data.maxText === "string" ? data.maxText : "",
	// 				recordingHintText:
	// 					typeof data.recordingHintText === "string"
	// 						? data.recordingHintText
	// 						: "",
	// 				sprintHintText:
	// 					typeof data.sprintHintText === "string" ? data.sprintHintText : "",
	// 				sprintGuidelines:
	// 					typeof data.sprintGuidelines === "string"
	// 						? data.sprintGuidelines
	// 						: "",
	// 				guidanceVideo:
	// 					typeof data.guidanceVideo === "string" ? data.guidanceVideo : "",
	// 				guidanceAgreement:
	// 					typeof data.guidanceAgreement === "string"
	// 						? data.guidanceAgreement
	// 						: "",
	// 			});
	// 		} catch (error) {
	// 			console.error("Error fetching recording settings:", error);
	// 		} finally {
	// 			setSettingsLoading(false);
	// 		}
	// 	};
	// 	fetchRecordingSettings();
	// }, [room?.channel?.id]);

	// useEffect(() => {
	// 	if (chatClient && room) {
	// 		const chl = chatClient?.channel('room', room.channel.id);
	// 		setChannel(chl);
	// 		chl.watch().then(() => {
	// 			setFeedsCount(chl.state._channel.data?.['feedsCount'] as number);
	// 			setMembersCount(chl.state.members.length as number);
	// 			const doctorMembers = Object.values(chl.state.members)
	// 				.filter(member => member?.user?.role === 'doctor');
	// 			setDoctors(doctorMembers);
	// 		}).catch(error => {
	// 			console.error('Error watching channel:', error);
	// 		});
	// 	}
	// }, [chatClient, room])

	// const doctors = room.members.filter((member) => member?.user?.role === 'doctor');

	// const feedsCount = useMemo(() => {
	// 	console.log("update state", roomState);
	// 	return roomState?._channel.data!['feedsCount'] ?? (room.channel.feedsCount ?? 0);
	// }, [room, roomState]);
	// const membersCount = useMemo(() => {
	// 	return roomState?.members.length ?? (room?.members.length ?? 0);
	// }, [room, roomState]);

	const onEditRoom: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault();

		dispatch(roomsActions.selectRoom(room.channel.id as string));
		dispatch(roomsActions.toggleInfoModal(true));
	}

	const onDeleteRoom: MouseEventHandler<HTMLAnchorElement> = async (e) => {
		e.preventDefault();

		if (window.confirm("Are you sure that you want to delete this room?")) {
			try {
				let channel = chatClient?.channel('room', room.channel.id);

				let subChannels = await chatClient?.queryChannels({
					'room': room.channel.id
				});

				for (let i = 0; i < subChannels!.length; i++) {
					await subChannels![i].delete();
				}

				await channel?.delete();
				dispatch(roomsActions.deleteRoom(room.channel.id));
			} catch (err) {
				console.error(err);
			}
		}
	}

	return (
		<div className={"card h-full" + (room.channel.frozen ? ' bg-slate-600' : '')}>
			<div className="card-body">
				<div className='flex justify-between mb-2.5'>
					<h5 className="font-medium mt-0 dark:text-slate-200"><Link href={"/rooms/" + room.channel.id}>{room.channel.name}</Link></h5>
					<div className='text-slate-400'>
						<>
							<TbFiles className='inline-block text-xl' /> {feedsCount ?? (room.channel.feedsCount ?? 0)}
							<TbUser className="inline-block text-xl ml-2.5" /> {room?.members.length ?? 0}
						</>
					</div>
				</div>
				<p className="text-slate-400 mb-1">{room.channel.description}</p>
				<div className="flex justify-between mt-3">
					<div className="flex -space-x-4">
						{doctors.slice(0, 3).map((member, index) => (
							member?.user?.image ?
								<Image
									key={index}
									className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
									src={member?.user?.image as string}
									alt="Avatar"
									width={40}
									height={40}
								/>
								: <div className='relative inline-flex items-center justify-center w-10 h-10 border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600' key={index}>
									<span className="font-medium text-gray-600 dark:text-gray-300 uppercase">{getAvatarText(member?.user?.name as string)}</span>
								</div>
						))}
						{doctors.length > 3 && <a href="javascript:;" className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">+{doctors.length - 3}</a>}
					</div>
					<ul className="mb-0 self-center">
						{/* Loader and Recording ON/OFF icon */}
						{/* <li className="inline-block align-middle mr-2">
							{settingsLoading ? (
								<span className="inline-block align-middle animate-spin w-5 h-5 border-2 border-t-transparent border-red-500 rounded-full"></span>
							) : recordingSettings.showRecordButton ? (
								// Recording ON icon (red dot)
								<span title="Recording ON" className="inline-block align-middle">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="red" xmlns="http://www.w3.org/2000/svg">
										<circle cx="10" cy="10" r="8" />
									</svg>
								</span>
							) : (
								// Recording OFF icon (gray dot)
								<span title="Recording OFF" className="inline-block align-middle">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="#bbb" xmlns="http://www.w3.org/2000/svg">
										<circle cx="10" cy="10" r="8" />
									</svg>
								</span>
							)}
						</li> */}
						{
							!room.channel.disabled &&
							<li className="inline-block">
								<h4 className='mr-3 bg-[#0f0] rounded-[2rem] px-[1rem] py-[.25rem] text-center'>On</h4>
							</li>
						}
						<li className="inline-block">
							<a className="ml-2" href="#" onClick={onEditRoom}>
								<MdOutlineEdit className='inline-block text-slate-400 font-18' />
							</a>
						</li>
						<li className="inline-block">
							<a className="ml-2" href="#" onClick={onDeleteRoom}>
								<MdOutlineDelete className="inline-block text-slate-400 font-18" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Room;
