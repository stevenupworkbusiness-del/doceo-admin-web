import Footer from "@/components/layout/Footer";
import { selectFeedToken, selectRoomList } from "@/lib/store/rooms";
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react";
import "react-activity-feed/dist/index.css";
import { useSelector } from "react-redux";
import { StreamApp, FlatFeed, StatusUpdateForm, DefaultUT, LoadMorePaginator, InfiniteScrollPaginator, } from 'react-activity-feed';
import { LoadingIndicator as DefaultLoadingIndicator } from 'react-file-utils';
import axios, { AxiosResponse } from 'axios';
import Post from "@/components/ui/Post";
import { ActivityType } from '@/types';
import PostsFilterModal from "@/components/ui/modals/PostsFileterModal";
import { useRouter } from "next/router";
import { Activity, EnrichedActivity, EnrichedUser, ReactionAPIResponse, UR } from "getstream";
import { selectTagsList } from "@/lib/store/tags";
import { useAuth } from "@/lib/hooks/useAuth";
import Question from "@/components/ui/Question";

const Questions = () => {
	const [token, setToken] = useState('');
	const currentUser = useAuth();

	useEffect(() => {
		const getToken = async () => {
			try {
				const { data } = await axios.post('/api/token', {
					user_id: 'all'
				});

				setToken(data.token);
			} catch (e) {
				console.error(e);
			}
		}

		if (currentUser) getToken();
	}, [currentUser]);

	const onDeleteReactionRequest = async (id: string) => {
		console.log('Here delete');

		return axios.post<any, { data: ReactionAPIResponse }>('/api/reaction-delete', {
			id: id
		}).then(({ data: user }) => {
			return Promise.resolve(user);
		}).catch((e) => {
			return Promise.reject(e);
		});
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
										<h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">QA Exchange</h1>
										<ol className="list-reset flex text-sm">
											<li><Link href="#" className="text-gray-500">Doceo</Link></li>
											<li><span className="text-gray-500 mx-2">/</span></li>
											<li className="text-blue-600 hover:text-blue-700">QA Exchange</li>
										</ol>
									</div>
									<div className="flex items-center">
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
									<div className="absolute inset-0 h-40 rounded bg-[url(/assets/images/banner-2.jpg)] flex items-center justify-center cursor-pointer">
										<h1 className='absolute text-4xxl text-white'>Questions</h1>
										<Image src="/assets/images/banner.jpg" alt="banner" className="w-full h-full object-cover" width={684} height={346} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
					{token && <StreamApp
						apiKey={process.env.NEXT_PUBLIC_STREAM_KEY as string}
						appId={process.env.NEXT_PUBLIC_STREAM_APP as string}
						token={token}
					>
						{/* <StatusUpdateForm /> */}
						<FlatFeed<DefaultUT, ActivityType>
							feedGroup="question"
							userId="all"
							notify
							options={{
								limit: 12,
								withRecentReactions: true
							}}
							doReactionDeleteRequest={onDeleteReactionRequest}
							LoadingIndicator={(loadingIndicatorProps) => (
								<div className="col-span-12">
									<DefaultLoadingIndicator
										{...loadingIndicatorProps}
									/>
								</div>
							)}
							Paginator={(loadmorePaginatorProps) => {
								return (
									<LoadMorePaginator
										{...loadmorePaginatorProps}
										LoadMoreButton={({ onClick, refreshing = false, children, className, style }) => (
											<div className="col-span-12 flex justify-center">
												<div className={`raf-load-more-button ${className}`} style={style}>
													<button className="raf-button raf-button--info" onClick={onClick} disabled={refreshing}>
														{refreshing ? <DefaultLoadingIndicator backgroundColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.4)" /> : 'Load More'}
													</button>
												</div>
											</div>
										)}
									/>
								)
							}
							}
							Activity={(activityProps) => {
								return (
									<div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
										<Question
											{...activityProps}
										/>
									</div>
								)
							}}
						/>
					</StreamApp>}
				</div>

				<Footer />
			</div>
		</>
	)
}

Questions.authenticate = true;

export default Questions;
