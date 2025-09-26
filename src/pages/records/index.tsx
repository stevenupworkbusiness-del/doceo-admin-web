import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { ChannelDetail} from '@/types';
import { useSelector } from 'react-redux';
import { selectSelectedRoom } from '@/lib/store/rooms';


const SingleRoom = () => {
    const selectedRoom = useSelector(selectSelectedRoom);
    const [value, setvalue] = useState("Off");
    const [showRoomsList, toggleRoomsList] = useState(false);
    const [showForm, setShowForm] = useState(false);


    const handleOptionOnOfChange = (e: any) => {
        if (e.target.value == "On") {
            setShowForm(true);
        }
        else {
            setvalue("Off");
            console.log('value in recor UE: ', value)
        }
    }

    return (
        <>
            <div className="container px-2 mx-auto">
                <div className="flex flex-wrap">
                    <div className="flex items-center w-full py-4">
                        <div className="w-full">
                            <div className="">
                                <div className="flex flex-wrap justify-between">
                                    <div className="items-center ">
                                        <h1 className="block mb-1 text-xl font-semibold dark:text-slate-100">Profile</h1>
                                        <ol className="flex text-sm list-reset">
                                            <li><Link href="#" className="text-gray-500">Doceo</Link></li>
                                            <li><span className="mx-2 text-gray-500">/</span></li>
                                            <li className="text-gray-500"><Link href="/rooms">Rooms</Link></li>
                                            <li><span className="mx-2 text-grayF-500">/</span></li>
                                            <li className="text-blue-600 hover:text-blue-700">{(selectedRoom as ChannelDetail)?.channel.name}</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-2 h-[calc(100vh-138px)] relative pb-14 flex flex-col">
                <div className="grid gap-4 mb-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
                    <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                        <div className="bg-transparent shadow-none card">
                            <div className="p-0 card-body">
                                <div className="relative h-40 p-4 overflow-hidden rounded cursor-pointer" onClick={() => toggleRoomsList(true)}>
                                    <h1
                                        className="text-4xxl text-white"
                                        style={{
                                            display: 'block',
                                            zIndex: 9999,
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)', // This centers the text accurately
                                        }}
                                    >
                                        {/* {selectedRoom?.channel.name} */}
                                        Record
                                    </h1>

                                    <div className="absolute inset-0 h-40 rounded">
                                        <Image src={(selectedRoom as ChannelDetail)?.channel.image ?? "/assets/images/banner.jpg"} alt="banner" className="object-cover w-full h-full" width={684} height={346} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <select
                    onChange={(e) => { handleOptionOnOfChange(e) }}
                    value={value}
                    style={{
                        padding: '8px 12px',
                        marginBottom: "1rem",
                        width: "5rem",
                        marginTop: "1rem",
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        color: '#333',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                        outline: 'none',
                        appearance: 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                >
                    <option value="On">ON</option>
                    <option value="Off">OFF</option>
                </select>

                <div className="w-[90%] mx-auto pt-10">
                    {/* <StreamIntegrationTable selectedRoomId={selectedRoom?.channel?.id} setvalue={setvalue} /> */}
                </div>


                {/* <div className="flex flex-grow h-full mb-4 overflow-hidden rounded-lg shadow-sm">
                    {chatClient && <Chat client={chatClient!} theme={`team light`}>
                        <ChannelListContainer
                            {...{
                                isCreating,
                                filters,
                                options,
                                setCreateType,
                                setIsCreating,
                                setIsEditing,
                                sort,
                                roomName: selectedRoom?.channel.name!
                            }}
                        />
                        <ChannelContainer
                            {...{
                                createType,
                                isCreating,
                                isEditing,
                                setIsCreating,
                                setIsEditing,
                            }}
                        />
                    </Chat>}
                </div> */}

                <Footer />

                {
                    // showReplyModal == 'text' && <TextReplyModal />
                }
                {/* {
                    showReplyModal == 'video' && <DynamicVideoReplyModal />
                }
                {
                    showReplyModal == 'edit' && <EditReplyModal />
                }
                {
                    showRoomsList && <JoinedRoomsModal onHideModal={() => toggleRoomsList(false)} />
                } */}
                {/* {
                    showForm && <FormModal selectedRoom={selectedRoom} onHideModal={() => setShowForm(false)} value={value} setvalue={setvalue} />
                } */}
            </div>
        </>
    )
}

SingleRoom.authenticate = true;

export default SingleRoom;
