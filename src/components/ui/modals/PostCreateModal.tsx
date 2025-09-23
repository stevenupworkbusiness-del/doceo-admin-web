import React, { KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { Formik, useFormik } from 'formik';
import { API, Storage } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { createTag } from '@/graphql/mutations';
import { CreateTagMutation } from '@/types';
import { useSelector } from 'react-redux';
import { selectOrderedCategoriesList } from '@/lib/store/categories';
import { selectRoomList } from '@/lib/store/rooms';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from '@/lib/hooks/useAuth';
import { TbX } from 'react-icons/tb';
import { resizeImage } from '@/utils';

type Props = {
	onHideModal: Function
}

const PostCreateModal: React.FC<Props> = ({ onHideModal }) => {
	const user = useAuth();
	const rooms = useSelector(selectRoomList);
	const ref = useRef({ room: '', type: '', text: '' });
	const [attachment, setAttachment] = useState<File>();
	const preview = useMemo(() => {
		if (attachment && attachment.type != 'application/pdf') {
			return URL.createObjectURL(attachment);
		}
		return '';
	}, [attachment]);
	const [step, setStep] = useState(1);

	const onSubmit = async (data: { room: String, type: String, text: String, survey: String, choices: String[], period: String }) => {
		try {
			let newAttachment;
			if (attachment) {
				Storage.configure({ region: 'ap-northeast-1', bucket: 'doceonewfb798f78a5bb417495ce5a866313554d214353-prod' });
				let res;
				if (attachment.type !== 'application/pdf') {
					const resized = await resizeImage(attachment, 500, 500);
					res = await Storage.put(attachment?.name, resized, { level: 'public' });
				} else {
					res = await Storage.put(attachment.name, attachment, { level: 'public' })
				}
				newAttachment = (await Storage.get(res.key)).split('?')[0];
			}

			await axios.post('/api/post', {
				user_id: user?.username,
				attachment: newAttachment,
				attachmentType: attachment ? (attachment.type === 'application/pdf' ? 'pdf' : 'image') : '',
				...data
			})
			onHideModal();
		} catch (e) {
			console.error(e);
		}
	}

	const hideModal = () => {
		onHideModal();
	}

	const uploadImage = (e: File) => {
		setAttachment(e);
	}

	const formik = useFormik({
		initialValues: {
			room: '',
			type: 'tweet',
			text: '',
			survey: '',
			choices: [],
			period: ''
		},
		onSubmit: onSubmit
	});

	const enterChoice: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();

			formik.setFieldValue('choices', [
				...formik.values.choices,
				e.currentTarget.value
			]);
			e.currentTarget.value = '';
		}
	}

	const onRemoveChoice = (index: number) => {
		formik.setFieldValue('choices', formik.values.choices.filter((_, id) => id != index));
	}

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Post Creation</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body  text-muted leading-relaxed">
							<form className="p-6" onSubmit={formik.handleSubmit} id="tag-create-form">
								{!(formik.values.type == 'survey' && step == 2) ?
									<>
										<div className="">
											<label htmlFor="room" className="label">Room Select</label>
											<select
												name="room"
												id="room"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												value={formik.values.room.toString()}
												onChange={formik.handleChange}
											>
												<option value=''>All</option>
												{rooms.map((room, index) => (
													<option key={index} value={room.channel.id}>{room.channel.name}</option>
												))}
											</select>
										</div>
										<div className="mt-4">
											<label htmlFor="type" className="label">Post type</label>
											<select
												name="type"
												id="type"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												value={formik.values.type.toString()}
												onChange={formik.handleChange}
											>
												<option value='tweet'>Normal</option>
												<option value='survey'>Survey</option>
												<option value='qa' disabled={formik.values.room == '' ? true : false}>Q&amp;A Style</option>
											</select>
										</div>
										<div className="mt-4">
											<label htmlFor="text" className="label">Post Contents</label>
											<textarea
												name="text"
												id="text"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												required
												onChange={formik.handleChange}
												value={formik.values.text.toString()}
												rows={4}
											/>
										</div>
										<div className="mt-4">
											<label className="label">Attachment</label>
											<div className="preview-box block justify-center rounded overflow-hidden bg-slate-50 dark:bg-slate-900/20 p-4 mb-4">
												{attachment?.type != 'application/pdf' ? preview && <Image
													className='object-cover'
													src={preview}
													alt="Attachment"
													width={300}
													height={300}
												/> : attachment.name}
											</div>
											<input type="file" id="input-file" accept="image/*,.pdf" onChange={(e) => uploadImage(e.target.files![0])} hidden />
											<label className="px-3 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded btn-upload lg:px-4 hover:bg-blue-600" htmlFor="input-file">Upload Attachment</label>
										</div>
									</> : <>
										<div className="">
											<label htmlFor="survey" className="label">Survey Title</label>
											<input
												name="survey"
												id="survey"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												value={formik.values.survey.toString()}
												required
												onChange={formik.handleChange}
											/>
										</div>
										<div className="mt-4">
											<label htmlFor="choices" className="label">Choices</label>
											{formik.values.choices.map((choice, index) => (
												<div
													key={index}
													className='relative group'
												>
													<input
														name={`choices[${index}]`}
														className="form-control dark:bg-slate-800/60 dark:border-slate-700/50 mb-2.5"
														value={choice.toString()}
														required
														onChange={formik.handleChange}
													/>
													<div className='absolute invisible group-hover:visible top-1/2 -translate-y-1/2 right-2.5'>
														<button onClick={() => onRemoveChoice(index)}>
															<TbX />
														</button>
													</div>
												</div>
											))}
											<input
												type="text"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												onKeyDown={enterChoice}
											/>
										</div>
										<div className='mt-4'>
											<label htmlFor="period" className="label">Period</label>
											<div className='flex flex-wrap'>
												<div className='mr-2.5'>
													<input type="radio" id="option0" name="period" value="3days" className="appearance-none peer" checked={formik.values.period == '3days'} onChange={formik.handleChange} />
													<label htmlFor="option0" className="cursor-pointer select-none rounded-full border py-2 px-6 text-sm hover:bg-green-500 peer-checked:bg-green-500 hover:text-white peer-checked:text-white">3days</label>
												</div>

												<div className='mr-2.5'>
													<input type="radio" id="option1" name="period" value="week" className="appearance-none peer" checked={formik.values.period == 'week'} onChange={formik.handleChange} />
													<label htmlFor="option1" className="cursor-pointer select-none rounded-full border py-2 px-6 text-sm hover:bg-green-500 peer-checked:bg-green-500 hover:text-white peer-checked:text-white">1week</label>
												</div>

												<div className='mr-2.5'>
													<input type="radio" id="option2" name="period" value="month" className="appearance-none peer" checked={formik.values.period == 'month'} onChange={formik.handleChange} />
													<label htmlFor="option2" className="cursor-pointer select-none rounded-full border py-2 px-6 text-sm hover:bg-green-500 peer-checked:bg-green-500 hover:text-white peer-checked:text-white">1month</label>
												</div>
											</div>
										</div>
									</>
								}
							</form>
						</div>
						<div className="modal-footer">
							{formik.values.type == 'survey' && step == 2 ? <button onClick={() => setStep(1)} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close">Prev</button> :
								<button onClick={hideModal} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close">Close</button>}
							{formik.values.type == 'survey' && step == 1 ? <button type="button" onClick={() => setStep(2)} className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto">Next</button>
								: <button form="tag-create-form" type="submit" className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto">Post</button>
							}

						</div>
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
		</>
	)
}

export default PostCreateModal;
