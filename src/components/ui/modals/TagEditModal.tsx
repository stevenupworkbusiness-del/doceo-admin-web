import React from 'react';
import { Formik } from 'formik';
import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { updateTag } from '@/graphql/mutations';
import { Tag, UpdateTagMutation } from '@/types';
import { useSelector } from 'react-redux';
import { selectOrderedCategoriesList } from '@/lib/store/categories';

type Props = {
	tag?: Tag,
	onUpdated: Function,
	showModal: boolean,
	onHideModal: Function
}

const TagEditModal: React.FC<Props> = ({ tag, onUpdated, showModal, onHideModal }) => {
	const categories = useSelector(selectOrderedCategoriesList);

	if (!showModal) {
		return <></>;
	}

	const onSubmit = async (data: { name: String, category: string }) => {
		try {
			const res = await API.graphql<GraphQLQuery<UpdateTagMutation>>({
				query: updateTag,
				variables: {
					input: {
						id: tag?.id,
						name: data.name,
						categoryId: data.category == '' ? null : data.category
					}
				}
			});

			onUpdated(res.data?.updateTag);
		} catch (e) {
			console.error(e);
		}
	}

	const hideModal = () => {
		onHideModal();
	}

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Edit Tag</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body  text-muted leading-relaxed">
							<Formik
								initialValues={{
									name: tag!.name,
									category: tag!.categoryId ?? ''
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
											<label htmlFor="category" className="label">Category</label>
											<select
												name="category"
												id="category"
												className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
												value={values.category}
												onChange={handleChange}
											>
												<option value=''>All</option>
												{categories.map((cat, index) => (
													<option key={index} value={cat.id}>{cat.name}</option>
												))}
											</select>
										</div>
										<div className="">
											<label htmlFor="name" className="label">Tag Name</label>
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

export default TagEditModal;
