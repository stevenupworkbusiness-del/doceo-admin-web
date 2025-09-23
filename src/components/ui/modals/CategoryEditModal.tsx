import React, { useMemo, useState } from 'react';
import { Formik } from 'formik';
import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { createCategory, updateCategory } from '@/graphql/mutations';
import { CreateCategoryMutation, UpdateCategoryMutation } from '@/types';
import { Storage } from 'aws-amplify';
import Image from 'next/image';
import { Category } from '@/models';
import { resizeImage } from '@/utils';
import { TbX } from 'react-icons/tb';

type Props = {
	category?: Category,
	onUpdated: Function
	showModal: boolean,
	onHideModal: Function
}

const CategoryEditModal: React.FC<Props> = ({ category, onUpdated, showModal, onHideModal }) => {
	const [banner, setBanner] = useState<File>();
	const [clearMessage, setClearMessage] = useState(false);
	const preview = useMemo(() => {
		if (banner) {
			return URL.createObjectURL(banner);
		}
		return category?.image;
	}, [banner, category]);

	if (!showModal) {
		return <></>;
	}

	const onSubmit = async (data: { name: String, description: String }) => {
		let newImage;

		try {
			if (banner && !clearMessage) {
				Storage.configure({ region: 'ap-northeast-1', bucket: 'doceonewfb798f78a5bb417495ce5a866313554d214353-prod' });
				const resized = await resizeImage(banner, 500, 500);
				let res = await Storage.put(banner?.name, resized, { level: 'public' });
				newImage = (await Storage.get(res.key)).split('?')[0];
			}

			const res = await API.graphql<GraphQLQuery<UpdateCategoryMutation>>({
				query: updateCategory,
				variables: {
					input: {
						id: category?.id,
						name: data.name,
						description: data.description,
						image: clearMessage ? '' : newImage
					}
				}
			});

			onUpdated(res.data?.updateCategory);
		} catch (e) {
			console.error(e);
		}
	}

	const hideModal = () => {
		onHideModal();
		setClearMessage(false);
	}

	const uploadImage = (e: File) => {
		setBanner(e);
		setClearMessage(false);
	}

	const removeImage = () => {
		setClearMessage(true);
	}

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Update Category</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body  text-muted leading-relaxed">
							<Formik
								initialValues={{
									name: category?.name ?? '',
									description: category?.description ?? ''
								}}
								onSubmit={onSubmit}
							>
								{({
									values,
									handleChange,
									handleSubmit
								}) => (
									<form className="p-6" onSubmit={handleSubmit} id="tag-create-form">
										<div className="">
											<label htmlFor="name" className="label">Category Name</label>
											<input
												name="name"
												id="name"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												required
												maxLength={15}
												placeholder='15 characters maximum'
												onChange={handleChange}
												value={values.name.toString()}
											/>
										</div>
										<div className="mt-4">
											<label htmlFor="description" className="label">Category Description</label>
											<textarea
												name="description"
												id="name"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												required
												onChange={handleChange}
												value={values.description.toString()}
												rows={4}
											/>
										</div>
										<div className="mt-4">
											<label className="label">Category Icon</label>
											<div className="preview-box block justify-center rounded overflow-hidden bg-slate-50 dark:bg-slate-900/20 p-4 mb-4 relative">
												{preview && !clearMessage && <Image
													className='object-cover'
													src={preview}
													alt="Banner"
													width={300}
													height={300}
												/>}
												{preview && !clearMessage && <div className="absolute right-0 top-0"><TbX className="cursor-pointer" onClick={removeImage} size={24} /></div>}
											</div>
											<input type="file" id="input-file" accept="image/*" onChange={(e) => uploadImage(e.target.files![0])} hidden />
											<label className="btn-upload px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 mt-4" htmlFor="input-file">Upload Image</label>
										</div>
									</form>
								)}
							</Formik>
						</div>
						<div className="modal-footer">
							<button onClick={hideModal} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close">Close</button>
							<button form="tag-create-form" type="submit" className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto">Save</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
		</>
	)
}

export default CategoryEditModal;
