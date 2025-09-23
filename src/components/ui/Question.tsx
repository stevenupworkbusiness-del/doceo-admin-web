import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, type EnrichedUser } from 'getstream';
import { type ActivityProps, type DefaultUT, Gallery, CommentField, LikeButton, CommentList, ReactionToggleIcon, useStreamContext, useFeedContext, DefaultAT } from 'react-activity-feed';
import { TbDots, TbAlertTriangle, TbMessages, TbHeart, TbCircleCheck, TbChartBar, TbThumbUp } from 'react-icons/tb';
import Image from 'next/image';
import { getAvatarText, getFormattedDate, getUserAge } from '@/utils';
import { ActivityType } from '@/types'
import Dropdown from '@/components/ui/Dropdown';
import { useSelector } from 'react-redux';
import { selectTagsList } from '@/lib/store/tags';
import { selectRoomList } from '@/lib/store/rooms';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '@/lib/hooks/useAuth';
import CommentsModal from './modals/CommentsModal';

const Question: React.FC<ActivityProps<DefaultUT, ActivityType>> = ({ activity, feedGroup, userId, ...props }) => {
	// console.log(activity, props);
	const user = activity.actor as EnrichedUser;
	const { feedManager } = useFeedContext();
	const [showComments, toggleComments] = useState(false);
	const commentsCount = activity.reaction_counts ? (activity.reaction_counts['comment'] ?? 0) : 0;
	console.log(activity.message);

	const onDeletePost = async () => {
		if (window.confirm('Are you sure you want to remove this post?')) {
			try {
				const { data: res } = await axios.post('/api/feed-delete', {
					slug: 'question',
					user_id: user.id,
					activity_id: activity.id
				})
				feedManager.onRemoveActivity(res.removed);
			} catch (e) {
				console.error(e);
			}
		}
	}

	return (
		<>
			<div className="card h-full">
				<div className={"card-body flex flex-col h-full" + (activity.verb == 'qa' && activity.reaction_counts && !activity.reaction_counts['answer'] ? ' bg-blue-200' : '') + (activity.reaction_counts && activity.reaction_counts['report'] ? ' bg-[#ffe5da]' : '')}>
					<div className='flex items-center mb-2.5'>
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
						<h5 className="font-medium ml-2 mt-0 dark:text-slate-200">{user.data.name as string}</h5>
						<span className='text-sm ml-5'>{getFormattedDate(activity.time)}</span>
						<button className='text-slate-400 ml-auto' onClick={onDeletePost}>
							<TbDots className='text-xl' />
						</button>
					</div>
					<div className="text-slate-400 mb-2.5 whitespace-pre-wrap">
						{activity.message}
					</div>
					<div className="flex justify-between mt-auto">
						<div className="flex -space-x-4 items-center">
						</div>
						<ul className="mb-0 self-center flex items-center">
							<li className="inline-block">
								<button style={{ color: commentsCount ? '#69E4BF' : '' }} onClick={() => toggleComments(true)}>{commentsCount} Answered</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{showComments && <CommentsModal activity={activity} onHideModal={() => toggleComments(false)} />}
		</>
	)
}

export default Question;