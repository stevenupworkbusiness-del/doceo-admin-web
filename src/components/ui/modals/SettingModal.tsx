import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { useChatClient } from '@/lib/getstream/context';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { Storage } from 'aws-amplify';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectRoomList } from '@/lib/store/rooms';
import { resizeImage } from '@/utils';

Modal.setAppElement('#__next');

const SettingModal: React.FC<{ onToggleMenu: Function }> = ({ onToggleMenu }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [image, setImage] = useState<File>();
	const currentUser = useAuth();
	const { adminInfo, updateAdminInfo, client } = useChatClient()!;
	const rooms = useSelector(selectRoomList);
	const [joinedRooms, setJoinedRooms] = useState<string[]>([]);

	const previewImage = useMemo(() => {
		if (image) {
			return URL.createObjectURL(image);
		}
		return adminInfo?.image;
	}, [adminInfo, image]);

	useEffect(() => {
		formik.setValues({ name: adminInfo?.name, introduction: adminInfo?.introduction });
	}, [adminInfo]);

	useEffect(() => {
		async function getJoinedRooms() {
			let res = await client.queryChannels({
				type: 'room',
				members: {
					$in: [currentUser?.username!]
				}
			});

			formik.setFieldValue('rooms', res.map((channel) => channel.id));
			setJoinedRooms(res.map((channel) => channel.id!));
		}

		if (client && currentUser) getJoinedRooms();
	}, [client, currentUser])

	const onSubmit = async ({ rooms, ...values }: Record<string, string>) => {
		setIsLoading(true);
		try {
			if (rooms.length > 0) {
				let roomsFlag: Record<string, number> = {};
				for (let i = 0; i < joinedRooms.length; i++) {
					roomsFlag[joinedRooms[i]] = (roomsFlag[joinedRooms[i]] ?? 0) + 1;
				}
				for (let i = 0; i < rooms.length; i++) {
					roomsFlag[rooms[i]] = (roomsFlag[rooms[i]] ?? 0) + 2;
				}

				for (let room in roomsFlag) {
					if (roomsFlag[room] == 1) {
						let channel = client.channel('room', room);
						await channel.removeMembers([currentUser!.username]);
					} else if (roomsFlag[room] == 2) {
						let channel = client.channel('room', room);
						await channel.watch();
						await channel.addMembers([currentUser!.username]);
					}
				}
			}
			let changedValues: Record<string, any> = {};
			if (image) {
				Storage.configure({ region: 'ap-northeast-1', bucket: 'doceonewfb798f78a5bb417495ce5a866313554d214353-prod' });
				const resized = await resizeImage(image, 500, 500);
				let res = await Storage.put(image?.name, resized, { level: 'public' });
				changedValues['image'] = (await Storage.get(res.key)).split('?')[0];
				setImage(undefined);
			}
			for (let key in values) {
				if (values[key] !== (adminInfo as Record<string, any>)[key]) {
					changedValues[key] = values[key];
				}
			}

			if (Object.keys(changedValues).length !== 0) {
				await updateAdminInfo(
					changedValues
				)
			}
			closeModal();
		} catch (err) {
			console.log({ err });
		}
		setIsLoading(false);
	};

	const formik = useFormik<Record<string, any>>({
		initialValues: { name: '', introduction: '', rooms: [] },
		onSubmit: onSubmit
	});

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	}

	const openModal = () => {
		setModalIsOpen(true);
	}

	const closeModal = () => {
		setModalIsOpen(false);
	}

	return (
		<>
			<button
				onClick={() => {
					openModal();
					onToggleMenu();
				}}
				className="flex items-start w-full px-4 py-2 mr-0 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
			>
				Settings
			</button>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Settings Modal"
				className="top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-0 m-0 overflow-auto bg-black bg-opacity-50"
			>
				{adminInfo &&
					<form onSubmit={formik.handleSubmit}>
						<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
							<div className="flex flex-col w-5/6 p-0 overflow-x-hidden overflow-y-scroll bg-white rounded shadow-lg h-5/6 sm:h-4/6 md:w-4/6">
								<div className="px-4 py-4 m-0 text-base font-extrabold text-left">
									Information setting
								</div>
								<div className="h-0.5 bg-slate-400 w-full mt-0 mb-0"></div>
								<div className="flex flex-row px-0 py-0 grow">
									<div className="flex flex-col w-1/3 justify-items-start align-items-start sm:w-1/4 md:w-1/5">
										<button
											type="button"
											onClick={() => handleTabClick(0)}
											className={`text-base text-left font-extrabold pl-2 py-4 text-black pr-1 ${activeTab === 0 ? 'bg-slate-400' : ''
												}`}
										>
											Info
										</button>
										<button
											type="button"
											onClick={() => handleTabClick(1)}
											className={`text-base text-left font-extrabold pl-2 py-4 text-black pr-1 ${activeTab === 1 ? 'bg-slate-400' : ''
												}`}
										>
											Room in charge
										</button>
									</div>
									<div className="w-0.5 mt-0 mb-0 bg-slate-400 h-full"></div>
									<div className="flex flex-col justify-between w-full h-full overflow-y-scroll grow">
										<form
											className="flex items-start justify-start w-full pl-4 pr-4"
											onSubmit={formik.handleSubmit}
											id="room-info-form"
										>
											{activeTab === 0 && (
												<div className="w-full">
													<div
														className={`mt-4 text-base text-left font-extrabold px-4 text-black`}
													>
														Icon
													</div>
													<label className="inline-block rounded-full h-fit ml-4 bg-custom-gray w-fit">
														<input
															type="file"
															accept="image/*"
															className="hidden rounded-full w-100 h-100 bg-custom-gray"
															onChange={e =>
																setImage(e.target.files![0])
															}
														/>
														{previewImage && (
															<Image
																className="rounded-full"
																height={100}
																width={100}
																src={previewImage}
																alt="画像"
															/>
														)}
													</label>
													<div className='w-full mt-4'>
														<label
															htmlFor="Name"
															className="font-extrabold label"
														>
															Name
														</label>
														<input
															name="name"
															type="text"
															id="Name"
															className="w-full form-control dark:bg-slate-800/60 dark:border-slate-700/50"
															placeholder=""
															required
															value={formik.values.name}
															onChange={formik.handleChange}
														/>
													</div>
													<div className='w-full mt-4'>
														<label
															htmlFor="self-intro"
															className="mt-4 font-extrabold label"
														>
															Introduction
														</label>
														<textarea
															name="introduction"
															id="self-intro"
															rows={4}
															className="w-full form-control dark:bg-slate-800/60 dark:border-slate-700/50"
															placeholder=""
															required
															value={formik.values.introduction}
															onChange={formik.handleChange}
														/></div>
												</div>
											)}
											{activeTab === 1 && (
												<div className="w-full flex flex-wrap mt-8">
													{rooms.map((room, index) => (
														<div key={index}>
															<input type="checkbox" disabled={room.channel.disabled ?? false} className='hidden peer' id={room.channel.id} name="rooms" value={room.channel.id} onChange={formik.handleChange} checked={formik.values.rooms?.findIndex((id: string) => id == room.channel.id) >= 0} />
															<label
																htmlFor={room.channel.id}
																className={`inline-block text-sm font-medium cursor-pointer px-3 py-2 mr-2  mb-2 rounded text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 peer-checked:text-white peer-checked:bg-blue-500 peer-checked:hover:bg-blue-600 peer-checked:focus:ring-4 peer-checked:focus:ring-blue-300 peer-checked:dark:bg-blue-500 peer-checked:dark:hover:bg-blue-600 peer-checked:focus:outline-none peer-checked:dark:focus:ring-blue-700`}
															>{room.channel.name}</label>
														</div>
													))}
												</div>
											)}
										</form>
										<div className="p-0">
											<div className="h-0.5 bg-slate-400 w-full mt-0 mb-0"></div>
											<div className="flex justify-end mt-2 mb-2 ml-4 mr-4">
												<button
													type="button"
													onClick={closeModal}
													className="px-2 py-2 text-base font-bold text-white bg-red-500 rounded hover:bg-blue-700 "
												>
													Close
												</button>
												<button
													type="submit"
													className="px-4 py-2 ml-4 text-base font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
												>
													Save
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>}
				{isLoading && <Spinner size={50} />}
			</Modal>
		</>
	);
};

export default SettingModal;
