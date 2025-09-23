import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  LiteralStringForUnion,
  StreamChat,
  ChannelFilters,
  ChannelSort,
  UserResponse,
  ExtendableGenerics,
  UserFilters,
  MemberSort,
} from "stream-chat";
import { Chat } from "stream-chat-react";
import { Modal, Button } from "react-bootstrap";
import Spinner from "@/components/ui/Spinner";
import Footer from "@/components/layout/Footer";
import { ChannelDetail, TeamChatGenerics, ActivityType } from "@/types";
// import { useChatClient } from '@/lib/getstream/context';
import { ChannelListContainer } from "@/components/channel/ChannelListContainer/ChannelListContainer";
import { ChannelContainer } from "@/components/channel/ChannelContainer/ChannelContainer";
import { useConnectUser } from "@/lib/getstream/useConnectUser";
import { GetstreamState, useChatClient } from "@/lib/getstream/context";
import { useSelector } from "react-redux";
import { selectSpecificRoom } from "@/lib/store/rooms";
import { TbCheck, TbCirclePlus, TbPlus, TbTrash } from "react-icons/tb";
import { useClickAway } from "react-use";
import axios from "axios";
import { useAuth } from "@/lib/hooks/useAuth";
import MediaCreateModal from "@/components/ui/modals/MediaCreateModal";
import {
  DefaultUT,
  FlatFeed,
  StreamApp,
  LoadMorePaginator,
} from "react-activity-feed";
import { LoadingIndicator as DefaultLoadingIndicator } from "react-file-utils";
import Post from "@/components/ui/Post";
import Media from "@/components/ui/Media";
import { EnrichedActivity, EnrichedUser, ReactionAPIResponse } from "getstream";

const options = {};
const sort: ChannelSort<TeamChatGenerics> = {
  last_message_at: -1,
  updated_at: -1,
};

type AddDoctorModalProps = {
  show: boolean;
  closeModal: () => void;
  room: ChannelDetail | undefined;
};

const AddDoctorModal = (props: AddDoctorModalProps) => {
  const { show, closeModal, room } = props;
  const chatClient = useChatClient()?.client;
  const [doctors, setDoctors] = useState<
    (UserResponse<TeamChatGenerics> & { firstName: string; lastName: string })[]
  >([]);
  const [roomDoctors, setRoomDoctors] = useState<
    (UserResponse<TeamChatGenerics> & { firstName: string; lastName: string })[]
  >([]);
  const [selectedDoctors, setSelectedDoctors] = useState<
    (UserResponse<TeamChatGenerics> & { firstName: string; lastName: string })[]
  >([]);

  const channel = chatClient?.channel("room", room?.channel.id);

  const getDoctors = async () => {
    try {
      if (chatClient) {
        const response = await chatClient.queryUsers({ role: "doctor" });
        return response.users as (UserResponse<TeamChatGenerics> & {
          firstName: string;
          lastName: string;
        })[];
      }
    } catch (error) {
      console.log("ユーザーの取得に失敗しました。");
    }
  };

  const getDoctorsInRoom = async () => {
    try {
      if (channel) {
        const filterConditions: UserFilters<TeamChatGenerics> = {};
        const sort: MemberSort<TeamChatGenerics> = {};
        const options = { limit: 100, offset: 0 };
        const response = await channel.queryMembers(
          filterConditions,
          sort,
          options
        );

        const doctorsInRoom = response.members
          .filter((obj) => obj?.user?.role === "doctor")
          .map((obj) => obj.user);

        return doctorsInRoom;
      }
    } catch (error) {
      console.log("error happened at getDoctorsInRoom: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const doctorsInRoom = (await getDoctorsInRoom()) ?? [];
      setRoomDoctors(
        doctorsInRoom as (UserResponse<TeamChatGenerics> & {
          firstName: string;
          lastName: string;
        })[]
      );
      setSelectedDoctors(
        doctorsInRoom as (UserResponse<TeamChatGenerics> & {
          firstName: string;
          lastName: string;
        })[]
      );

      const allDoctors = await getDoctors();
      setDoctors(
        allDoctors
          ? allDoctors.filter(
              (doctor) =>
                doctorsInRoom.findIndex((user) => user?.id == doctor.id) < 0
            )
          : []
      );
    };

    fetchData();
  }, []);

  const handleDoctorClick = (
    doctor: UserResponse<TeamChatGenerics> & {
      firstName: string;
      lastName: string;
    }
  ) => {
    if (!selectedDoctors.includes(doctor)) {
      setSelectedDoctors([...selectedDoctors, doctor]);
      setDoctors(doctors.filter((user) => user !== doctor));
    } else {
      setDoctors([...doctors, doctor]);
      setSelectedDoctors(
        selectedDoctors.filter((selectedUser) => selectedUser !== doctor)
      );
    }
  };

  const handleAddDoctors = async () => {
    const memberIdsToAdd = selectedDoctors
      .filter((doctor) => !roomDoctors.includes(doctor))
      .map((doctor) => doctor.id);
    const memberIdsToRemove = roomDoctors
      .filter((doctor) => !selectedDoctors.includes(doctor))
      .map((doctor) => doctor.id);
    try {
      if (memberIdsToAdd.length > 0) {
        const response = await channel?.addMembers(memberIdsToAdd);
        console.log(response); // 追加されたメンバーの情報
      }
      if (memberIdsToRemove.length > 0) {
        const responseToRemove = await channel?.removeMembers(
          memberIdsToRemove
        );
        console.log(responseToRemove);
      }
      setRoomDoctors(selectedDoctors);
      closeModal();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>医師を追加する</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2 style={{ marginBottom: "10px" }}>医師一覧</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <ul>
            {doctors?.map((doctor) => (
              <li
                key={doctor.id}
                onClick={() => handleDoctorClick(doctor)}
              >{`${doctor.lastName} ${doctor.firstName}`}</li>
            ))}
          </ul>
        </div>
        <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>選択済医師</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <ul>
            {selectedDoctors?.map((doctor) => (
              <li key={doctor.id} className="flex items-center">
                {`${doctor.lastName} ${doctor.firstName}`}
                <button
                  className="ml-2.5"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  <TbTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddDoctors}>保存</Button>
        <div style={{ width: "10px" }}></div>
        <Button onClick={closeModal}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  );
};

type AddCompanyModalProps = {
  show: boolean;
  closeModal: () => void;
  room: ChannelDetail | undefined;
};

const AddCompanyModal = (props: AddCompanyModalProps) => {
  const { show, closeModal, room } = props;
  const chatClient = useChatClient()?.client;
  const [companies, setCompanies] = useState<UserResponse<TeamChatGenerics>[]>(
    []
  );
  const [roomCompanies, setRoomCompanies] = useState<
    UserResponse<TeamChatGenerics>[]
  >([]);
  const [selectedCompanies, setSelectedCompanies] = useState<
    UserResponse<TeamChatGenerics>[]
  >([]);

  const channel = chatClient?.channel("room", room?.channel.id);

  const getCompanies = async () => {
    try {
      if (chatClient) {
        const response = await chatClient.queryUsers({ role: "corporate" });
        return response.users as UserResponse<TeamChatGenerics>[];
      }
    } catch (error) {
      console.log("ユーザーの取得に失敗しました。");
    }
  };

  const getCompaniesInRoom = async () => {
    try {
      if (channel) {
        const filterConditions: UserFilters<TeamChatGenerics> = {};
        const sort: MemberSort<TeamChatGenerics> = {};
        const options = { limit: 100, offset: 0 };
        const response = await channel.queryMembers(
          filterConditions,
          sort,
          options
        );

        const companiesInRoom = response.members
          .filter((obj) => obj?.user?.role === "corporate")
          .map((obj) => obj.user);

        return companiesInRoom;
      }
    } catch (error) {
      console.log("error happened at getComapniesInRoom: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const companiesInRoom = (await getCompaniesInRoom()) ?? [];
      setRoomCompanies(companiesInRoom as UserResponse<TeamChatGenerics>[]);
      setSelectedCompanies(companiesInRoom as UserResponse<TeamChatGenerics>[]);

      const allCompanies = await getCompanies();
      setCompanies(
        allCompanies
          ? allCompanies.filter(
              (company) =>
                companiesInRoom.findIndex((user) => user?.id == company.id) < 0
            )
          : []
      );
    };

    fetchData();
  }, []);

  const handleCompanyClick = (company: UserResponse<TeamChatGenerics>) => {
    if (!selectedCompanies.includes(company)) {
      setSelectedCompanies([...selectedCompanies, company]);
      setCompanies(companies.filter((item) => item !== company));
    } else {
      setSelectedCompanies(
        selectedCompanies.filter((selectedUser) => selectedUser !== company)
      );
      setCompanies([...companies, company]);
    }
  };

  const handleAddCompanies = async () => {
    const memberIdsToAdd = selectedCompanies
      .filter((company) => !roomCompanies.includes(company))
      .map((company) => company.id);
    const memberIdsToRemove = roomCompanies
      .filter((company) => !selectedCompanies.includes(company))
      .map((company) => company.id);
    try {
      if (memberIdsToAdd.length > 0) {
        const response = await channel?.addMembers(memberIdsToAdd);
        console.log(response); // 追加されたメンバーの情報
      }
      if (memberIdsToRemove.length > 0) {
        const responseToRemove = await channel?.removeMembers(
          memberIdsToRemove
        );
        console.log(responseToRemove);
      }
      setRoomCompanies(selectedCompanies);
      closeModal();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>会社を追加する</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2 style={{ marginBottom: "10px" }}>会社一覧</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <ul>
            {companies?.map((company) => (
              <li key={company.id} onClick={() => handleCompanyClick(company)}>
                {company.name}
              </li>
            ))}
          </ul>
        </div>
        <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>選択済会社</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <ul>
            {selectedCompanies?.map((company) => (
              <li key={company.id} className="flex items-center">
                {company.name}
                <button
                  className="ml-2.5"
                  onClick={() => handleCompanyClick(company)}
                >
                  <TbTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddCompanies}>保存</Button>
        <div style={{ width: "10px" }}></div>
        <Button onClick={closeModal}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  );
};

const SingleRoom = () => {
  const id = useSearchParams().get("id");
  const room = useSelector(selectSpecificRoom(id));
  const user = useAuth();
  // const chatClient = useConnectUser();
  const chatClient = useChatClient()?.client;
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCompanyModalVisible, setIsCompanyModalVisible] = useState(false);
  const filters = useMemo<ChannelFilters[]>(() => {
    return [
      { type: "channel-1", room: id },
      { type: "channel-2", room: id },
      { type: "channel-3", room: id },
      { type: "channel-4", room: id },
      { type: "messaging", room: id },
    ];
  }, [id]);
  const ref = useRef(null);
  const [showMenu, toggleMenu] = useState(false);
  const router = useRouter();
  const query = router.query;
  const [token, setToken] = useState("");
  const [mediaModal, showMediaModal] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.post("/api/token", {
          user_id: id,
        });

        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    };

    if (id && query.media == "true") getToken();
  }, [id, query]);

  useClickAway(ref, () => {
    toggleMenu(false);
  });

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openCompanyModal = () => {
    setIsCompanyModalVisible(true);
  };

  const closeCompanyModal = () => {
    setIsCompanyModalVisible(false);
  };

  const onToggleMenu = () => {
    toggleMenu(!showMenu);
  };

  const onCreateMedia = () => {
    showMediaModal(true);
  };

  const onAddReactionRequest = async (
    _: string,
    activity: EnrichedActivity,
    data: any
  ) => {
    return axios
      .post<any, { data: ReactionAPIResponse }>("/api/medium", {
        activity_id: activity.id,
        actor_id: (activity.actor as EnrichedUser).id,
        user_id: user?.username,
        data: data,
      })
      .then(({ data: user }) => {
        return Promise.resolve(user);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

  const onDeleteReactionRequest = async (reactionId: string) => {
    return axios
      .post("/api/reaction-delete", {
        id: reactionId,
      })
      .then((_) => {
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

  if (!chatClient || !id)
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-5 -translate-y-5">
        <Spinner size={40} />
      </div>
    );

  return (
    <>
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap">
          <div className="flex items-center py-4 w-full">
            <div className="w-full">
              <div className="">
                <div className="flex flex-wrap justify-between">
                  <div className="items-center ">
                    <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                      Profile
                    </h1>
                    <ol className="list-reset flex text-sm">
                      <li>
                        <Link href="#" className="text-gray-500">
                          Doceo
                        </Link>
                      </li>
                      <li>
                        <span className="text-gray-500 mx-2">/</span>
                      </li>
                      <li className="text-gray-500">
                        <Link href="/rooms">Rooms</Link>
                      </li>
                      <li>
                        <span className="text-grayF-500 mx-2">/</span>
                      </li>
                      <li className="text-blue-600 hover:text-blue-700">
                        {room?.channel.name}
                      </li>
                    </ol>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={openModal}
                      className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 mr-2.5"
                    >
                      Add Doctor
                    </button>
                    <button
                      onClick={openCompanyModal}
                      className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600"
                    >
                      Add Company
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddDoctorModal
        show={isModalVisible}
        closeModal={closeModal}
        room={room}
      />
      <AddCompanyModal
        show={isCompanyModalVisible}
        closeModal={closeCompanyModal}
        room={room}
      />
      <div
        className={
          "container mx-auto px-2 relative pb-14 flex flex-col " +
          (query.media == "true"
            ? "min-h-[calc(100vh-138px)]"
            : "h-[calc(100vh-138px)]")
        }
      >
        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-8">
          <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
            <div className="card shadow-none bg-transparent">
              <div className="card-body p-0">
                <div
                  className="h-40 relative dropdown p-4 rounded overflow-hidden"
                  ref={ref}
                >
                  <div
                    className="absolute dropdown-toggle cursor-pointer inset-0 h-40 rounded bg-cover bg-[url(/assets/images/banner-2.jpg)] flex items-center justify-center"
                    onClick={onToggleMenu}
                  >
                    <h1 className="text-4xxl text-white">
                      {query.media != "true" ? "Chat" : "Media"}
                    </h1>
                  </div>
                  <div
                    className={
                      "dropdown-menu dropdown-menu-center z-50 my-1 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800" +
                      (showMenu ? "" : " hidden")
                    }
                  >
                    <ul className="py-1">
                      <li className="border-b">
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              media: "",
                            },
                          }}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                        >
                          {query.media != "true" ? (
                            <TbCheck className="inline-block mr-1.5" />
                          ) : (
                            ""
                          )}{" "}
                          Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              media: "true",
                            },
                          }}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                        >
                          {query.media == "true" ? (
                            <TbCheck className="inline-block mr-1.5" />
                          ) : (
                            ""
                          )}{" "}
                          Media
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              media: "",
                              record: "true"
                            },
                          }}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                        >
                          {query.record == "true" ? (
                            <TbCheck className="inline-block mr-1.5" />
                          ) : (
                            ""
                          )}{" "}
                          Record
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {query.media != "true" ? (
          <div className="flex h-full shadow-sm mb-4 rounded-lg overflow-hidden flex-grow">
            {chatClient && (
              <Chat client={chatClient!} theme={`team light`}>
                <ChannelListContainer
                  {...{
                    isCreating,
                    filters,
                    options,
                    setCreateType,
                    setIsCreating,
                    setIsEditing,
                    sort,
                    roomName: room?.channel.name!,
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
              </Chat>
            )}
          </div>
        ) : (
          <div>
            <button
              className="text-gray-500 text-lg mb-2.5"
              onClick={onCreateMedia}
            >
              <TbCirclePlus className="inline-block" /> Add new
            </button>
            {token && (
              <StreamApp
                apiKey={process.env.NEXT_PUBLIC_STREAM_KEY as string}
                appId={process.env.NEXT_PUBLIC_STREAM_APP as string}
                token={token}
              >
                {/* <StatusUpdateForm /> */}
                <FlatFeed<DefaultUT, ActivityType>
                  feedGroup="room_media"
                  userId={id}
                  notify
                  options={{
                    limit: 12,
                    withRecentReactions: true,
                  }}
                  doReactionAddRequest={onAddReactionRequest}
                  doReactionDeleteRequest={onDeleteReactionRequest}
                  LoadingIndicator={(loadingIndicatorProps) => (
                    <div className="col-span-12">
                      <DefaultLoadingIndicator {...loadingIndicatorProps} />
                    </div>
                  )}
                  Paginator={(loadmorePaginatorProps) => {
                    return (
                      <LoadMorePaginator
                        {...loadmorePaginatorProps}
                        LoadMoreButton={({
                          onClick,
                          refreshing = false,
                          children,
                          className,
                          style,
                        }) => (
                          <div className="col-span-12 flex justify-center">
                            <div
                              className={`raf-load-more-button ${className}`}
                              style={style}
                            >
                              <button
                                className="raf-button raf-button--info"
                                onClick={onClick}
                                disabled={refreshing}
                              >
                                {refreshing ? (
                                  <DefaultLoadingIndicator
                                    backgroundColor="rgba(255,255,255,0.1)"
                                    color="rgba(255,255,255,0.4)"
                                  />
                                ) : (
                                  "Load More"
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      />
                    );
                  }}
                  Activity={(activityProps) => {
                    return (
                      <div className="col-span-12">
                        <Media {...activityProps} />
                      </div>
                    );
                  }}
                />
              </StreamApp>
            )}
          </div>
        )}

        <Footer />
      </div>

      <MediaCreateModal
        room={id}
        showModal={mediaModal}
        onHideModal={() => showMediaModal(false)}
      />
    </>
  );
};

SingleRoom.authenticate = true;

export default SingleRoom;
