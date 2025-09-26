import React, { useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Storage } from 'aws-amplify';
import { useChatClient } from '@/lib/getstream/context';
import Image from 'next/image';
import { resizeImage } from '@/utils';

type props = {
	showModal: boolean,
	onHideModal: Function
}

const AnnouncementModal: React.FC<props> = ({ showModal = false, onHideModal }) => {
	const chatClient = useChatClient()?.client;
	const [attachment, setAttachment] = useState<File>();
	const preview = useMemo(() => {
		if (attachment) {
			return URL.createObjectURL(attachment);
		}
		return '';
	}, [attachment]);

	if (!showModal) {
		return <></>;
	}

	const onSubmit = async (data: { content: string }) => {

		try {
			let newAttachment;
			if (attachment) {
				Storage.configure({ region: 'ap-northeast-1', bucket: 'doceonewfb798f78a5bb417495ce5a866313554d214353-prod' });
				const resized = await resizeImage(attachment, 500, 500);
				let res = await Storage.put(attachment?.name, resized, { level: 'public' });
				newAttachment = (await Storage.get(res.key)).split('?')[0];
			}

			const channel = chatClient?.channel('announcement', 'all');
			await channel?.sendMessage({
				text: data.content
			});

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

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Announcement</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body  text-muted leading-relaxed">
							<Formik
								initialValues={{
									content: ''
								}}
								onSubmit={onSubmit}
							>
								{({
									values,
									handleChange,
									handleSubmit
								}) => (
									<form className="p-6" onSubmit={handleSubmit} id="announcement-modal">
										{/* <div className="">
											<label htmlFor="type" className="label">Type</label>
											<select
												name="type"
												id="type"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												required
												onChange={handleChange}
												value={values.type}
											>
												<option value="admin">Global</option>
												<option value="room">Room</option>
											</select>
										</div>
										{values.type == 'room' && <div className="mt-4">
											<label htmlFor="channel" className="label">Room</label>
											<select
												name="channel"
												id="channel"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												required
												onChange={handleChange}
												value={values.channel}
											>
												{list.map((item, index) => (
													<option key={index} value={item.channel.id}>{item.channel.name}</option>
												))}
											</select>
										</div>} */}
										<div className="">
											<label htmlFor="content" className="label">Content</label>
											<textarea
												name="content"
												id="content"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												required
												onChange={handleChange}
												value={values.content ?? ''}
												rows={4}
											/>
										</div>
										<div className="mt-4">
											<label className="label">Attachment</label>
											<div className="preview-box block justify-center rounded overflow-hidden bg-slate-50 dark:bg-slate-900/20 p-4 mb-4">
												{preview && <Image
													className='object-cover'
													src={preview}
													alt="Attachment"
													width={300}
													height={300}
												/>}
											</div>
											<input type="file" id="input-file" accept="image/*" onChange={(e) => uploadImage(e.target.files![0])} hidden />
											<label className="px-3 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded btn-upload lg:px-4 hover:bg-blue-600" htmlFor="input-file">Upload Image</label>
										</div>
									</form>
								)}
							</Formik>
						</div>
						<div className="modal-footer">
							<button onClick={hideModal} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close">Close</button>
							<button form="announcement-modal" type="submit" className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto">Save</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
		</>
	)
}

export default AnnouncementModal;