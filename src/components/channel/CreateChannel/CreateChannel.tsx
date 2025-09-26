import { useEffect, useMemo, useState } from "react";
import { useChatContext } from "stream-chat-react";
import Image from "next/image";

import { CloseCreateChannel } from "@/assets/icons";

import type {
  Channel,
  ChannelFilters,
  ChannelMemberResponse,
  UserResponse,
} from "stream-chat";

import type { TeamChatGenerics } from "@/types";
import { getRandomId, resizeImage } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectTagsList } from "@/lib/store/tags";
import { Storage } from "aws-amplify";

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
        placeholder="Channel name"
        type="text"
        value={channelName}
      />
      {/* <p>Add Members</p> */}
    </div>
  );
};

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
                  {user.name ?? "Unnamed"}
                </option>
              );
            })}
        </optgroup>
      </select>
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

const ChannelUserInput: React.FC<InputOwnerProps> = (props) => {
  const { channelOwner = "", setChannelOwner, members } = props;
  const handleChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    console.log(event.target.value);
    event.preventDefault();
    setChannelOwner(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>User Select</p>
      <select onChange={handleChange} value={channelOwner} required>
        {members
          .filter((member) => member.user?.role === "user")
          .map((member, index) => {
            const user = member.user as UserResponse & {
              firstName: string;
              lastName: string;
            };

            return (
              <option key={index} value={member.user_id}>
                {user.name ?? "Unnamed"}
              </option>
            );
          })}
      </select>
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
  createType: string;
  filters: ChannelFilters[];
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  channel: Channel<TeamChatGenerics> | undefined;
};

export const CreateChannel: React.FC<Props> = (props) => {
  const { createType, setIsCreating } = props;
  const roomId = useSearchParams().get("id");

  const { client, setActiveChannel } = useChatContext<TeamChatGenerics>();

  const [channelPublish, setChannelPublish] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDesc, setChannelDesc] = useState("");
  const [channelOwner, setChannelOwner] = useState("");
  const [channelTag, setChannelTag] = useState("");
  const [channelStart, setChannelStart] = useState("");
  const [channelEnd, setChannelEnd] = useState("");
  const [channelImage, setChannelImage] = useState<File>();
  const [roomMembers, setRoomMembers] = useState<
    ChannelMemberResponse<TeamChatGenerics>[]
  >([]);

  useEffect(() => {
    const getRoomMembers = async () => {
      try {
        const data = await client.channel("room", roomId).queryMembers({
          id: { $ne: client.userID ?? "" },
        });

        setRoomMembers(data.members);
      } catch (e) {
        console.error(e);
      }
    };

    if (client) {
      getRoomMembers();
    }
  }, [client, roomId]);

  const createChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      let channelData: Record<string, any> = {};

      if (createType == "messaging") {
        channelData = {
          name: roomMembers.find((user) => user.user_id == channelOwner)?.user
            ?.name,
          members: [channelOwner, client.userID],
        };
      }

      if (channelImage) {
        Storage.configure({
          region: "ap-northeast-1",
          bucket: "doceonewfb798f78a5bb417495ce5a866313554d214353-prod",
        });
        const resized = await resizeImage(channelImage, 500, 500);
        let res = await Storage.put(channelImage?.name, resized, {
          level: "public",
        });
        channelData["image"] = (await Storage.get(res.key)).split("?")[0];
      }
      // return;
      // const membersIDList = channel?.state?.members ? Object.values(channel?.state?.members).map(member => member.user_id as string) : [];
      const newChannel = await client.channel(
        createType,
        getRandomId(channelName),
        {
          name: channelName,
          description: channelDesc,
          owner: channelOwner,
          tag: channelTag,
          members: channelOwner ? [channelOwner] : [],
          room: roomId,
          private: channelPublish,
          startTime: channelStart
            ? new Date(channelStart).toISOString()
            : undefined,
          endTime: channelEnd ? new Date(channelEnd).toISOString() : undefined,
          ...channelData,
        }
      );

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setActiveChannel(newChannel);
      if (channelImage) {
        setChannelImage(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const previewImage = useMemo(() => {
    if (channelImage) {
      return URL.createObjectURL(channelImage);
    }
    return undefined;
  }, [channelImage]);

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>Create a New Channel</p>
        <CloseCreateChannel {...{ setIsCreating }} />
      </div>
      {createType != "messaging" && (
        <>
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
              minTime: channelStart,
              setChannelTime: setChannelEnd,
              desc: "End Time",
            }}
          />
          <ChannelNameInput {...{ channelName, setChannelName }} />
          <ChannelDescInput {...{ channelDesc, setChannelDesc }} />
          <ChannelTagInput {...{ channelTag, setChannelTag }} />
          <ChannelOwnerInput
            {...{ channelOwner, setChannelOwner, members: roomMembers }}
          />
        </>
      )}
      {createType == "messaging" && (
        <ChannelUserInput
          {...{ channelOwner, setChannelOwner, members: roomMembers }}
        />
      )}
      {/* <UserList {...{ filters, setSelectedUsers }} /> */}
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>Create Channel</p>
      </div>
    </div>
  );
};
