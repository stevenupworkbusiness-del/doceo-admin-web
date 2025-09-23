// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Hospital, Specialty, MedicalSpecialist, Trouble, Notification, PointHistory, RoomSuggestion, Tag, Category, UserTag, Questionnaire, UserQuestionnaire, Channel, User, Member, Message, ChannelDetail, CreateUserTokenResponse } = initSchema(schema);

export {
  Hospital,
  Specialty,
  MedicalSpecialist,
  Trouble,
  Notification,
  PointHistory,
  RoomSuggestion,
  Tag,
  Category,
  UserTag,
  Questionnaire,
  UserQuestionnaire,
  Channel,
  User,
  Member,
  Message,
  ChannelDetail,
  CreateUserTokenResponse
};