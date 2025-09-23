import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ConnectionOpen, DefaultGenerics, OwnUserResponse, StreamChat, UserResponse } from 'stream-chat';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { selectUserToken } from '../store/rooms';
import { TeamChatGenerics } from '@/types';
import axios from 'axios';

export type GetstreamState = StreamChat<TeamChatGenerics> | null;

interface AdminInfo {
	id: string,
	name: string,
	introduction: string,
	image: string,
}

export interface GetStreamContext {
	adminInfo: AdminInfo,
	updateAdminInfo: (params: any) => void,
	client: StreamChat<TeamChatGenerics>
}

const GetstreamContext = createContext<GetStreamContext | null>(null);

async function setCustomizedAdminInfo(res: any, setAdminInfo: any, adminId: any) {
	try {
		setAdminInfo(
			{
				id: adminId,
				name: res.me?.name as string ?? '',
				introduction: res.me?.introduction as string ?? '',
				image: res.me?.image as string ?? 'https://doctor-thumbnail.s3.ap-northeast-1.amazonaws.com/%E5%8C%BB%E5%B8%AB%E7%94%BB%E5%83%8F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%EF%BC%88%E3%82%B5%E3%82%A4%E3%82%B9%E3%82%99%E8%AA%BF%E6%95%B4%E6%B8%88%E3%81%BF%EF%BC%89/%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88/Defalt_Doctor_Icon_Gray.png',
			}
		);
		await axios.post('/api/profile', {
			userData: {
				id: adminId,
				name: res.me?.name as string ?? '',
				introduction: res.me?.introduction as string ?? '',
				role: 'admin',
				avatar: res.me?.image as string ?? 'https://doctor-thumbnail.s3.ap-northeast-1.amazonaws.com/%E5%8C%BB%E5%B8%AB%E7%94%BB%E5%83%8F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%EF%BC%88%E3%82%B5%E3%82%A4%E3%82%B9%E3%82%99%E8%AA%BF%E6%95%B4%E6%B8%88%E3%81%BF%EF%BC%89/%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88/Defalt_Doctor_Icon_Gray.png'
			}
		});
	} catch (err) {
		console.log({ err });
	}
}

export const GetstreamProvider: React.FC<any> = (props: any) => {
	const [chatClient, setChatClient] = useState<GetstreamState>(null);
	const userToken = useSelector(selectUserToken);
	const currentUser = useAuth();
	const [adminInfo, setAdminInfo] = useState<AdminInfo>();

	useEffect(() => {
		if (!currentUser || !userToken) {
			return;
		}

		const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY as string, {
			enableInsights: true,
			enableWSFallback: true,
		});

		// Under some circumstances, a "connectUser" operation might be interrupted
		// (fast user switching, react strict-mode in dev). With this flag, we control
		// whether a "disconnectUser" operation has been requested before we
		// provide a new StreamChat instance to the consumers of this hook.
		let didUserConnectInterrupt = false;
		const connectUser = client
			.connectUser({
				id: currentUser.attributes?.sub
			}, userToken)
			.catch((e) => {
				console.error(`Failed to connect user`, e);
			})
			.then((res: ConnectionOpen<DefaultGenerics>) => {
				if (!didUserConnectInterrupt) {
					setChatClient(client);
				}
				if (res?.me) {
					setCustomizedAdminInfo(res, setAdminInfo, currentUser.attributes?.sub);
				}
			});

		return () => {
			didUserConnectInterrupt = true;
			// there might be a pending "connectUser" operation, wait for it to finish
			// before executing the "disconnectUser" in order to prevent race-conditions.
			connectUser.then(() => {
				setChatClient(null);
				client.disconnectUser().catch((e) => {
					console.error(`Failed to disconnect user`, e);
				});
			});
		};
	}, [userToken, currentUser]);

	const updateAdminInfo = async (params: any) => {
		try {
			const variables: OwnUserResponse<TeamChatGenerics> | UserResponse<TeamChatGenerics> =
				{ id: currentUser?.attributes?.sub, role: 'admin', ...params }
			const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY as string, {
				enableInsights: true,
				enableWSFallback: true,
			});
			const res = await client
				.connectUser(
					variables
					, userToken);
			setCustomizedAdminInfo(res, setAdminInfo, currentUser?.attributes?.sub);
		} catch (err) {
			console.error(`Failed to connect user`, err);
		}
	}

	const client = useMemo(() => {
		return { client: chatClient, adminInfo, updateAdminInfo }
	}, [chatClient, adminInfo])

	return (
		<GetstreamContext.Provider value={client} {...props} />
	)
}

export const useChatClient = () => {
	const context = useContext(GetstreamContext);

	return context;
}
