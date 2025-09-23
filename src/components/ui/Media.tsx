import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Activity, type EnrichedUser } from "getstream";
import {
  type ActivityProps,
  type DefaultUT,
  Gallery,
  CommentField,
  LikeButton,
  CommentList,
  ReactionToggleIcon,
  useStreamContext,
  useFeedContext,
  DefaultAT,
} from "react-activity-feed";
import {
  TbDots,
  TbAlertTriangle,
  TbMessages,
  TbHeart,
  TbCircleCheck,
  TbChartBar,
  TbThumbUp,
  TbFile,
  TbCirclePlus,
} from "react-icons/tb";
import Image from "next/image";
import { getAvatarText, getFormattedDate, getUserAge } from "@/utils";
import { ActivityType } from "@/types";
import Dropdown from "@/components/ui/Dropdown";
import { useSelector } from "react-redux";
import { selectTagsList } from "@/lib/store/tags";
import { selectRoomList } from "@/lib/store/rooms";
import axios from "axios";
import moment from "moment";
import { useAuth } from "@/lib/hooks/useAuth";
import CommentsModal from "./modals/CommentsModal";
import Medium from "./Medium";
import MediumCreateModal from "./modals/MediumCreateModal";
import { useClickAway } from "react-use";
import MediaEditModal from "./modals/MediaEditModal";

const Media: React.FC<ActivityProps<DefaultUT, ActivityType>> = ({
  activity,
  feedGroup,
  userId,
  ...props
}) => {
  const user = activity.actor as EnrichedUser;
  const { feedManager } = useFeedContext();
  const [showModal, toggleModal] = useState(false);
  const [showEditModal, toggleEditModal] = useState(false);
  const [showMenu, toggleMenu] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    toggleMenu(false);
  });

  const onDeleteMedia = async () => {
    if (window.confirm("Are you sure you want to remove this post?")) {
      try {
        const { data: res } = await axios.post("/api/feed-delete", {
          user_id: user.id,
          activity_id: activity.id,
          slug: "media",
        });
        feedManager.onRemoveActivity(res.removed);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onAddMedium = () => {
    toggleModal(true);
  };

  const onHideModal = () => {
    toggleModal(false);
  };

  const onShowMenu = () => {
    toggleMenu(true);
  };

  const onEdit = () => {
    toggleEditModal(true);
  };

  const onHideEditModal = () => {
    toggleEditModal(false);
  };

  return (
    <>
      <div className="card h-full bg-[#ECECEC] rounded-none">
        <div className={"card-body flex flex-col h-full pr-0"}>
          <div className="flex items-center mb-6">
            <h5
              className="font-medium mt-0 dark:text-slate-200 text-slate-500"
              dangerouslySetInnerHTML={{ __html: activity.message }}
            ></h5>
            <div className="relative dropdown ml-auto" ref={ref}>
              <button className="text-slate-400 ml-auto" onClick={onShowMenu}>
                <TbDots className="text-xl" />
              </button>

              <div
                className={
                  "dropdown-menu dropdown-menu-right z-50 my-1 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800" +
                  (showMenu ? "" : " hidden")
                }
              >
                <ul>
                  <li>
                    <button
                      className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                      onClick={onEdit}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                      onClick={onDeleteMedia}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex pl-6 items-start">
            <button
              className="text-gray-500 text-lg mr-5"
              onClick={onAddMedium}
            >
              <TbCirclePlus />
            </button>
            <ul className="flex-1">
              {activity.latest_reactions &&
                activity.latest_reactions["items"] &&
                activity.latest_reactions["items"].map((item, index) => (
                  <li className="mb-4 last:mb-0" key={index}>
                    <Medium activity={activity} item={item} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {showModal && (
        <MediumCreateModal activity={activity} onHideModal={onHideModal} />
      )}
      {showEditModal && (
        <MediaEditModal
          id={activity.foreign_id}
          time={activity.time}
          text={activity.message}
          onHideModal={onHideEditModal}
        />
      )}
    </>
  );
};

export default Media;
