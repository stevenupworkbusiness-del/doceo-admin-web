import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectTagsList } from '@/lib/store/tags';
import { selectRoomList } from '@/lib/store/rooms';

type Props = {
	onHideModal: Function
}

const UsersFilterModal: React.FC<Props> = ({ onHideModal }) => {
	const router = useRouter();
	const tags = useSelector(selectTagsList);
	const rooms = useSelector(selectRoomList);
	const [filter, setFilter] = useState<Record<string, string>>({});

	useEffect(() => {
		setFilter(router.query as Record<string, string>);
	}, [router])

	const hideModal = () => {
		onHideModal();
	}

	const isFilterActive = (key: string, value: string) => {
		let currentFilter = filter[key] ? filter[key] as string : '';
		return value === currentFilter;
	}

	const toggleFilter = (key: string, value: string) => {
		setFilter({
			...filter,
			[key]: value
		})
	}

	const saveFilters = () => {
		router.push({
			query: filter
		});
		onHideModal();
	}

	const clearFilters = () => {
		setFilter({});
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
						<div className="modal-body  text-muted leading-relaxed">
							<div className='mb-2.5'>
								<label className='label'>Sex</label>
								<div>
									<button
										type="button"
										onClick={() => toggleFilter('sex', '')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('sex', '') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>All</button>
									<button
										type="button"
										onClick={() => toggleFilter('sex', '男性')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('sex', '男性') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>Men</button>
									<button
										type="button"
										onClick={() => toggleFilter('sex', '女性')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('sex', '女性') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>Women</button>
									<button
										type="button"
										onClick={() => toggleFilter('sex', 'LGBT')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('sex', 'LGBT') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>Others</button>
								</div>
							</div>
							<div className='mb-2.5'>
								<label className='label'>Generation</label>
								<div>
									<button
										type="button"
										onClick={() => toggleFilter('age', '')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>All</button>
									<button
										type="button"
										onClick={() => toggleFilter('age', '10')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '10') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>10s</button>
									<button
										type="button"
										onClick={() => toggleFilter('age', '20')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '20') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>20s</button>
									<button
										type="button"
										onClick={() => toggleFilter('age', '30')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '30') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>30s</button>
									<button
										type="button"
										onClick={() => toggleFilter('age', '40')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '40') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>40s</button>
									<button
										type="button"
										onClick={() => toggleFilter('age', '50')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '50') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>50s</button>
									<button
										type="button"
										onClick={() => toggleFilter('age', '60+')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('age', '60+') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>60+</button>
								</div>
							</div>
							<div className='mb-2.5'>
								<label className='label'>Usertag</label>
								<div>
									<button
										type="button"
										onClick={() => toggleFilter('tag', '')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('tag', '') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>All</button>
									{tags.map((tag, index) => (
										<button
											key={index}
											type="button"
											onClick={() => toggleFilter('tag', tag.id)}
											className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('tag', tag.id) ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
										>{tag.name}</button>
									))}
								</div>
							</div>
							<div className='mb-2.5'>
								<label className='label'>Rooms</label>
								<div>
									<button
										type="button"
										onClick={() => toggleFilter('room', '')}
										className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('room', '') ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
									>All</button>
									{rooms.map((room, index) => (
										<button
											key={index}
											type="button"
											onClick={() => toggleFilter('room', room.channel.id)}
											className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${isFilterActive('room', room.channel.id) ? 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700' : 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'}`}
										>{room.channel.name}</button>
									))}
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="font-medium text-sm mr-auto text-slate-400 hover:text-slate-700" onClick={clearFilters}>all clear</button>
							<button onClick={hideModal} type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close">Close</button>
							<button onClick={saveFilters} type="button" className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto">Save</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
		</>
	)
}

export default UsersFilterModal;