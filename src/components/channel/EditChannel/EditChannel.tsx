import { useEffect, useMemo, useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "../CreateChannel/UserList";

import { CloseCreateChannel } from "@/assets/icons";

import type {
  ChannelFilters,
  ChannelMemberResponse,
  UserResponse,
} from "stream-chat";

import type { TeamChatGenerics } from "@/types";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectTagsList } from "@/lib/store/tags";
import Image from "next/image";
import { Storage } from "aws-amplify";
import { resizeImage } from "@/utils";

type InputDescProps = {
  channelDesc: string;
  setChannelDesc: (value: React.SetStateAction<string>) => void;
};

const ChannelDescInput: React.FC<InputDescProps> = (props) => {
  const { channelDesc = "", setChannelDesc } = props;
  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    event.preventDefault();
    setChannelDesc(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Description</p>
      <textarea rows={5} onChange={handleChange} value={channelDesc} />
      {/* <p>Add Members</p> */}
    </div>
  );
};

type InputOwnerProps = {
  channelOwner: string;
  setChannelOwner: (value: React.SetStateAction<string>) => void;
  members: ChannelMemberResponse<TeamChatGenerics>[];
};

const ChannelOwnerInput: React.FC<InputOwnerProps> = (props) => {
  const { channelOwner = "", setChannelOwner, members } = props;
  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    // console.log(event.target.value);
    event.preventDefault();
    setChannelOwner(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Owner</p>
      <select onChange={handleChange} value={channelOwner}>
        <option value="">None</option>
        <optgroup label="List of doctors">
          {members
            .filter((member) => member.user?.role === "doctor")
            .map((member, index) => {
              const user = member.user as UserResponse & {
                firstName: string;
                lastName: string;
              };

              return (
                <option key={index} value={member.user_id}>
                  {user.firstName || user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.name}
                </option>
              );
            })}
        </optgroup>
        <optgroup label="List of users (in the room)">
          {members
            .filter((member) => member.user?.role === "user")
            .map((member, index) => {
              const user = member.user as UserResponse & {
                firstName: string;
                lastName: string;
              };

              return (
                <option key={index} value={member.user_id}>
                  {user.firstName || user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.name}
                </option>
              );
            })}
        </optgroup>
      </select>
    </div>
  );
};

type InputProps = {
  channelName: string;
  setChannelName: (value: React.SetStateAction<string>) => void;
};

const ChannelNameInput: React.FC<InputProps> = (props) => {
  const { channelName = "", setChannelName } = props;

  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        onChange={handleChange}
        placeholder="Channel Name"
        type="text"
        value={channelName}
      />
      {/* <p>Add Members</p> */}
    </div>
  );
};
type InputTagProps = {
  channelTag: string;
  setChannelTag: (value: React.SetStateAction<string>) => void;
};

const ChannelTagInput: React.FC<InputTagProps> = (props) => {
  const { channelTag = "", setChannelTag } = props;
  const tags = useSelector(selectTagsList);
  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    // console.log(event.target.value);
    event.preventDefault();
    setChannelTag(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>User tag</p>
      <select onChange={handleChange} value={channelTag}>
        <option value="">None</option>
        {tags.map((tag, index) => (
          <option key={index} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  );
};

type InputTimeProps = {
  channelTime: string;
  minTime?: string;
  desc: string;
  setChannelTime: (value: React.SetStateAction<string>) => void;
};

const ChannelTimeInput: React.FC<InputTimeProps> = (props) => {
  const { channelTime = "", setChannelTime, desc = "", minTime } = props;
  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    event.preventDefault();
    setChannelTime(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>{desc}</p>
      <input
        type="datetime-local"
        min={minTime}
        value={channelTime}
        onChange={handleChange}
      />
      {/* <p>Add Members</p> */}
    </div>
  );
};

type InputPublishProps = {
  channelPublish: boolean;
  setChannelPublish: (value: React.SetStateAction<boolean>) => void;
};

const ChannelPublishInput: React.FC<InputPublishProps> = (props) => {
  const { channelPublish = false, setChannelPublish } = props;
  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    // console.log(event.target.value);
    event.preventDefault();
    setChannelPublish(event.target.value == "private");
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Publish Settings</p>
      <select onChange={handleChange} value={channelPublish ? "private" : ""}>
        <option value="">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
  );
};

const isoToLocal = (isoString: string) => {
  const date = new Date(isoString);

  // Get components in local time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format date to 'YYYY-MM-DDTHH:MM' in local time
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDateTime;
};

type InputImageProps = {
  preview?: string;
  setChannelImage: (file: File) => void;
};

const CHannelImageInput: React.FC<InputImageProps> = ({
  preview,
  setChannelImage,
}) => {
  return (
    <div className="channel-name-input__wrapper">
      <p>Icon</p>
      <label className="rounded-lg block w-[80px] h-[80px] p-2 bg-white">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setChannelImage(e.target.files![0])}
        />
        <Image
          className="w-full h-full object-cover"
          height={64}
          width={64}
          src={preview ?? "/assets/images/default_channel.png"}
          alt="画像"
        />
      </label>
    </div>
  );
};

type Props = {
  filters: ChannelFilters[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditChannel: React.FC<Props> = (props) => {
  const { filters, setIsEditing } = props;
  const roomId = useSearchParams().get("id");

  const { client, channel } = useChatContext<TeamChatGenerics>();

  const [channelPublish, setChannelPublish] = useState<boolean>(
    channel?.data?.private as boolean
  );
  const [channelName, setChannelName] = useState<string>(
    channel?.data?.name || (channel?.data?.id as string)
  );
  const [channelDesc, setChannelDesc] = useState(
    (channel?.data?.description as string) ?? ""
  );
  const [channelOwner, setChannelOwner] = useState(
    (channel?.data?.owner as string) ?? ""
  );
  const [channelTag, setChannelTag] = useState(
    (channel?.data?.tag as string) ?? ""
  );
  const [roomMembers, setRoomMembers] = useState<
    ChannelMemberResponse<TeamChatGenerics>[]
  >([]);
  const [channelStart, setChannelStart] = useState(
    isoToLocal(channel?.data?.startTime as string) ?? ""
  );
  const [channelEnd, setChannelEnd] = useState(
    isoToLocal(channel?.data?.endTime as string) ?? ""
  );
  const [channelImage, setChannelImage] = useState<File>();
  // const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>();

  useEffect(() => {
    channel?.data?.room;
    const getRoomMembers = async () => {
      try {
        const data = await client.channel("room", roomId).queryMembers({});

        setRoomMembers(data.members);
      } catch (e) {
        console.error(e);
      }
    };

    if (client) {
      getRoomMembers();
    }
  }, [client, roomId]);

  const previewImage = useMemo(() => {
    if (channelImage) {
      return URL.createObjectURL(channelImage);
    }
    return channel?.data?.image as string;
  }, [channelImage, channel]);

  const updateChannel = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();

    const nameChanged =
      channelName !== (channel?.data?.name || channel?.data?.id);

    let newImage;

    if (channelImage) {
      Storage.configure({
        region: "ap-northeast-1",
        bucket: "doceonewfb798f78a5bb417495ce5a866313554d214353-prod",
      });
      const resized = await resizeImage(channelImage, 500, 500);
      let res = await Storage.put(channelImage?.name, resized, {
        level: "public",
      });
      newImage = (await Storage.get(res.key)).split("?")[0];
    }

    // if (nameChanged) {
    await channel?.updatePartial({
      set: {
        name: channelName,
        image: newImage,
        description: channelDesc,
        owner: channelOwner,
        private: channelPublish,
      },
    });
    // }

    // if (selectedUsers?.length) {
    // 	const users = selectedUsers.map((user) => user);
    // 	await channel?.addMembers(users);
    // }

    setChannelName("");
    setIsEditing(false);
    // setSelectedUsers(undefined);
  };

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel {...{ setIsEditing }} />
      </div>
      <CHannelImageInput
        preview={previewImage}
        setChannelImage={setChannelImage}
      />
      <ChannelPublishInput {...{ channelPublish, setChannelPublish }} />
      <ChannelTimeInput
        {...{
          channelTime: channelStart,
          setChannelTime: setChannelStart,
          desc: "Start Time",
        }}
      />
      <ChannelTimeInput
        {...{
          channelTime: channelEnd,
          setChannelTime: setChannelEnd,
          minTime: channelStart,
          desc: "End Time",
        }}
      />
      <ChannelNameInput {...{ channelName, setChannelName }} />
      <ChannelDescInput {...{ channelDesc, setChannelDesc }} />
      <ChannelTagInput {...{ channelTag, setChannelTag }} />
      <ChannelOwnerInput
        {...{ channelOwner, setChannelOwner, members: roomMembers }}
      />
      {/* <UserList {...{ filters, setSelectedUsers }} /> */}
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};
