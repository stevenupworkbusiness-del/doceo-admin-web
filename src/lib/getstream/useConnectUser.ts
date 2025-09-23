import { useEffect, useState } from 'react';
import {
	DefaultGenerics,
	ExtendableGenerics,
	StreamChat,
} from 'stream-chat';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { selectUserToken } from '../store/rooms';

/**
 * A hook which handles the process of connecting/disconnecting a user
 * to the Stream Chat backend.
 *
 * @param userToConnect the user information.
 * @param userTokenOrProvider the user's token.
 */
export const useConnectUser = <SCG extends ExtendableGenerics = DefaultGenerics>() => {
	const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);
	const userToken = useSelector(selectUserToken);
	const currentUser = useAuth();

	useEffect(() => {
		if ( !currentUser || !userToken ) {
			return ;
		}

		console.log(currentUser, userToken);

		const client = new StreamChat<SCG>(process.env.NEXT_PUBLIC_STREAM_KEY as string, {
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
				id: currentUser.attributes.sub
			}, userToken)
			.catch((e) => {
				console.error(`Failed to connect user`, e);
			})
			.then(() => {
				console.log('connected');
				if (!didUserConnectInterrupt) {
					setChatClient(client);
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

	return chatClient;
};
