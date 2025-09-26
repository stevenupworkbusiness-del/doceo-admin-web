import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { selectUserToken } from '../../lib/store/rooms';
import NumberTile from '@/components/dashboard/NumberTile/NumberTile';
import { StreamChat, DefaultGenerics, Channel } from 'stream-chat';
import { sumUpMessages } from '@/utils';
import { Messages } from '@/types';

/**
 * A hook which handles the process of connecting/disconnecting a user
 * to the Stream Chat backend.
 *
 * @param userToConnect the user information.
 * @param userTokenOrProvider the user's token.
 */

const width = typeof window !== "undefined" ? window.innerWidth : 1200;
const height = typeof window !== "undefined" ? window.innerHeight : 900;

interface Styles {
	container: React.CSSProperties;
	filterContainer: React.CSSProperties;
	filterButton: React.CSSProperties;
	roomSelectMenu: React.CSSProperties;
	roomSearch: React.CSSProperties;
	userNumberContainer: React.CSSProperties;
	numberTilesContainer: React.CSSProperties;
	titleAndNumberContainer: React.CSSProperties;
	questionsAnalysisContainer: React.CSSProperties;
	answerAnalysisContainer: React.CSSProperties;
	introducingLetterAnalysisContainer: React.CSSProperties;
	personalConsultAnalysisContainer: React.CSSProperties;
}

const styles: Styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '0.5%',
	},
	filterContainer: {
		width: '85%',
		marginBottom: '0.5%',
	},
	filterButton: {
		display: 'flex',
		width: '15%',
		backgroundColor: '#DDDDDD',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	roomSelectMenu: {
		width: '15%',
	},
	roomSearch: {
		borderRadius: 3,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#111111',
	},
	userNumberContainer: {
		width: '85%',
	},
	numberTilesContainer: {
		display: 'flex',
		width: '50%',
	},
	titleAndNumberContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginRight: '2%',
	},
	questionsAnalysisContainer: {
		width: '85%',
	},
	answerAnalysisContainer: {
		width: '85%',
	},
	introducingLetterAnalysisContainer: {
		width: '85%',
	},
	personalConsultAnalysisContainer: {
		width: '85%',
	},
}

const Dashboard = () => {
	const ref = useRef(null);
	const [showMenu, toggleMenu] = useState(false);
	const [selectedRoom, toggleSelectedRoom] = useState('Total');
	const [chatClient, setChatClient] = useState<StreamChat<DefaultGenerics> | null>(null);
	const userToken = useSelector(selectUserToken);
	const currentUser = useAuth();

	const [channels, setChannels] = useState<Channel<DefaultGenerics>[]>([]);
	const [messages, setMessages] = useState<Messages | null>(null);

	useEffect(() => {
		if ( !currentUser || !userToken) {
			return;
		}

		const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_KEY as string, {
			enableInsights: true,
			enableWSFallback: true,
		});

		// Get all channels
		let didUserConnectInterrupt = false;
		const connectUser = client.connectUser({id: currentUser?.attributes.sub}, userToken)
			.catch((e) => {
				console.error('Failed to connect user', e);
			})
			.then(() => {
				console.log('connected');
				if (!didUserConnectInterrupt) {
					setChatClient(client);
				}
			})

		const getChannels = async () => {
			const response = await client.queryChannels({ type: 'channel-2' });
			setChannels(response);
		};

		getChannels();
	}, [currentUser, userToken]);

	// query Messages
	useEffect(() => {
		channels.forEach((value) => {
			const channel = chatClient?.channel('channel-2', value.id);
			const getMessages = async (channelID: string) => {
				await channel?.query({
					messages: { limit: 100 },
				})
					.then(response => {
						let newMessages = messages;
						if (newMessages == null) {
							newMessages = {};
						}
						newMessages[channelID] = response.messages;

						setMessages(newMessages);
					})
					.catch(error => {
						console.log('error: ', error);
					});
			}
			getMessages(value.id as string);
		})
	}, [channels, chatClient]);

	// test
	useEffect(() => {
		console.log('messages: ', messages);
		if (messages !== null) {
			sumUpMessages(messages);
		}
	}, [messages]);

	const onToggleMenu = () => {
		toggleMenu(!showMenu);
	}

	return (
		<>
			<div style={styles.container}>
				<div style={styles.filterContainer}>
					<h2>
						{"<Filter>"}
					</h2>
					<button
						onClick={onToggleMenu}
						type="button"
						style={styles.filterButton}
					>
						<div>
							<span className="font-medium text-gray-600 dark:text-gray-300 uppercase">{selectedRoom}</span>
						</div>
					</button>
					<div
						ref={ref}
						className={"dropdown-menu dropdown-menu-left z-50 my-1 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800" + ( showMenu ? '' : ' hidden' ) }
						style={styles.roomSelectMenu}
					>
						<div className="py-3 px-4">
							<span
								className="block text-sm font-medium text-gray-900 dark:text-white"
								style={styles.roomSearch}
							>Search...</span>
						</div>
						<ul className="py-1">
							<li onClick={() => {
								toggleSelectedRoom('Room1');
								onToggleMenu();
							}}>
								<Link
									href="/dashboard"
									className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
								>Room1</Link>
							</li>
							<li onClick={() => {
								toggleSelectedRoom('Room2');
								onToggleMenu();
							}}>
								<Link
									href="/dashboard"
									className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
								>Room2</Link>
							</li>
							<li onClick={() => {
								toggleSelectedRoom('Room3');
								onToggleMenu();
							}}>
								<Link
									href="/dashboard"
									className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
								>Room3</Link>
							</li>
							<li onClick={() => {
								toggleSelectedRoom('Room4');
								onToggleMenu();
							}}>
								<Link
									href="/dashboard"
									className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
								>Room4</Link>
							</li>
							<li onClick={() => {
								toggleSelectedRoom('Room5');
								onToggleMenu();
							}}>
								<Link
									href="/dashboard"
									className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
								>Room5</Link>
							</li>
						</ul>
					</div>
				</div>

				<div style={styles.userNumberContainer}>
					<div style={styles.numberTilesContainer}>
						<div style={styles.titleAndNumberContainer}>
							<h1>Number of Users</h1>
							<NumberTile number={50} />
						</div>
						<div style={styles.titleAndNumberContainer}>
							<h2>New Users in this Month</h2>
							<NumberTile number={10} />
						</div>
					</div>
					<Image
						src='/assets/images/graphImages/NumberOfUsers.png'
						alt="graph image for the number of users"
						width={width * 0.5}
						height={height * 0.2}
					/>
				</div>

				<div style={styles.questionsAnalysisContainer}>
					<h1>{"<About Questions>"}</h1>
					<h2>Questions / Users in past 30 days</h2>
					<NumberTile number={sumUpMessages(messages as Messages)} />
					<Image
						src="/assets/images/graphImages/QuestionsAndusers.png"
						alt="graph image for the number of questions"
						width={width * 0.5}
						height={height * 0.2}
					/>
				</div>

				<div style={styles.answerAnalysisContainer}>
					{"<About Answers>"}
					<h2>Answered Ratio % in last 7 days</h2>
					<h2 style={{color: "#00AAFF"}}>the details of questions not answered →</h2>
					<NumberTile number={0.78} index />
					<Image
						src="/assets/images/graphImages/AnsweredRatio.png"
						alt="graph image for Answered Ratio"
						width={width * 0.5}
						height={height * 0.2}
					/>
				</div>

				<div style={styles.introducingLetterAnalysisContainer}>
					<h1>{"<About Introducing Letters>"}</h1>
					<h1>Introduction Letter Usage in last 30 days</h1>
					<NumberTile number={0.4} index />
					<Image
						src="/assets/images/graphImages/IntroductionLetterUsage.png"
						alt="graph image for Introduction Letter Usage"
						width={width * 0.5}
						height={height * 0.2}
					/>
				</div>

				<div style={styles.personalConsultAnalysisContainer}>
					<h1>{"<About Personal Consulting>"}</h1>
					<h1>Personal Consult Usage in last 30 days</h1>
					<NumberTile number={0.25} index />
					<Image
						src="/assets/images/graphImages/PersonalConsultUsage.png"
						alt="graph image for Personal Consult Usage"
						width={width * 0.5}
						height={height * 0.2}
					/>
				</div>
			</div>
		</>
	)
}

Dashboard.authenticate = true;

export default Dashboard;
