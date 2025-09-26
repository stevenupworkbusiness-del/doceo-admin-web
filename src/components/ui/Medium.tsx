import React, {
  useRef,
  useState,
} from "react";
import { EnrichedReaction } from "getstream";
import {
  Gallery,
  useFeedContext,
} from "react-activity-feed";
import {
  TbDots,
  TbFile,
} from "react-icons/tb";
import { useClickAway } from "react-use";
import MediumEditModal from "./modals/MediumEditModal";

const Medium: React.FC<{
  activity: any;
  item: EnrichedReaction;
}> = ({ item, activity }) => {
  const { feedManager } = useFeedContext();
  const [showMenu, toggleMenu] = useState(false);
  const [showEditModal, toggleEditModal] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    toggleMenu(false);
  });

  const onDeleteMedium = async () => {
    if (window.confirm("Are you sure you want to remove this post?")) {
      feedManager.onRemoveReaction("items", activity, item.id);
    }
  };

  function getFilenameFromUrl(url: string) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // Get last part of the pathname as it will be the filename
    // Decode the URI component to handle special characters if any
    return decodeURIComponent(
      pathname.substring(pathname.lastIndexOf("/") + 1)
    );
  }

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
      <div className="card h-full bg-[#D4D4D4] rounded-none">
        <div className="card-body flex flex-col h-full">
          <div className="flex items-center mb-6">
            <h5 className="font-medium mt-0 dark:text-slate-200 text-slate-500">
              {item.data.title as string}
            </h5>
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
                      onClick={onDeleteMedium}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex bg-white p-4">
            <>
              <p
                className="mr-2.5 flex-1"
                dangerouslySetInnerHTML={{
                  __html: item.data.text as string,
                }}
              ></p>
              {item.data.filePath &&
                (item.data.fileType == "pdf" ? (
                  <a
                    className="flex items-center text-sm w-1/3"
                    href={item.data.filePath as string}
                  >
                    <TbFile className="text-lg" />{" "}
                    {getFilenameFromUrl(item.data.filePath as string)}
                  </a>
                ) : (
                  <Gallery
                    className="border-2 rounded border-slate-200 mb-2.5 w-1/3"
                    images={[item.data.filePath as string]}
                  />
                ))}
            </>
          </div>
        </div>
      </div>

      {showEditModal && (
        <MediumEditModal item={item} onHideModal={onHideEditModal} />
      )}
    </>
  );
};

export default Medium;
