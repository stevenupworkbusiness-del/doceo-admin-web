import {
  LiteralStringForUnion,
  StreamChat,
  ChannelFilters,
  ChannelSort,
} from "stream-chat";
import type { DefaultAT } from "react-activity-feed";

export * from "./API";

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  username: string;
}

export interface IVerifyData {
  code: string;
}

export interface ICognitoUser {
  id: string;
  attributes: {
    sub: string;
    email: string;
    preferred_username: string;
    "custom:isSuperAdmin": string;
  };
  username: string;
}

/** Getstream Types  */
export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = {
  image?: string;
  birthday?: string;
  sex?: string;
  point?: number;
  feedCount?: number;
  reported?: boolean;
};

export type TeamChatGenerics = {
  attachmentType: TeamAttachmentType;
  channelType: TeamChannelType;
  commandType: TeamCommandType;
  eventType: TeamEventType;
  messageType: TeamMessageType;
  reactionType: TeamReactionType;
  userType: TeamUserType;
};

export type ActivityType = DefaultAT & {
  emotion: string;
  message: string;
  attachments: string[];
  filePath: string;
  hospital: string;
  drug: string;
  doctorIcon: string;
  doctorName: string;
  reason: string;
  usertag: string;
  room: string;
  survey: string;
  choices: string;
  period: string;
};
