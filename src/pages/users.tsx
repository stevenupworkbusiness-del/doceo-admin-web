import Footer from "@/components/layout/Footer";
import { GraphQLQuery } from "@aws-amplify/api";
import UsersFilterModal from "@/components/ui/modals/UsersFileterModal";
import { selectRoomList } from "@/lib/store/rooms";
import {
  ListUserTagsQuery,
  TeamChatGenerics,
  TeamUserType,
} from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Auth, API } from "aws-amplify";
import { useChatClient } from "@/lib/getstream/context";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingIndicator } from "stream-chat-react";
import { UserResponse } from "stream-chat";
import axios from "axios";
import { getFormattedDate } from "@/utils";
import { listUserTags } from "@/graphql/queries";
import moment from "moment";
import { TbTrash } from "react-icons/tb";

const Users = () => {
  const router = useRouter();
  const [filterModal, toggleFilters] = useState(false);
  const rooms = useSelector(selectRoomList);
  const chatClient = useChatClient()?.client;
  const [hasMore, setHasMore] = useState(true);
  const [nextToken, setNextToken] = useState("");
  const [userTags, setUserTags] = useState<Array<any>>([]);
  const [isLoading, setLoading] = useState(false);

  const [users, setUsers] = useState<
    Array<
      UserResponse<
        TeamChatGenerics & {
          userType: TeamUserType & {
            email: string;
            follower?: number;
            following?: number;
          };
        }
      >
    >
  >([]);

  useEffect(() => {
    if (chatClient && hasMore) {
      loadUsers();
    }
  }, [chatClient]);

  const getUserTags = (userId: string) => {
    return userTags.filter(
      (userTag) => userTag["userId"] == userId && userTag["tag"]
    );
  };

  const getUserRooms = (userId: string) => {
    return rooms.filter((room) =>
      room["members"].find((member: any) => member["user_id"] == userId)
    );
  };

  const filteredUsers = useMemo(() => {
    const sorted = [...users];
    sorted.sort((a, b) => (a.created_at! < b.created_at! ? 1 : -1));
    return sorted.filter((user) => {
      const query = router.query;

      if (query.sex && user.sex != query.sex) {
        return false;
      }

      if (query.age) {
        if (!user.birthday) return false;
        let now = moment(Date.now()),
          date = moment(user.birthday!),
          diff = now.diff(date, "years");
        let age = Math.floor(diff / 10) * 10;
        if (
          (query.age != "60+" && query.age != age.toString()) ||
          (query.age == "60+" && age < 60)
        ) {
          return false;
        }
      }

      if (query.tag) {
        const userTags = getUserTags(user.id);
        if (userTags.findIndex((userTag) => userTag.tagId == query.tag) < 0) {
          return false;
        }
      }

      if (query.room) {
        const userRooms = getUserRooms(user.id);
        if (
          userRooms.findIndex((room) => room["channel"]["id"] == query.room) < 0
        ) {
          return false;
        }
      }

      return true;
    });
  }, [router, users]);

  const loadUsers = async () => {
    if (!chatClient || isLoading) return;
    setLoading(true);

    try {
      const res = await API.get("AdminQueries", "/listUsersInGroup", {
        queryStringParameters: {
          groupname: "Users",
          token: nextToken,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      });

      const emails: Record<string, string> = {};
      const userIds = res.Users.map((user: any) => {
        const attrs = user["Attributes"];
        for (let i = 0; i < attrs.length; i++) {
          if (attrs[i].Name === "email") {
            emails[user["Username"]] = attrs[i].Value;
          }
        }
        return user["Username"];
      });

      const response = await chatClient!.queryUsers(
        { id: { $in: userIds } },
        {}
      );

      const resTags = await API.graphql<GraphQLQuery<ListUserTagsQuery>>({
        query: listUserTags,
        variables: {
          filter: {
            or: userIds.map((id: string) => {
              return {
                userId: { eq: id },
              };
            }),
          },
        },
      });
      if (resTags.data != null) {
        const data = resTags.data!.listUserTags!.items;
        setUserTags([...userTags, ...data]);
      }

      const { data } = await axios.post("/api/follow", {
        userIds: userIds,
      });
      const followStatus = data.followStatus;
      const mappedUsers = response.users.map((user) => {
        return {
          ...user,
          email: emails[user.id],
          following: followStatus[user.id]
            ? followStatus[user.id].following
            : 0,
          follower: followStatus[user.id] ? followStatus[user.id].follower : 0,
        };
      });
      setUsers([...users, ...mappedUsers]);

      if (res.NextToken) {
        setNextToken(res.NextToken);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    }
    setLoading(false);
  };

  const getAvatarUrl = (avatar?: string) => {
    if (!avatar) {
      return "/assets/images/default.png";
    } else if (avatar.startsWith("assets/")) {
      let path = avatar.split("/");
      return (
        "https://doceo-asset.s3.ap-northeast-1.amazonaws.com/user-icons/" +
        path[path.length - 1]
      );
    }
    return avatar;
  };

  const onRemoveUser = async (id: string) => {
    if (window.confirm("You want to remove this user?")) {
      try {
        const res = await API.post("AdminQueries", "/deleteUser", {
          body: {
            username: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`,
          },
        });

        setUsers(users.filter((user) => user.id !== id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <div className="container  mx-auto px-2">
        <div className="flex flex-wrap">
          <div className="flex items-center py-4 w-full">
            <div className="w-full">
              <div className="">
                <div className="flex flex-wrap justify-between">
                  <div className="items-center ">
                    <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                      Users
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
                      <li className="text-blue-600 hover:text-blue-700">
                        Users
                      </li>
                    </ol>
                  </div>
                  <div className="flex items-center">
                    <Image
                      src="/assets/images/select-doctor.svg"
                      alt="Users"
                      width={36}
                      height={36}
                    />
                    <span className="ml-6 text-2xl text-[#95A4B7] font-medium">
                      {users.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 min-h-[calc(100vh-138px)] relative pb-24">
        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-8">
          <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
            <div className="card shadow-none bg-transparent">
              <div className="card-body p-0">
                <div className="h-40 relative p-4 rounded overflow-hidden">
                  <div
                    className="absolute inset-0 h-40 rounded bg-[url(/assets/images/banner-2.jpg)] flex items-center justify-center cursor-pointer"
                    onClick={() => toggleFilters(true)}
                  >
                    <h1 className="absolute text-4xxl text-white">Users</h1>
                    <Image src="/assets/images/banner.jpg" alt="banner" className="w-full h-full object-cover" width={684} height={346} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <table className="w-full text-left text-gray-500 dark:text-gray-400">
            <thead className="border-b">
              <tr>
                <td className="pb-5 px-2.5">Icon</td>
                <td className="pb-5">Role</td>
                <td className="pb-5">Emails</td>
                <td className="pb-5">Registration Date</td>
                <td className="pb-5">Birthday</td>
                <td className="pb-5">Name</td>
                <td className="pb-5">Sex</td>
                <td className="pb-5">User Tag</td>
                <td className="pb-5">Follow / Follower</td>
                <td className="pb-5">Holding coin</td>
                <td width={120} className="pb-5">
                  Joined Room
                </td>
                <td className="pb-5">Posts</td>
                <td className="pb-5"></td>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id + index}
                  className={
                    "border-b" + (user.reported ? " bg-[#FFE5DA]" : "")
                  }
                >
                  <td className="py-[30px] px-2.5">
                    <Image
                      className="rounded-full bg-white"
                      src={getAvatarUrl(user.image)}
                      alt={user.name ?? "Avatar"}
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="py-[30px] capitalize">{user.role}</td>
                  <td className="py-[30px]">{user.email}</td>
                  <td className="py-[30px]">
                    {getFormattedDate(user.created_at!)}
                  </td>
                  <td className="py-[30px]">{user.birthday}</td>
                  <td className="py-[30px]">{user.name}</td>
                  <td className="py-[30px]">{user.sex}</td>
                  <td className="py-[30px]">
                    {getUserTags(user.id).map((userTag, index) => (
                      <span
                        key={index}
                        className="inline-block my-[5px] mr-2.5 text-sm bg-[rgba(227,227,227,0.68)] dark:bg-slate-700 px-4 py-1 rounded-[14px]"
                      >
                        {userTag["tag"]["name"]}
                      </span>
                    ))}
                  </td>
                  <td className="py-[30px]">
                    {user.following} / {user.follower}
                  </td>
                  <td className="py-[30px]">
                    <div className="flex items-center">
                      <Image
                        className="inline-block"
                        src="/assets/images/d-coin.png"
                        alt="d-coin"
                        width={27}
                        height={27}
                      />{" "}
                      {user.point ?? 0}
                    </div>
                  </td>
                  <td className="py-[30px]">
                    {getUserRooms(user.id).map((room, index) => (
                      <span
                        key={index}
                        className="inline-block my-[5px] mr-2.5 text-sm bg-[rgba(227,227,227,0.68)] dark:bg-slate-700 px-4 py-1 rounded-[14px]"
                      >
                        {room["channel"]["name"]}
                      </span>
                    ))}
                  </td>
                  <td className="py-[30px]">{user.feedCount ?? 0}</td>
                  <td className="py-[30px]">
                    <button onClick={() => onRemoveUser(user.id)}>
                      <TbTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InfiniteScroll
          style={{ overflow: "unset" }}
          dataLength={filteredUsers.length}
          next={loadUsers}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center">
              <LoadingIndicator size={36} />
            </div>
          }
        >
          <></>
        </InfiniteScroll>

        <Footer />
      </div>

      {filterModal && (
        <UsersFilterModal onHideModal={() => toggleFilters(false)} />
      )}
    </>
  );
};

Users.authenticate = true;

export default Users;
