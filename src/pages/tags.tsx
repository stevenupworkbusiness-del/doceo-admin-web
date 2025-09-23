import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import React, { useEffect, useMemo, useState } from 'react';
import { LoadingIndicator } from 'stream-chat-react';
import Link from 'next/link';
import Image from 'next/image';
import { TbArchive, TbDots, TbFiles, TbUser } from 'react-icons/tb';

import Footer from '@/components/layout/Footer';
import { DeleteTagMutation, ListTagsQuery, ListUserTagsQuery, Tag } from '@/types';
import { listTags, listUserTags } from '@/graphql/queries';
import Dropdown from '@/components/ui/Dropdown';
import TagCreateModal from '@/components/ui/modals/TagCreateModal';
import Spinner from '@/components/ui/Spinner';
import { getFormattedDate } from '@/utils';
import { deleteTag } from '@/graphql/mutations';
import TagEditModal from '@/components/ui/modals/TagEditModal';
import { useDispatch } from 'react-redux';
import { tagsActions } from '@/lib/store/tags';
import CategoryCreateModal from '@/components/ui/modals/CategoryCreateModal';
import { Category } from '@/models';
import { categoriesActions, selectOrderedCategoriesList } from '@/lib/store/categories';
import { useRouter } from 'next/router';
import CategoriesFilterModal from '@/components/ui/modals/CategoriesFilterModal';
import { useSelector } from 'react-redux';

const Tags = () => {
	const [showModal, toggleModal] = useState(false);
	const [showCatModal, toggleCatModal] = useState(false);
	const [showFilterModal, toggleFilterModal] = useState(false);
	const [tags, setTags] = useState<Tag[]>([]);
	const [loading, setLoading] = useState(true);
	const [editTag, toggleEdit] = useState(-1);
	const router = useRouter();
	const dispatch = useDispatch();
	const categories = useSelector(selectOrderedCategoriesList);

	useEffect(() => {
		const getTags = async () => {
			try {
				const res = await API.graphql<GraphQLQuery<ListTagsQuery>>({
					query: listTags,
					variables: {
					}
				});

				setTags(res.data?.listTags?.items as Array<Tag> ?? []);
				setLoading(false);
			} catch (e) {
			}
		}

		getTags();
	}, [])

	const filteredText = useMemo(() => {
		let text = 'All';
		if (router.query.category) {
			let categoryId = router.query.category?.toString();
			let category = categories.find((cat) => cat.id == categoryId);
			text = category!.name;
		}
		return text;
	}, [router, categories]);

	const filteredTag = useMemo(() => {
		if (router.query.category) {
			return tags.filter((tag) => tag.categoryId == router.query.category);
		}
		return tags;
	}, [router, tags]);

	const onHideModal = () => {
		toggleModal(false);
	}

	const onHideCatModal = () => {
		toggleCatModal(false);
	}

	const onHideFilterModal = () => {
		toggleFilterModal(false);
	}

	const onUpdated = (updatedTag: Tag) => {
		toggleEdit(-1);

		setTags(tags.map(tag => {
			if (tag.id === updatedTag.id) return updatedTag;
			return tag;
		}));
		dispatch(tagsActions.updateTag(updatedTag));
	}

	const onAdded = (tag: Tag) => {
		toggleModal(false);
		setTags([...tags, tag]);
		dispatch(tagsActions.addTag(tag));
	}

	const onCatAdded = (cat: Category) => {
		toggleCatModal(false);
		dispatch(categoriesActions.addCategory(cat));
	}

	const onEdit = (index: number) => {
		toggleEdit(index);
	}

	const onDelete = async (id: string) => {
		console.log(id);
		try {
			if (window.confirm('Are you sure that you want to delete this tag?')) {
				await API.graphql<GraphQLQuery<DeleteTagMutation>>({
					query: deleteTag,
					variables: {
						input: {
							id: id
						}
					}
				});

				setTags(tags.filter(tag => tag.id !== id));
				dispatch(tagsActions.deleteTag(id));
			}
		} catch (e) {
			console.error(e);
		}
	}

	const cancelEdit = () => {
		toggleEdit(-1);
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
										<h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Tags</h1>
										<ol className="list-reset flex text-sm">
											<li><Link href="#" className="text-gray-500">Doceo</Link></li>
											<li><span className="text-gray-500 mx-2">/</span></li>
											<li className="text-blue-600 hover:text-blue-700">Tags</li>
										</ol>
									</div>
									<div className="flex items-center">
										<button onClick={() => { toggleModal(true) }} className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600">Create New</button>
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
								<div className="h-40 relative p-4 rounded overflow-hidden bg-[url(/assets/images/banner-2.jpg)] flex items-center justify-center cursor-pointer" onClick={() => toggleFilterModal(true)}>
									<h1 className='text-4xxl text-white'>{filteredText}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<table className="w-full text-left text-gray-500 dark:text-gray-400">
						<tbody>
							{
								loading ? <tr><td colSpan={5} className='flex justify-center'><Spinner size={40} /></td></tr> :
									filteredTag.map((tag, index) => (
										<tr
											key={index}
											className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-slate-700 dark:hover:bg-slate-900/20">
											<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
												{tag.name}
											</th>
											<td className="w-1/2 px-6 py-4">
												{getFormattedDate(tag.createdAt)}
											</td>
											<td className='px-6 py-4'>{tag.category?.name}</td>
											<td className="px-6 py-4">
												<TbUser className="inline-block text-xl" /> {tag.users?.items.length ?? 0}
											</td>
											<td className="px-6 py-4 ">
												<TbFiles className='inline-block text-xl' /> {tag.feedsCount ?? 0}
											</td>
											<td className="px-6 py-4 text-right">
												<Dropdown
													className="inline-block text-left relative"
													title={<TbDots className="text-xl" />}
													dropdownClass='right-0 w-40'
												>
													<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
														<li>
															<a
																onClick={(e) => { e.preventDefault(); onEdit(index) }}
																href="#"
																className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
															>Edit</a>
														</li>
														<li>
															<a
																onClick={(e) => { e.preventDefault(); onDelete(tag.id) }}
																href="#"
																className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
															>Delete</a>
														</li>
													</ul>
												</Dropdown>
											</td>
										</tr>
									))}
						</tbody>
					</table>
				</div>
			</div>

			<TagCreateModal showModal={showModal} onHideModal={onHideModal} onAdded={onAdded} />

			<TagEditModal
				showModal={editTag > -1}
				tag={editTag > -1 ? tags[editTag] : undefined}
				onHideModal={cancelEdit}
				onUpdated={onUpdated}
			/>

			<CategoryCreateModal showModal={showCatModal} onHideModal={onHideCatModal} onAdded={onCatAdded} />

			<CategoriesFilterModal categories={categories} showModal={showFilterModal} onHideModal={onHideFilterModal} selectedCat={router.query.category?.toString() ?? ''} />
		</>
	)
}

Tags.authenticate = true;

export default Tags;