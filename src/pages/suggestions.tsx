import { API} from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from 'stream-chat-react';
import Link from 'next/link';
import Image from 'next/image';
import { selectRoomList } from '@/lib/store/rooms';
import RoomInfoModal from '@/components/ui/modals/RoomInfoModal';
import Footer from '@/components/layout/Footer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListRoomSuggestionsQuery, RoomSuggestion } from '@/types';
import { listRoomSuggestions } from '@/graphql/queries';

const Suggestions = () => {
	const list = useSelector(selectRoomList);
	const [suggestions, setSuggestions] = useState<RoomSuggestion[]>([]);
	const [nextToken, setNextToken] = useState<string | undefined | null>();
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		hasMore && loadSuggestions();
	}, [])

	const loadSuggestions = async () => {
		try {
			const res = await API.graphql<GraphQLQuery<ListRoomSuggestionsQuery>>({
				query: listRoomSuggestions,
				variables: {
					nextToken: nextToken
				}
			});

			if (res) {
				const list =  res.data?.listRoomSuggestions?.items as RoomSuggestion[] ?? [];

				setSuggestions([
					...suggestions,
					...list
				]);
				if (!res.data?.listRoomSuggestions?.nextToken) {
					setHasMore(false);
				}
				setNextToken(res.data?.listRoomSuggestions?.nextToken);
			}
		} catch(e) {
			setHasMore(false);
			console.error(e);
		}
	}

	const getRoomName = useCallback((roomId: string) => {
		let room = list.find((item) => item.channel.id == roomId);
		return room?.channel.name ?? 'Deleted Room';
	}, [list])

	return  (
		<>
			<div className="container  mx-auto px-2">
				<div className="flex flex-wrap">
					<div className="flex items-center py-4 w-full">
						<div className="w-full">
							<div className="">
								<div className="flex flex-wrap justify-between">
									<div className="items-center ">
										<h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Suggestions</h1>
										<ol className="list-reset flex text-sm">
											<li><Link href="#" className="text-gray-500">Doceo</Link></li>
											{/* <li><span className="text-gray-500 mx-2">/</span></li>
											<li className="text-blue-600 hover:text-blue-700">Rooms</li> */}
										</ol>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-2 min-h-[calc(100vh-138px)] relative pb-14">
				<div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-8">
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
				</div>

				<div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
					{ suggestions.map((suggestion, index) => (
						<div className='col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4' key={index}>
							<div className="card">
								<div className="card-body">
									<h3 className="block mb-3 text-[20px] font-semibold tracking-tight text-gray-800 dark:text-white">{ getRoomName(suggestion.roomId) }</h3>
									<p className="font-normal text-gray-500 text-sm dark:text-gray-400">{ suggestion.suggestion }</p>
								</div>
							</div>
						</div>
					)) }
                    
					{/* { list.map((room, index) => (
						<div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4" key={index}>
							<Room room={room} />
						</div>
					)) } */}
				</div>
				<InfiniteScroll
					style={{overflow: 'unset'}}
					dataLength={suggestions.length}
					next={loadSuggestions}
					hasMore={hasMore}
					loader={<div className='flex justify-center'><LoadingIndicator size={36} /></div>}
				>
				</InfiniteScroll>
				<Footer />
			</div>

			<RoomInfoModal />
		</>
	)
}

Suggestions.authenticate = true;

export default Suggestions;
