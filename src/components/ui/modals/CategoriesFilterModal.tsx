import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { createCategory, deleteCategory, updateCategory, updateCategoryOrder } from '@/graphql/mutations';
import { CreateCategoryMutation, DeleteCategoryMutation, UpdateCategoryOrderMutation } from '@/types';
import { useSelector } from 'react-redux';
import { categoriesActions, selectOrderedCategoriesList } from '@/lib/store/categories';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { TbCheck, TbCircleCheck, TbDots, TbX } from 'react-icons/tb';
import { Category } from '@/models';
import Dropdown from '../Dropdown';
import { useDispatch } from 'react-redux';
import { Router, useRouter } from 'next/router';
import CategoryEditModal from './CategoryEditModal';

type Props = {
	categories: Array<Category>,
	selectedCat: string,
	showModal: boolean,
	onHideModal: Function
}

const CategoriesFilterModal: React.FC<Props> = ({ categories, selectedCat, showModal, onHideModal }) => {
	// const categories = useSelector(selectOrderedCategoriesList);
	const [selectedOne, setSelecteOne] = useState(selectedCat);
	const [catList, setCatList] = useState(categories);
	const [edit, setEdit] = useState('');
	const [updateName, setUpdateName] = useState('');
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		setCatList(categories);
	}, [categories]);

	if (!showModal) {
		return <></>;
	}

	const hideModal = () => {
		onHideModal();
	}

	const onDragEnd = (result: DropResult) => {
		console.log(result);
		if (!result.destination) {
			return;
		}

		const temp = [...catList];
		const [removed] = temp.splice(result.source.index, 1);
		temp.splice(result.destination.index, 0, removed);
		setCatList(temp);
	}

	const clearFilters = () => {
		setSelecteOne('');
	}

	const onDelete = async (id: string) => {
		try {
			if (window.confirm('Are you sure that you want to delete this category?')) {
				await API.graphql<GraphQLQuery<DeleteCategoryMutation>>({
					query: deleteCategory,
					variables: {
						input: {
							id: id
						}
					}
				});

				setCatList(catList.filter(cat => cat.id !== id));
				dispatch(categoriesActions.deleteCategory(id));
			}
		} catch (e) {
			console.error(e);
		}
	}

	const onEdit = async (item: Category) => {
		if (!edit || window.confirm('Are you sure want to discard current change?')) {
			setEdit(item.id);
		}
	}

	const onCancelEdit = () => {
		setEdit('');
	}

	const onUpdated = (category: Category) => {
		dispatch(categoriesActions.updateCategory(category));
		setEdit('');
	}

	const updateCategory = async () => {
		const updatedCat = catList.map((cat, index) => ({
			id: cat.id,
			name: cat.name,
			image: cat.image,
			description: cat.description,
			order: index + 1,
			createdAt: cat.createdAt
		}));
		try {
			let res = await API.graphql<GraphQLQuery<UpdateCategoryOrderMutation>>({
				query: updateCategoryOrder,
				variables: {
					categories: updatedCat
				}
			});

			dispatch(categoriesActions.updateCategories({ list: res.data?.updateCategoryOrder }));
			onHideModal();
			router.push({
				query: {
					category: selectedOne
				}
			});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Filter</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body text-muted leading-relaxed">
							<div>
								<div className='py-3 pl-12 relative border-b cursor-pointer' onClick={() => setSelecteOne('')}>
									{selectedOne == '' && <div className="absolute left-0 top-1/2 -translate-y-1/2"><TbCircleCheck size={20} /></div>}
									All
								</div>
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable droppableId='droppable'>
										{(provided, snapshot) => (
											<div
												key="droppable"
												id="droppable"
												{...provided.droppableProps}
												ref={provided.innerRef}
											>
												{catList.map((item, index) => (
													<Draggable key={item.id} draggableId={item.id} index={index}>
														{(provided, snapshot) => (
															<div
																className='select-none py-3 border-b'
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																onClick={() => setSelecteOne(item.id)}
															>
																<div className={"flex items-center relative pl-12"}>
																	{selectedOne == item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2"><TbCircleCheck size={20} /></div>}
																	{item.name}
																	{/* {edit == item.id ? <input type="text" autoFocus className='outline-none bg-transparent border-b' value={updateName} onChange={e => setUpdateName(e.target.value)} /> : item.name}
																	{edit == item.id ?
																		<>
																			<button className='inline-block py-2 text-left relative ml-auto'><TbCheck className='text-xl' onClick={onUpdateName} /></button>
																			<button className='inline-block py-2 text-left relative ml-2' onClick={() => onCancelEdit()}><TbX className='text-xl' /></button>
																		</>
																		: */}
																		<Dropdown
																			className="inline-block text-left relative ml-auto"
																			title={<TbDots className="text-xl" />}
																			dropdownClass='right-0 w-40'
																		>
																			<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
																				<li>
																					<a
																						onClick={(e) => { e.preventDefault(); onEdit(item) }}
																						href="#"
																						className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
																					>Edit</a>
																				</li>
																				<li>
																					<a
																						onClick={(e) => { e.preventDefault(); onDelete(item.id) }}
																						href="#"
																						className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
																					>Delete</a>
																				</li>
																			</ul>
																		</Dropdown>
																	{/* } */}
																</div>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="font-medium text-sm mr-auto text-slate-400 hover:text-slate-700" onClick={clearFilters}>all clear</button>
							<button onClick={hideModal} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close">Close</button>
							<button onClick={updateCategory} type="button" className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto">Save</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
			<CategoryEditModal onHideModal={onCancelEdit} showModal={edit !== ''} category={categories.find(cat => cat.id == edit)} onUpdated={onUpdated} />
		</>
	)
}

export default CategoriesFilterModal;