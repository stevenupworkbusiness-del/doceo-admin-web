import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API, Auth } from 'aws-amplify';
import Link from 'next/link';
import Image from 'next/image';
import { selectRoomList, selectUserToken } from '@/lib/store/rooms';
import Room from '@/components/ui/Room';
import { useConnectUser } from '@/lib/getstream/useConnectUser';
import RoomInfoModal from '@/components/ui/modals/RoomInfoModal';
import { roomsActions } from '@/lib/store/rooms';
import Footer from '@/components/layout/Footer'
import { useChatClient } from '@/lib/getstream/context';
import { UserResponse } from 'stream-chat';
import { TeamChatGenerics } from '@/types';
import { TbTrash } from 'react-icons/tb';
import axios from 'axios';
import CategoryCreateModal from '@/components/ui/modals/CategoryCreateModal';
import { Category } from '@/models';
import { categoriesActions, selectOrderedCategoriesList } from '@/lib/store/categories';
import CategoriesFilterModal from '@/components/ui/modals/CategoriesFilterModal';
import { useRouter } from 'next/router';

type DoctorsListModalProps = {
	show: boolean;
	hideModal: () => void;
}

const DoctorsListModal: React.FC<DoctorsListModalProps> = ({ show, hideModal }) => {
	const chatClient = useChatClient()?.client;
	const [doctors, setDoctors] = useState<(UserResponse<TeamChatGenerics> & { firstName: string, lastName: string })[]>([]);

	useEffect(() => {
		const getDoctors = async () => {
			try {
				const response = await chatClient!.queryUsers({ role: 'doctor' });
				setDoctors(response.users as (UserResponse<TeamChatGenerics> & { firstName: string, lastName: string })[]);
			} catch (error) {
				console.error(error);
			}
		}

		if (chatClient) {
			getDoctors();
		}
	}, [chatClient])

	const onRemoveDoctor = async (doctorId: string) => {
		if (window.confirm('Do you want to remove this doctor')) {
			try {
				const res = await API.post('AdminQueries', '/deleteUser', {
					"body": {
						"username": doctorId,
					},
					"headers": {
						'Content-Type': 'application/json',
						'Authorization': `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
					}
				});
			} catch (e) {
				console.error("Cognito user deletion error", e);
			}

			try {
				await axios.post('/api/user-delete', {
					user_id: doctorId
				});

				setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
			} catch (e) {
				console.error(e);
			}
		}
	}

	if (!show) {
		return <></>
	}

	return (
		<>
			<div className="modal fade block">
				<div className="modal-dialog modal-dialog-center">
					<div className="modal-content">
						<div className="modal-header">
							<h6 className="modal-title">Doctors List</h6>
							<button type="button" className="btn-close" onClick={hideModal}>&times;</button>
						</div>
						<div className="modal-body text-muted px-6">
							<ul className='max-h-[240px] overflow-auto leading-loose'>
								{doctors.map((doctor, index) => (
									<li key={index} className='border-b flex items-center py-2'>
										<span className='mr-2.5'>{doctor.lastName || doctor.firstName ? `${doctor.lastName} ${doctor.firstName}` : (doctor.name ?? <i>Unnamed</i>)}</span>
										<button onClick={() => onRemoveDoctor(doctor.id)} className='ml-auto'><TbTrash /></button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-overlay"></div>
		</>)
}

const Rooms = () => {
	const list = useSelector(selectRoomList);
	const dispatch = useDispatch();
	const [showCatModal, toggleCatModal] = useState(false);
	const [showFilterModal, toggleFilterModal] = useState(false);
	const categories = useSelector(selectOrderedCategoriesList);
	const router = useRouter();

	const filteredText = useMemo(() => {
		let text = 'Rooms';
		if (router.query.category) {
			let categoryId = router.query.category?.toString();
			let category = categories.find((cat) => cat.id == categoryId);
			text = category!.name;
		}
		return text;
	}, [router, categories]);

	const filteredRooms = useMemo(() => {
		if (router.query.category) {
			return list.filter((room) => (room.channel.category == router.query.category) && !room.channel.disabled);
		}
		return list;
	}, [router, list]);

	const [page, setPage] = useState(1);
	const pageSize = 6;
	const totalPages = Math.ceil(filteredRooms.length / pageSize);
	const paginatedRooms = filteredRooms.slice((page - 1) * pageSize, page * pageSize);

	const onCreateNewRoom = () => {
		dispatch(roomsActions.selectRoom(null));
		dispatch(roomsActions.toggleInfoModal(true));
	}

	const onHideCatModal = () => {
		toggleCatModal(false);
	}

	const onCatAdded = (cat: Category) => {
		toggleCatModal(false);
		dispatch(categoriesActions.addCategory(cat));
	}

	const onHideFilterModal = () => {
		toggleFilterModal(false);
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
										<h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Profile</h1>
										<ol className="list-reset flex text-sm">
											<li><Link href="#" className="text-gray-500">Doceo</Link></li>
											<li><span className="text-gray-500 mx-2">/</span></li>
											<li className="text-blue-600 hover:text-blue-700">Rooms</li>
										</ol>
									</div>
									<div className="flex items-center">
										<button onClick={() => { toggleCatModal(true) }} className="px-3 py-2 lg:px-4 mr-2.5 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600">Create Category</button>
										<button onClick={onCreateNewRoom} className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600">Create New</button>
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
								<div className="h-40 relative p-4 rounded overflow-hidden">
									<div className="absolute inset-0 h-40 bg-[url(/assets/images/banner-2.jpg)] bg-cover flex items-center justify-center rounded cursor-pointer" onClick={() => toggleFilterModal(true)}>
										<h1 className='absolute text-4xxl text-white text-center'>{filteredText}</h1>
										<Image src="/assets/images/banner.jpg" alt="banner" className="w-full h-full object-cover" width={684} height={346} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
					{filteredRooms.map((room, index) => (

						<div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4" key={index}>
							<Room room={room} />
						</div>
					))}
				</div>

				{/* <div className="flex justify-center items-center gap-4 my-4">
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
						className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
					>
						Prev
					</button>
					<span>Page {page} of {totalPages}</span>
					<button
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={page === totalPages}
						className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
					>
						Next
					</button>
				</div> */}

				<Footer />
			</div>

			<RoomInfoModal />

			<CategoryCreateModal showModal={showCatModal} onHideModal={onHideCatModal} onAdded={onCatAdded} />
			<CategoriesFilterModal categories={categories} showModal={showFilterModal} onHideModal={onHideFilterModal} selectedCat={router.query.category?.toString() ?? ''} />
		</>
	)
}

Rooms.authenticate = true;

export default Rooms;
