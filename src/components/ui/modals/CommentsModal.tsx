import React from 'react';
import Image from 'next/image';
import { CommentField, CommentList, useFeedContext } from 'react-activity-feed';
import { EnrichedActivity } from 'getstream';
import { getAvatarText, getFormattedDate } from '@/utils';
import { TbDots } from 'react-icons/tb';

type props = {
	activity: EnrichedActivity,
	onHideModal: Function
}

const CommentsModal: React.FC<props> = ({ activity, onHideModal }) => {
	const { feedManager } = useFeedContext();

	const hideModal = () => {
		onHideModal();
	}

	const onDeleteComment = (id: string) => {
		feedManager.onRemoveReaction('comment', activity as any, id);
	}

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center modal-xl modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Comment</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body  text-muted leading-relaxed">
							<div className='px-2.5'>
								<CommentList
									activityId={activity.id}
									CommentItem={({ comment }) => {
										return (
											<div className='mb-5 last:mb-0'>
												<div className='flex items-center mb-2.5'>
													{comment.user?.data.avatar ? <Image
														className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
														src={comment.user.data.avatar as string}
														alt="Avatar"
														width={40}
														height={40}
													/>
														: <div className='relative inline-flex items-center justify-center w-10 h-10 border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
															<span className="font-medium text-gray-600 dark:text-gray-300 uppercase">{getAvatarText(comment.user?.data.name as string)}{activity.verb == 'diary' ? '・診察レポート' : ''}</span>
														</div>}
													<div className='ml-2'>
														<h5 className="font-medium mt-0 dark:text-slate-200">{comment.user?.data.role == 'doctor' ? comment.user?.data.lastName + '医師' : comment.user?.data.name as string}</h5>
														<span className='text-sm'>{getFormattedDate(comment.created_at)}</span>
													</div>
													{<button className='text-slate-400 ml-auto' onClick={() => onDeleteComment(comment.id)} >
														<TbDots className='text-xl' />
													</button>}
												</div>
												<p className='pl-12'>
													{comment.data.text as string}
												</p>
												{comment.latest_children && comment.latest_children['comment'] && comment.latest_children['comment'].length > 0 && <p className='bg-gray-200 rounded-md p-4 dark:bg-gray-700 mt-2.5 text-sm ml-12'>
													<span className='text-blue-600'>{comment.latest_children['comment'][0].user?.data.role == 'doctor' ? comment.latest_children['comment'][0].user?.data.lastName + '医師' : comment.latest_children['comment'][0].user?.data.name as string}</span> : {comment.latest_children['comment'][0].data.text as string}
												</p>}
											</div>
										)
									}}
								/>
							</div>
						</div>
						{activity.verb != 'question' && <div className="modal-footer">
							<CommentField
								className='w-full'
								activity={activity as any}
							/>
						</div>}
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
		</>
	)
}

export default CommentsModal;