
import React, { useCallback, useMemo, useState } from 'react';
import { type EnrichedUser } from 'getstream';
import { type ActivityProps, type DefaultUT, Gallery, LikeButton, useFeedContext, } from 'react-activity-feed';
import { TbDots, TbMessages, TbChartBar, TbFile } from 'react-icons/tb';
import Image from 'next/image';
import { getAvatarText, getFormattedDate } from '@/utils';
import { ActivityType } from '@/types'
import { useSelector } from 'react-redux';
import { selectTagsList } from '@/lib/store/tags';
import { selectRoomList } from '@/lib/store/rooms';
import axios from 'axios';
import moment from 'moment';
import CommentsModal from './modals/CommentsModal';

const Post: React.FC<ActivityProps<DefaultUT, ActivityType>> = ({ activity, feedGroup, userId, ...props }) => {
	// console.log(activity, props);
	const user = activity.actor as EnrichedUser;
	const { feedManager } = useFeedContext();
	const rooms = useSelector(selectRoomList);
	const tags = useSelector(selectTagsList);
	const [showComments, toggleComments] = useState(false);

	const onDeletePost = async () => {
		if (window.confirm('Are you sure you want to remove this post?')) {
			try {
				const { data: res } = await axios.post('/api/feed-delete', {
					user_id: user.id,
					activity_id: activity.id
				})
				feedManager.onRemoveActivity(res.removed);
			} catch (e) {
				console.error(e);
			}
		}
	}

	const getTagName = (id: string) => {
		const tag = tags.find(tag => tag.id === id);
		return tag ? tag.name : ''
	}

	const room = useMemo(() => {
		if (activity.room) {
			return rooms.find((room) => room['channel']['id'] === activity.room);
		}
		return null;
	}, [rooms, activity])

	const getPercentage = useCallback((index: number) => {
		let total = 0, choices = JSON.parse(activity.choices), count = 0;
		total = choices.reduce((acc: number, _: string, id: number) => {
			let cnt = (activity.reaction_counts && activity.reaction_counts['choice_' + (id + 1)]) ?? 0;
			if (index == id) count = cnt;
			return acc + cnt;
		}, 0);

		return count * total == 0 ? 0 : (count / total) * 100;
	}, [activity]);

	function getFilenameFromUrl(url: string) {
		const urlObj = new URL(url);
		const pathname = urlObj.pathname;

		// Get last part of the pathname as it will be the filename
		// Decode the URI component to handle special characters if any
		return decodeURIComponent(pathname.substring(pathname.lastIndexOf('/') + 1));
	  }


	return (
		<>
			<div className="card h-full">
				<div className={"card-body flex flex-col h-full" + (activity.verb == 'qa' && activity.reaction_counts && !activity.reaction_counts['answer'] ? ' bg-blue-200' : '') + (activity.reaction_counts && activity.reaction_counts['report'] ? ' bg-[#ffe5da]' : '')}>
					<div className='flex items-center mb-2.5'>
						<div className='relative'>
						{(activity.actor as EnrichedUser).data.avatar ? <Image
							className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
							src={user.data.avatar as string}
							alt="Avatar"
							width={40}
							height={40}
						/>
							: <div className='relative inline-flex items-center justify-center w-10 h-10 border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
								<span className="font-medium text-gray-600 dark:text-gray-300 uppercase">{getAvatarText(user.data.name as string)}</span>
							</div>}
							{ activity.verb == 'symptom' && <Image className='absolute bottom-0 right-0' src={'/assets/images/emo_' + activity.emotion + '.svg'} alt="emo" width={14} height={14} /> }
						</div>
						<h5 className="font-medium ml-2 mt-0 dark:text-slate-200">{user.data.name as string}</h5>
						<span className='text-sm ml-5'>{getFormattedDate(activity.time)}{activity.usertag && ' . ' +  (getTagName(activity.usertag) ? getTagName(activity.usertag) : 'Unknown')}</span>
						<button className='text-slate-400 ml-auto' onClick={onDeletePost}>
							<TbDots className='text-xl' />
						</button>
					</div>
					{/* {activity.verb === 'diary' && (
						<div className="flex items-center mb-2.5"><TbCircleCheck className='mr-2.5' color='#4F5660' size="21" /> {getReasonText(activity.reason)} / {activity.usertag && getTagName(activity.usertag) ? getTagName(activity.usertag) : 'Unknown'}</div>)
					} */}
					<div className="text-slate-400 mb-2.5">
						<p dangerouslySetInnerHTML={{ __html: activity.message }}>
						</p>
						{activity.verb === 'symptom' && activity.drug &&
							<div className='flex flex-wrap items-center mt-[5px] mx-[-5px]'>
									<div className="bg-zinc-100 rounded-2xl py-[6px] px-[13px] flex items-center m-[5px]">
										<Image src="/assets/images/medicine-icon.svg" alt="Hospital" width={20} height={21} />
										<div className=" text-gray-400 font-medium ml-2">{activity.drug}</div>
									</div>
							</div>
						}
						{activity.verb === 'diary' && (room || activity.hospital || activity.doctorName) &&
							<div className='flex flex-wrap items-center mt-[5px] mx-[-5px]'>
								{activity.hospital &&
									<div className="bg-zinc-100 rounded-2xl py-[6px] px-[13px] flex items-center m-[5px]">
										<Image src="/assets/images/hospital-gray.svg" alt="Hospital" width={20} height={21} />
										<div className=" text-gray-400 font-medium ml-2">{activity.hospital}</div>
									</div>
								}
								{activity.doctorName &&
									<div className="bg-zinc-100 rounded-2xl py-[6px] px-[13px] flex items-center m-[5px]">
										<Image src={activity.doctorIcon ? activity.doctorIcon : "/assets/images/select-doctor.svg"} alt={activity.doctorName} width={19} height={19} />
										<div className=" text-gray-400 font-medium ml-2">{activity.doctorName}</div>
									</div>
								}
								{
									room &&
									<div className="bg-zinc-100 rounded-2xl py-[6px] px-[13px] flex items-center m-[5px]">
										<Image src={room['channel']['image'] ? room['channel']['image'] : "/assets/images/room-icon1.png"} alt='room' width={23} height={23} />
										<div className=" text-gray-400 font-medium ml-2">{room['channel']['name']}</div>
									</div>
								}
							</div>
						}
						{/* { activity.usertag &&
						<span className='mr-1 mb-1 text-blue-500 font-medium text-sm italic' >#{getTagName(activity.usertag) ? getTagName(activity.usertag) : 'Unknown' }</span>
					} */}
					</div>
					{
						activity.filePath &&
						(activity.fileType == 'pdf' ? <a className='flex items-center text-sm' href={activity.filePath}><TbFile className='text-lg' /> {getFilenameFromUrl(activity.filePath)}</a> : <Gallery
							className="border-2 rounded border-slate-200 mb-2.5"
							images={[activity.filePath]}
						/>)
					}
					{ activity.attachments && activity.attachments.length > 0 && <Gallery
							className="border-2 rounded border-slate-200 mb-2.5"
							images={activity.attachments!} /> }
					{activity.verb == 'survey' &&
						<>
							<div className='flex items-center mt-5 mb-4'>
								<TbChartBar className='text-slate-400 mr-2' />
								<h6 className='text-sm text-slate-400'>{activity.survey}</h6>
							</div>
							{JSON.parse(activity.choices).map((choice: string, index: number) => (
								<div className="relative w-full bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5" key={index}>
									<div className="bg-gray-400 text-xs font-medium text-blue-100 text-center leading-none rounded-md h-11" style={{ width: getPercentage(index) + '%' }}></div>
									<div className='absolute left-4 right-4 -translate-y-1/2 top-1/2 text-justify'>{choice} <span className='float-right'>{(activity.reaction_counts && activity.reaction_counts['choice_' + (index + 1)]) ?? 0}</span></div>
								</div>
							))}
							<div className='mb-5 text-slate-400 text-sm'>
								{new Date(activity.period).getTime() > Date.now() ? `Until: ${moment(activity.period).format('MM/DD')}` : 'Voting closed'}
							</div>
						</>
					}
					{activity.verb == 'qa' && activity.latest_reactions && activity.latest_reactions['answer'] ?
						<div className='bg-gray-200 rounded-md p-4 dark:bg-gray-700 mb-2.5 mt-5 text-sm'>
							<p className='mb-2.5'>{activity.latest_reactions['answer'][0].data.text as string}</p>
							<div className='flex items-center text-gray-400'>
								<span className='mr-auto'>{getFormattedDate(activity.latest_reactions['answer'][0].created_at)}</span>
								<Image
									className="w-5 h-5 rounded-full mr-2"
									src={activity.latest_reactions['answer'][0].user!.data.avatar as string}
									alt="Avatar"
									width={20}
									height={20}
								/>
								{activity.latest_reactions['answer'][0].user!.data.lastName as string}医師
							</div>
						</div> : <></>}
					<div className="flex justify-between mt-auto">
						<div className="flex -space-x-4 items-center">
						</div>
						<ul className="mb-0 self-center flex items-center">
							<li className="inline-block mr-4">
								<button onClick={() => toggleComments(true)}><TbMessages className="text-xl inline-block mr-2" />{activity.reaction_counts ? (activity.reaction_counts['comment'] ?? 0) : 0}</button>
							</li>
							<li className="inline-block">
								<LikeButton
									activity={activity}
									className='custom-reaction'
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{showComments && <CommentsModal activity={activity} onHideModal={() => toggleComments(false)} />}
		</>
	)
}

export default Post;