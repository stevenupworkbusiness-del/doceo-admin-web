import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { CreateUserToken } from '@/graphql/queries';
import { API, Auth } from 'aws-amplify';
import { ICognitoUser, Messages, TeamChatGenerics } from "@/types";
import { Channel, ChannelResponse, StreamChat } from "stream-chat";

export function getAvatarText(username: string | undefined) {
  return username
    ?.split(" ")
    .slice(0, 2)
    .map((str) => str[0].toUpperCase())
    .join("");
}

export function getRandomId(name: string) {
  return uuidv4();
}

export function getFormattedDate(input: Date | string) {
  let now = moment(Date.now());
  let date = moment(input).utc(true);

  if (date.diff(now, "weeks") > -1) {
    return date.fromNow();
  }
  return date.format("YYYY/MM/DD");
}

export function getUserAge(birthday: string) {
  if (!birthday) return "Unknown";

  let now = moment(Date.now()),
    date = moment(birthday),
    diff = now.diff(date, "years");

  return Math.floor(diff / 10) * 10 + "'s";
}

export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = function () {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob from canvas"));
          return;
        }

        const resizedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        resolve(resizedFile);
      }, file.type);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
}

export const getToken = (id: string, name: string) => {
  return API.graphql({
    query: CreateUserToken,
    variables: {
      id: id,
      name: name,
      apiKey: process.env.NEXT_PUBLIC_STREAM_KEY,
      apiSecret: 'Secret Key'
    }
  });
};

export const sumUpMessages = (messages: Messages) => {
  let numOfMessages: number = 0;
  if (messages) {
    const keys = Object.keys(messages);
    keys.forEach(value => {
      numOfMessages += messages[value].length
    });
  }
  return messages !== null ? numOfMessages : 0;
}

export const normalizeUrl = (url: string): string => {
  if (url && !/^https?:\/\//i.test(url)) {
    return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  return url;
};

export const handleFileUpload = async (file: File, setVideoUrl: React.Dispatch<React.SetStateAction<string>>, setFileType: React.Dispatch<React.SetStateAction<"image" | "video">>) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    console.log("data: ", data);

    let url = normalizeUrl(data.url);

    setVideoUrl(url);
    setFileType(file.type.startsWith("image/") ? "image" : "video");
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Failed to upload file");
  }
};

export const getCurrentUserId = async (currentUser: ICognitoUser, chatClient: StreamChat<TeamChatGenerics>): Promise<string> => {
  let userId = currentUser?.id;
  
  if (!userId) {
    userId = chatClient?._user?.id;
  }
  
  if (!userId) {
    userId = localStorage.getItem("userId");
  }
  
  if (!userId) {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      userId = currentUser.username || currentUser.attributes?.sub;
    } catch (error) {
      console.log("Error getting authenticated user:", error);
    }
  }
  
  if (!userId) {
    throw new Error("User ID not found. Please ensure you are logged in.");
  }
  
  return userId;
};

export const createRecordingSettingsChannel = async (chatClient: StreamChat<TeamChatGenerics>, roomId: string) => {
  const channel = chatClient.channel("recording_settings", roomId);
  await channel.watch();
  return channel;
};

export const updateChannelWithEvent = async (chatClient: StreamChat<TeamChatGenerics>, channel: Channel<TeamChatGenerics>, channelData: any) => {
  await channel.update(channelData, { text: "Channel Updated" });
  await channel.query({ state: true });
  chatClient.dispatchEvent({
    type: "channel.updated",
    channel_type: "recording_settings",
    channel_id: channel.id,
    channel: channel.data as ChannelResponse<TeamChatGenerics>,
    message: {
      id: `settings-update-${Date.now()}`,
      text: "Settings updated",
      user_id: chatClient.userID || "",
      created_at: new Date().toISOString(),
      type: "regular",
    },
  });
};

export const errorHandler = (error: unknown, context: string) => {
  const message = error instanceof Error ? error.message : "An unknown error occurred";
  console.error(`Error in ${context}:`, error);
  return message;
};

export const preventDefaultAndStopPropagation = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};