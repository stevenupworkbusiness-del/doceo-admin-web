import Footer from "@/components/layout/Footer";
import { selectRoomList } from "@/lib/store/rooms";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import "react-activity-feed/dist/index.css";
import { useSelector } from "react-redux";
import {
  StreamApp,
  FlatFeed,
  DefaultUT,
  LoadMorePaginator,
} from "react-activity-feed";
import { LoadingIndicator as DefaultLoadingIndicator } from "react-file-utils";
import axios from "axios";
import Post from "@/components/ui/Post";
import { ActivityType } from "@/types";
import PostsFilterModal from "@/components/ui/modals/PostsFileterModal";
import { useRouter } from "next/router";
import {
  EnrichedActivity,
  EnrichedUser,
  ReactionAPIResponse,
} from "getstream";
import { selectTagsList } from "@/lib/store/tags";
import PostCreateModal from "@/components/ui/modals/PostCreateModal";
import { useAuth } from "@/lib/hooks/useAuth";

const Posts = () => {
  const [token, setToken] = useState("");
  const [filterModal, toggleFilters] = useState(false);
  const [createModal, toggleCreateModal] = useState(false);
  const router = useRouter();
  const tags = useSelector(selectTagsList);
  const rooms = useSelector(selectRoomList);
  const user = useAuth();

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.post("/api/token", {
          user_id: user?.username,
        });

        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    };

    if (user) getToken();
  }, [user]);

  const filtered = useCallback(
    (activity: EnrichedActivity & ActivityType) => {
      const query = router.query;

      if (query.verb && activity.verb !== query.verb) {
        return false;
      }

      if (query.tag && activity.usertag && activity.usertag !== query.tag) {
        return false;
      }

      if (query.room && activity.room && activity.room !== query.room) {
        return false;
      }

      return true;
    },
    [router]
  );

  const filteredText = useMemo(() => {
    const query = router.query;
    let text = "",
      filters = [];

    if (query.verb) {
      filters.push(query.verb == "tweet" ? "Tweets" : "Medical Records");
    }

    if (query.tag) {
      const tag = tags.find((tag) => tag.id === query.tag);
      filters.push("#" + (tag ? tag.name : "Unknown"));
    }

    if (query.room) {
      const room = rooms.find((room) => room.channel.id === query.room);
      filters.push(room?.channel.name);
    }

    text = filters.length > 0 ? filters.join(", ") : "All";

    return text;
  }, [router]);

  const onAddReactionRequest = async (
    kind: string,
    activity: EnrichedActivity,
    data: any
  ) => {
    if (kind == "like") {
      return axios
        .post<any, { data: ReactionAPIResponse }>("/api/like", {
          activity_id: activity.id,
          actor_id: (activity.actor as EnrichedUser).id,
          user_id: user?.username,
        })
        .then(({ data: user }) => {
          return Promise.resolve(user);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    }

    let button = document.querySelector(
      "form.raf-comment-field .raf-button"
    ) as HTMLButtonElement;
    button.disabled = true;
    return axios
      .post<any, { data: ReactionAPIResponse }>("/api/comment", {
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

  const onDeleteReactionRequest = async (id: string) => {
    return axios
      .post<any, { data: ReactionAPIResponse }>("/api/reaction-delete", {
        id: id,
      })
      .then(({ data: user }) => {
        return Promise.resolve(user);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
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
                      Posts
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
                        Posts
                      </li>
                    </ol>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        toggleCreateModal(true);
                      }}
                      className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600"
                    >
                      Create New
                    </button>
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
                  <div
                    className="absolute inset-0 h-40 rounded bg-[url(/assets/images/banner-2.jpg)] flex items-center justify-center cursor-pointer"
                    onClick={() => toggleFilters(true)}
                  >
                    <h1 className="text-4xxl text-white">{filteredText}</h1>
                    {/* <Image src="/assets/images/banner.jpg" alt="banner" className="w-full h-full object-cover" width={684} height={346} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
          {token && (
            <StreamApp
              apiKey={process.env.NEXT_PUBLIC_STREAM_KEY as string}
              appId={process.env.NEXT_PUBLIC_STREAM_APP as string}
              token={token}
            >
              {/* <StatusUpdateForm /> */}
              <FlatFeed<DefaultUT, ActivityType>
                feedGroup="user"
                userId={user?.username}
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
                  if (!filtered(activityProps.activity)) {
                    return <></>;
                  }

                  return (
                    <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
                      <Post {...activityProps} />
                    </div>
                  );
                }}
              />
            </StreamApp>
          )}
        </div>

        <Footer />
      </div>

      {filterModal && (
        <PostsFilterModal onHideModal={() => toggleFilters(false)} />
      )}

      {createModal && (
        <PostCreateModal onHideModal={() => toggleCreateModal(false)} />
      )}
    </>
  );
};

Posts.authenticate = true;

export default Posts;
