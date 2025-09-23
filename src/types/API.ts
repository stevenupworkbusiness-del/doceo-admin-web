/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type BatchCreateUserTag = {
  id?: string | null,
  userId: string,
  tagId: string,
};

export type UserTag = {
  __typename: "UserTag",
  id: string,
  userId: string,
  tagId: string,
  tag?: Tag | null,
  createdAt: string,
  updatedAt: string,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  name: string,
  users?: ModelUserTagConnection | null,
  feedsCount?: number | null,
  categoryId?: string | null,
  category?: Category | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserTagConnection = {
  __typename: "ModelUserTagConnection",
  items:  Array<UserTag | null >,
  nextToken?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  order?: number | null,
  description?: string | null,
  image?: string | null,
  tags?: ModelTagConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type UpdateCategoryOrder = {
  id: string,
  order?: number | null,
  name: string,
  description?: string | null,
  image?: string | null,
  createdAt: string,
};

export type CreateHospitalInput = {
  id?: string | null,
  name?: string | null,
  address?: string | null,
  homePageUrl?: string | null,
  logo?: string | null,
  introductionImage?: string | null,
};

export type ModelHospitalConditionInput = {
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  homePageUrl?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  introductionImage?: ModelStringInput | null,
  and?: Array< ModelHospitalConditionInput | null > | null,
  or?: Array< ModelHospitalConditionInput | null > | null,
  not?: ModelHospitalConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Hospital = {
  __typename: "Hospital",
  id: string,
  name?: string | null,
  address?: string | null,
  homePageUrl?: string | null,
  logo?: string | null,
  introductionImage?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateHospitalInput = {
  id: string,
  name?: string | null,
  address?: string | null,
  homePageUrl?: string | null,
  logo?: string | null,
  introductionImage?: string | null,
};

export type DeleteHospitalInput = {
  id: string,
};

export type CreateSpecialtyInput = {
  id?: string | null,
  specialty: string,
};

export type ModelSpecialtyConditionInput = {
  specialty?: ModelStringInput | null,
  and?: Array< ModelSpecialtyConditionInput | null > | null,
  or?: Array< ModelSpecialtyConditionInput | null > | null,
  not?: ModelSpecialtyConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Specialty = {
  __typename: "Specialty",
  id: string,
  specialty: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSpecialtyInput = {
  id: string,
  specialty?: string | null,
};

export type DeleteSpecialtyInput = {
  id: string,
};

export type CreateMedicalSpecialistInput = {
  id?: string | null,
  medicalSpecialist: string,
};

export type ModelMedicalSpecialistConditionInput = {
  medicalSpecialist?: ModelStringInput | null,
  and?: Array< ModelMedicalSpecialistConditionInput | null > | null,
  or?: Array< ModelMedicalSpecialistConditionInput | null > | null,
  not?: ModelMedicalSpecialistConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type MedicalSpecialist = {
  __typename: "MedicalSpecialist",
  id: string,
  medicalSpecialist: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMedicalSpecialistInput = {
  id: string,
  medicalSpecialist?: string | null,
};

export type DeleteMedicalSpecialistInput = {
  id: string,
};

export type CreateTroubleInput = {
  id?: string | null,
  trouble: string,
};

export type ModelTroubleConditionInput = {
  trouble?: ModelStringInput | null,
  and?: Array< ModelTroubleConditionInput | null > | null,
  or?: Array< ModelTroubleConditionInput | null > | null,
  not?: ModelTroubleConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Trouble = {
  __typename: "Trouble",
  id: string,
  trouble: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTroubleInput = {
  id: string,
  trouble?: string | null,
};

export type DeleteTroubleInput = {
  id: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  type: string,
  channel?: string | null,
  text: string,
};

export type ModelNotificationConditionInput = {
  type?: ModelStringInput | null,
  channel?: ModelStringInput | null,
  text?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  type: string,
  channel?: string | null,
  text: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNotificationInput = {
  id: string,
  type?: string | null,
  channel?: string | null,
  text?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type CreatePointHistoryInput = {
  id?: string | null,
  type: string,
  point: number,
  userId: string,
  text: string,
  doctorId?: string | null,
  messageId?: string | null,
};

export type ModelPointHistoryConditionInput = {
  type?: ModelStringInput | null,
  point?: ModelIntInput | null,
  userId?: ModelStringInput | null,
  text?: ModelStringInput | null,
  doctorId?: ModelStringInput | null,
  messageId?: ModelStringInput | null,
  and?: Array< ModelPointHistoryConditionInput | null > | null,
  or?: Array< ModelPointHistoryConditionInput | null > | null,
  not?: ModelPointHistoryConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type PointHistory = {
  __typename: "PointHistory",
  id: string,
  type: string,
  point: number,
  userId: string,
  text: string,
  doctorId?: string | null,
  messageId?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePointHistoryInput = {
  id: string,
  type?: string | null,
  point?: number | null,
  userId?: string | null,
  text?: string | null,
  doctorId?: string | null,
  messageId?: string | null,
};

export type DeletePointHistoryInput = {
  id: string,
};

export type CreateRoomSuggestionInput = {
  id?: string | null,
  userId: string,
  roomId: string,
  suggestion: string,
};

export type ModelRoomSuggestionConditionInput = {
  userId?: ModelStringInput | null,
  roomId?: ModelStringInput | null,
  suggestion?: ModelStringInput | null,
  and?: Array< ModelRoomSuggestionConditionInput | null > | null,
  or?: Array< ModelRoomSuggestionConditionInput | null > | null,
  not?: ModelRoomSuggestionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type RoomSuggestion = {
  __typename: "RoomSuggestion",
  id: string,
  userId: string,
  roomId: string,
  suggestion: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRoomSuggestionInput = {
  id: string,
  userId?: string | null,
  roomId?: string | null,
  suggestion?: string | null,
};

export type DeleteRoomSuggestionInput = {
  id: string,
};

export type CreateTagInput = {
  id?: string | null,
  name: string,
  feedsCount?: number | null,
  categoryId?: string | null,
};

export type ModelTagConditionInput = {
  name?: ModelStringInput | null,
  feedsCount?: ModelIntInput | null,
  categoryId?: ModelIDInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateTagInput = {
  id: string,
  name?: string | null,
  feedsCount?: number | null,
  categoryId?: string | null,
};

export type DeleteTagInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  name: string,
  order?: number | null,
  description?: string | null,
  image?: string | null,
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  order?: ModelIntInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  name?: string | null,
  order?: number | null,
  description?: string | null,
  image?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateUserTagInput = {
  id?: string | null,
  userId: string,
  tagId: string,
};

export type ModelUserTagConditionInput = {
  userId?: ModelStringInput | null,
  tagId?: ModelIDInput | null,
  and?: Array< ModelUserTagConditionInput | null > | null,
  or?: Array< ModelUserTagConditionInput | null > | null,
  not?: ModelUserTagConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserTagInput = {
  id: string,
  userId?: string | null,
  tagId?: string | null,
};

export type DeleteUserTagInput = {
  id: string,
};

export type CreateQuestionnaireInput = {
  id?: string | null,
  roomId: string,
  question: string,
};

export type ModelQuestionnaireConditionInput = {
  roomId?: ModelStringInput | null,
  question?: ModelStringInput | null,
  and?: Array< ModelQuestionnaireConditionInput | null > | null,
  or?: Array< ModelQuestionnaireConditionInput | null > | null,
  not?: ModelQuestionnaireConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Questionnaire = {
  __typename: "Questionnaire",
  id: string,
  roomId: string,
  question: string,
  users?: ModelUserQuestionnaireConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserQuestionnaireConnection = {
  __typename: "ModelUserQuestionnaireConnection",
  items:  Array<UserQuestionnaire | null >,
  nextToken?: string | null,
};

export type UserQuestionnaire = {
  __typename: "UserQuestionnaire",
  id: string,
  userId: string,
  questionId: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateQuestionnaireInput = {
  id: string,
  roomId?: string | null,
  question?: string | null,
};

export type DeleteQuestionnaireInput = {
  id: string,
};

export type CreateUserQuestionnaireInput = {
  id?: string | null,
  userId: string,
  questionId: string,
};

export type ModelUserQuestionnaireConditionInput = {
  userId?: ModelStringInput | null,
  questionId?: ModelIDInput | null,
  and?: Array< ModelUserQuestionnaireConditionInput | null > | null,
  or?: Array< ModelUserQuestionnaireConditionInput | null > | null,
  not?: ModelUserQuestionnaireConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserQuestionnaireInput = {
  id: string,
  userId?: string | null,
  questionId?: string | null,
};

export type DeleteUserQuestionnaireInput = {
  id: string,
};

export type UpdateUserDeviceInput = {
  id: string,
  userId?: string | null,
  token?: string | null,
};

export type ModelUserDeviceConditionInput = {
  userId?: ModelStringInput | null,
  token?: ModelStringInput | null,
  and?: Array< ModelUserDeviceConditionInput | null > | null,
  or?: Array< ModelUserDeviceConditionInput | null > | null,
  not?: ModelUserDeviceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UserDevice = {
  __typename: "UserDevice",
  id: string,
  userId: string,
  token: string,
  createdAt: string,
  updatedAt: string,
};

export type DeleteUserDeviceInput = {
  id: string,
};

export type UpdateMembershipInput = {
  id: string,
  email?: string | null,
  room?: string | null,
  price?: number | null,
};

export type ModelMembershipConditionInput = {
  email?: ModelStringInput | null,
  room?: ModelStringInput | null,
  price?: ModelIntInput | null,
  and?: Array< ModelMembershipConditionInput | null > | null,
  or?: Array< ModelMembershipConditionInput | null > | null,
  not?: ModelMembershipConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Membership = {
  __typename: "Membership",
  id: string,
  email: string,
  room: string,
  price: number,
  createdAt: string,
  updatedAt: string,
};

export type CreateUserDeviceInput = {
  id?: string | null,
  userId: string,
  token: string,
};

export type CreateMembershipInput = {
  id?: string | null,
  email: string,
  room: string,
  price: number,
};

export type DeleteMembershipInput = {
  id: string,
};

export type CreateUserTokenResponse = {
  __typename: "CreateUserTokenResponse",
  token: string,
  rooms:  Array<ChannelDetail | null >,
};

export type ChannelDetail = {
  __typename: "ChannelDetail",
  channel: Channel,
  members:  Array<Member | null >,
  messages:  Array<Message | null >,
};

export type Channel = {
  __typename: "Channel",
  id: string,
  type?: string | null,
  image?: string | null,
  name?: string | null,
  description?: string | null,
  feedsCount?: number | null,
  doctorFeedsCount?: number | null,
  researchFeedsCount?: number | null,
  questions?: Array< string | null > | null,
  tags?: Array< string | null > | null,
  owner?: string | null,
  disabled?: boolean | null,
  frozen?: boolean | null,
  category?: string | null,
  subcat?: string | null,
  intractable?: string | null,
  billable?: boolean | null,
  checkout_url?: string | null,
  price?: string | null,
  price_desc?: string | null,
  startTime?: string | null,
  endTime?: string | null,
  terms?: string | null,
  isCustomTerm?: string | null,
};

export type Member = {
  __typename: "Member",
  user_id?: string | null,
  user?: User | null,
  role?: string | null,
};

export type User = {
  __typename: "User",
  name?: string | null,
  role?: string | null,
  image?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  category?: string | null,
};

export type Message = {
  __typename: "Message",
  type?: string | null,
  author_name?: string | null,
  text?: string | null,
};

export type ModelSpecialtyFilterInput = {
  id?: ModelIDInput | null,
  specialty?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSpecialtyFilterInput | null > | null,
  or?: Array< ModelSpecialtyFilterInput | null > | null,
  not?: ModelSpecialtyFilterInput | null,
};

export type ModelSpecialtyConnection = {
  __typename: "ModelSpecialtyConnection",
  items:  Array<Specialty | null >,
  nextToken?: string | null,
};

export type ModelMedicalSpecialistFilterInput = {
  id?: ModelIDInput | null,
  medicalSpecialist?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMedicalSpecialistFilterInput | null > | null,
  or?: Array< ModelMedicalSpecialistFilterInput | null > | null,
  not?: ModelMedicalSpecialistFilterInput | null,
};

export type ModelMedicalSpecialistConnection = {
  __typename: "ModelMedicalSpecialistConnection",
  items:  Array<MedicalSpecialist | null >,
  nextToken?: string | null,
};

export type ModelTroubleFilterInput = {
  id?: ModelIDInput | null,
  trouble?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTroubleFilterInput | null > | null,
  or?: Array< ModelTroubleFilterInput | null > | null,
  not?: ModelTroubleFilterInput | null,
};

export type ModelTroubleConnection = {
  __typename: "ModelTroubleConnection",
  items:  Array<Trouble | null >,
  nextToken?: string | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  channel?: ModelStringInput | null,
  text?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type ModelPointHistoryFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  point?: ModelIntInput | null,
  userId?: ModelStringInput | null,
  text?: ModelStringInput | null,
  doctorId?: ModelStringInput | null,
  messageId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPointHistoryFilterInput | null > | null,
  or?: Array< ModelPointHistoryFilterInput | null > | null,
  not?: ModelPointHistoryFilterInput | null,
};

export type ModelPointHistoryConnection = {
  __typename: "ModelPointHistoryConnection",
  items:  Array<PointHistory | null >,
  nextToken?: string | null,
};

export type ModelRoomSuggestionFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  roomId?: ModelStringInput | null,
  suggestion?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRoomSuggestionFilterInput | null > | null,
  or?: Array< ModelRoomSuggestionFilterInput | null > | null,
  not?: ModelRoomSuggestionFilterInput | null,
};

export type ModelRoomSuggestionConnection = {
  __typename: "ModelRoomSuggestionConnection",
  items:  Array<RoomSuggestion | null >,
  nextToken?: string | null,
};

export type ModelUserTagFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  tagId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserTagFilterInput | null > | null,
  or?: Array< ModelUserTagFilterInput | null > | null,
  not?: ModelUserTagFilterInput | null,
};

export type ModelQuestionnaireFilterInput = {
  id?: ModelIDInput | null,
  roomId?: ModelStringInput | null,
  question?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelQuestionnaireFilterInput | null > | null,
  or?: Array< ModelQuestionnaireFilterInput | null > | null,
  not?: ModelQuestionnaireFilterInput | null,
};

export type ModelQuestionnaireConnection = {
  __typename: "ModelQuestionnaireConnection",
  items:  Array<Questionnaire | null >,
  nextToken?: string | null,
};

export type ModelUserQuestionnaireFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  questionId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserQuestionnaireFilterInput | null > | null,
  or?: Array< ModelUserQuestionnaireFilterInput | null > | null,
  not?: ModelUserQuestionnaireFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserQuestionnaireByQuestionCompositeKeyConditionInput = {
  eq?: ModelUserQuestionnaireByQuestionCompositeKeyInput | null,
  le?: ModelUserQuestionnaireByQuestionCompositeKeyInput | null,
  lt?: ModelUserQuestionnaireByQuestionCompositeKeyInput | null,
  ge?: ModelUserQuestionnaireByQuestionCompositeKeyInput | null,
  gt?: ModelUserQuestionnaireByQuestionCompositeKeyInput | null,
  between?: Array< ModelUserQuestionnaireByQuestionCompositeKeyInput | null > | null,
  beginsWith?: ModelUserQuestionnaireByQuestionCompositeKeyInput | null,
};

export type ModelUserQuestionnaireByQuestionCompositeKeyInput = {
  questionId?: string | null,
  userId?: string | null,
};

export type ModelHospitalFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  address?: ModelStringInput | null,
  homePageUrl?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  introductionImage?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelHospitalFilterInput | null > | null,
  or?: Array< ModelHospitalFilterInput | null > | null,
  not?: ModelHospitalFilterInput | null,
};

export type ModelHospitalConnection = {
  __typename: "ModelHospitalConnection",
  items:  Array<Hospital | null >,
  nextToken?: string | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  feedsCount?: ModelIntInput | null,
  categoryId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  order?: ModelIntInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type ModelUserDeviceFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  token?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserDeviceFilterInput | null > | null,
  or?: Array< ModelUserDeviceFilterInput | null > | null,
  not?: ModelUserDeviceFilterInput | null,
};

export type ModelUserDeviceConnection = {
  __typename: "ModelUserDeviceConnection",
  items:  Array<UserDevice | null >,
  nextToken?: string | null,
};

export type ModelMembershipFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  room?: ModelStringInput | null,
  price?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMembershipFilterInput | null > | null,
  or?: Array< ModelMembershipFilterInput | null > | null,
  not?: ModelMembershipFilterInput | null,
};

export type ModelMembershipConnection = {
  __typename: "ModelMembershipConnection",
  items:  Array<Membership | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionSpecialtyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  specialty?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSpecialtyFilterInput | null > | null,
  or?: Array< ModelSubscriptionSpecialtyFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionMedicalSpecialistFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  medicalSpecialist?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMedicalSpecialistFilterInput | null > | null,
  or?: Array< ModelSubscriptionMedicalSpecialistFilterInput | null > | null,
};

export type ModelSubscriptionTroubleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  trouble?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTroubleFilterInput | null > | null,
  or?: Array< ModelSubscriptionTroubleFilterInput | null > | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  channel?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
};

export type ModelSubscriptionPointHistoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  point?: ModelSubscriptionIntInput | null,
  userId?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  doctorId?: ModelSubscriptionStringInput | null,
  messageId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPointHistoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionPointHistoryFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionRoomSuggestionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  roomId?: ModelSubscriptionStringInput | null,
  suggestion?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRoomSuggestionFilterInput | null > | null,
  or?: Array< ModelSubscriptionRoomSuggestionFilterInput | null > | null,
};

export type ModelSubscriptionUserTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  tagId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserTagFilterInput | null > | null,
};

export type ModelSubscriptionQuestionnaireFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  roomId?: ModelSubscriptionStringInput | null,
  question?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuestionnaireFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionnaireFilterInput | null > | null,
};

export type ModelSubscriptionUserQuestionnaireFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  questionId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserQuestionnaireFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserQuestionnaireFilterInput | null > | null,
};

export type ModelSubscriptionHospitalFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  homePageUrl?: ModelSubscriptionStringInput | null,
  logo?: ModelSubscriptionStringInput | null,
  introductionImage?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionHospitalFilterInput | null > | null,
  or?: Array< ModelSubscriptionHospitalFilterInput | null > | null,
};

export type ModelSubscriptionTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  feedsCount?: ModelSubscriptionIntInput | null,
  categoryId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionTagFilterInput | null > | null,
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  order?: ModelSubscriptionIntInput | null,
  description?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionCategoryFilterInput | null > | null,
};

export type ModelSubscriptionUserDeviceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  token?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserDeviceFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserDeviceFilterInput | null > | null,
};

export type ModelSubscriptionMembershipFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  room?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMembershipFilterInput | null > | null,
  or?: Array< ModelSubscriptionMembershipFilterInput | null > | null,
};

export type BatchCreateUserTagMutationVariables = {
  tags?: Array< BatchCreateUserTag | null > | null,
};

export type BatchCreateUserTagMutation = {
  batchCreateUserTag?:  Array< {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null > | null,
};

export type BatchDeleteUserTagMutationVariables = {
  deleteIds?: Array< string > | null,
};

export type BatchDeleteUserTagMutation = {
  batchDeleteUserTag?:  Array< {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null > | null,
};

export type AddToCollectionMutationVariables = {
  foreignId: string,
  time: string,
  userId: string,
  targetId: string,
};

export type AddToCollectionMutation = {
  addToCollection?: string | null,
};

export type UpdateCategoryOrderMutationVariables = {
  categories?: Array< UpdateCategoryOrder | null > | null,
};

export type UpdateCategoryOrderMutation = {
  updateCategoryOrder?:  Array< {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null > | null,
};

export type CreateHospitalMutationVariables = {
  input: CreateHospitalInput,
  condition?: ModelHospitalConditionInput | null,
};

export type CreateHospitalMutation = {
  createHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHospitalMutationVariables = {
  input: UpdateHospitalInput,
  condition?: ModelHospitalConditionInput | null,
};

export type UpdateHospitalMutation = {
  updateHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHospitalMutationVariables = {
  input: DeleteHospitalInput,
  condition?: ModelHospitalConditionInput | null,
};

export type DeleteHospitalMutation = {
  deleteHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSpecialtyMutationVariables = {
  input: CreateSpecialtyInput,
  condition?: ModelSpecialtyConditionInput | null,
};

export type CreateSpecialtyMutation = {
  createSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSpecialtyMutationVariables = {
  input: UpdateSpecialtyInput,
  condition?: ModelSpecialtyConditionInput | null,
};

export type UpdateSpecialtyMutation = {
  updateSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSpecialtyMutationVariables = {
  input: DeleteSpecialtyInput,
  condition?: ModelSpecialtyConditionInput | null,
};

export type DeleteSpecialtyMutation = {
  deleteSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMedicalSpecialistMutationVariables = {
  input: CreateMedicalSpecialistInput,
  condition?: ModelMedicalSpecialistConditionInput | null,
};

export type CreateMedicalSpecialistMutation = {
  createMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMedicalSpecialistMutationVariables = {
  input: UpdateMedicalSpecialistInput,
  condition?: ModelMedicalSpecialistConditionInput | null,
};

export type UpdateMedicalSpecialistMutation = {
  updateMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMedicalSpecialistMutationVariables = {
  input: DeleteMedicalSpecialistInput,
  condition?: ModelMedicalSpecialistConditionInput | null,
};

export type DeleteMedicalSpecialistMutation = {
  deleteMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTroubleMutationVariables = {
  input: CreateTroubleInput,
  condition?: ModelTroubleConditionInput | null,
};

export type CreateTroubleMutation = {
  createTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTroubleMutationVariables = {
  input: UpdateTroubleInput,
  condition?: ModelTroubleConditionInput | null,
};

export type UpdateTroubleMutation = {
  updateTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTroubleMutationVariables = {
  input: DeleteTroubleInput,
  condition?: ModelTroubleConditionInput | null,
};

export type DeleteTroubleMutation = {
  deleteTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePointHistoryMutationVariables = {
  input: CreatePointHistoryInput,
  condition?: ModelPointHistoryConditionInput | null,
};

export type CreatePointHistoryMutation = {
  createPointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePointHistoryMutationVariables = {
  input: UpdatePointHistoryInput,
  condition?: ModelPointHistoryConditionInput | null,
};

export type UpdatePointHistoryMutation = {
  updatePointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePointHistoryMutationVariables = {
  input: DeletePointHistoryInput,
  condition?: ModelPointHistoryConditionInput | null,
};

export type DeletePointHistoryMutation = {
  deletePointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRoomSuggestionMutationVariables = {
  input: CreateRoomSuggestionInput,
  condition?: ModelRoomSuggestionConditionInput | null,
};

export type CreateRoomSuggestionMutation = {
  createRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRoomSuggestionMutationVariables = {
  input: UpdateRoomSuggestionInput,
  condition?: ModelRoomSuggestionConditionInput | null,
};

export type UpdateRoomSuggestionMutation = {
  updateRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRoomSuggestionMutationVariables = {
  input: DeleteRoomSuggestionInput,
  condition?: ModelRoomSuggestionConditionInput | null,
};

export type DeleteRoomSuggestionMutation = {
  deleteRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserTagMutationVariables = {
  input: CreateUserTagInput,
  condition?: ModelUserTagConditionInput | null,
};

export type CreateUserTagMutation = {
  createUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserTagMutationVariables = {
  input: UpdateUserTagInput,
  condition?: ModelUserTagConditionInput | null,
};

export type UpdateUserTagMutation = {
  updateUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserTagMutationVariables = {
  input: DeleteUserTagInput,
  condition?: ModelUserTagConditionInput | null,
};

export type DeleteUserTagMutation = {
  deleteUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQuestionnaireMutationVariables = {
  input: CreateQuestionnaireInput,
  condition?: ModelQuestionnaireConditionInput | null,
};

export type CreateQuestionnaireMutation = {
  createQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionnaireMutationVariables = {
  input: UpdateQuestionnaireInput,
  condition?: ModelQuestionnaireConditionInput | null,
};

export type UpdateQuestionnaireMutation = {
  updateQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionnaireMutationVariables = {
  input: DeleteQuestionnaireInput,
  condition?: ModelQuestionnaireConditionInput | null,
};

export type DeleteQuestionnaireMutation = {
  deleteQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserQuestionnaireMutationVariables = {
  input: CreateUserQuestionnaireInput,
  condition?: ModelUserQuestionnaireConditionInput | null,
};

export type CreateUserQuestionnaireMutation = {
  createUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserQuestionnaireMutationVariables = {
  input: UpdateUserQuestionnaireInput,
  condition?: ModelUserQuestionnaireConditionInput | null,
};

export type UpdateUserQuestionnaireMutation = {
  updateUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserQuestionnaireMutationVariables = {
  input: DeleteUserQuestionnaireInput,
  condition?: ModelUserQuestionnaireConditionInput | null,
};

export type DeleteUserQuestionnaireMutation = {
  deleteUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserDeviceMutationVariables = {
  input: UpdateUserDeviceInput,
  condition?: ModelUserDeviceConditionInput | null,
};

export type UpdateUserDeviceMutation = {
  updateUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserDeviceMutationVariables = {
  input: DeleteUserDeviceInput,
  condition?: ModelUserDeviceConditionInput | null,
};

export type DeleteUserDeviceMutation = {
  deleteUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMembershipMutationVariables = {
  input: UpdateMembershipInput,
  condition?: ModelMembershipConditionInput | null,
};

export type UpdateMembershipMutation = {
  updateMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserDeviceMutationVariables = {
  input: CreateUserDeviceInput,
  condition?: ModelUserDeviceConditionInput | null,
};

export type CreateUserDeviceMutation = {
  createUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMembershipMutationVariables = {
  input: CreateMembershipInput,
  condition?: ModelMembershipConditionInput | null,
};

export type CreateMembershipMutation = {
  createMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMembershipMutationVariables = {
  input: DeleteMembershipInput,
  condition?: ModelMembershipConditionInput | null,
};

export type DeleteMembershipMutation = {
  deleteMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserTokenQueryVariables = {
  id: string,
};

export type CreateUserTokenQuery = {
  CreateUserToken?:  {
    __typename: "CreateUserTokenResponse",
    token: string,
    rooms:  Array< {
      __typename: "ChannelDetail",
      channel:  {
        __typename: "Channel",
        id: string,
        type?: string | null,
        image?: string | null,
        name?: string | null,
        description?: string | null,
        feedsCount?: number | null,
        doctorFeedsCount?: number | null,
        researchFeedsCount?: number | null,
        questions?: Array< string | null > | null,
        tags?: Array< string | null > | null,
        owner?: string | null,
        disabled?: boolean | null,
        frozen?: boolean | null,
        category?: string | null,
        subcat?: string | null,
        intractable?: string | null,
        billable?: boolean | null,
        checkout_url?: string | null,
        price?: string | null,
        price_desc?: string | null,
        startTime?: string | null,
        endTime?: string | null,
        terms?: string | null,
        isCustomTerm?: string | null,
      },
      members:  Array< {
        __typename: "Member",
        user_id?: string | null,
        user?:  {
          __typename: "User",
          name?: string | null,
          role?: string | null,
          image?: string | null,
          firstName?: string | null,
          lastName?: string | null,
          category?: string | null,
        } | null,
        role?: string | null,
      } | null >,
      messages:  Array< {
        __typename: "Message",
        type?: string | null,
        author_name?: string | null,
        text?: string | null,
      } | null >,
    } | null >,
  } | null,
};

export type GetRoomChannelsQueryVariables = {
  room_id: string,
};

export type GetRoomChannelsQuery = {
  getRoomChannels:  Array< {
    __typename: "ChannelDetail",
    channel:  {
      __typename: "Channel",
      id: string,
      type?: string | null,
      image?: string | null,
      name?: string | null,
      description?: string | null,
      feedsCount?: number | null,
      doctorFeedsCount?: number | null,
      researchFeedsCount?: number | null,
      questions?: Array< string | null > | null,
      tags?: Array< string | null > | null,
      owner?: string | null,
      disabled?: boolean | null,
      frozen?: boolean | null,
      category?: string | null,
      subcat?: string | null,
      intractable?: string | null,
      billable?: boolean | null,
      checkout_url?: string | null,
      price?: string | null,
      price_desc?: string | null,
      startTime?: string | null,
      endTime?: string | null,
      terms?: string | null,
      isCustomTerm?: string | null,
    },
    members:  Array< {
      __typename: "Member",
      user_id?: string | null,
      user?:  {
        __typename: "User",
        name?: string | null,
        role?: string | null,
        image?: string | null,
        firstName?: string | null,
        lastName?: string | null,
        category?: string | null,
      } | null,
      role?: string | null,
    } | null >,
    messages:  Array< {
      __typename: "Message",
      type?: string | null,
      author_name?: string | null,
      text?: string | null,
    } | null >,
  } | null >,
};

export type SendPushNotificationQueryVariables = {
  type: string,
  channel: string,
  text: string,
};

export type SendPushNotificationQuery = {
  sendPushNotification?: boolean | null,
};

export type GetSpecialtyQueryVariables = {
  id: string,
};

export type GetSpecialtyQuery = {
  getSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSpecialtiesQueryVariables = {
  filter?: ModelSpecialtyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSpecialtiesQuery = {
  listSpecialties?:  {
    __typename: "ModelSpecialtyConnection",
    items:  Array< {
      __typename: "Specialty",
      id: string,
      specialty: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMedicalSpecialistQueryVariables = {
  id: string,
};

export type GetMedicalSpecialistQuery = {
  getMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMedicalSpecialistsQueryVariables = {
  filter?: ModelMedicalSpecialistFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMedicalSpecialistsQuery = {
  listMedicalSpecialists?:  {
    __typename: "ModelMedicalSpecialistConnection",
    items:  Array< {
      __typename: "MedicalSpecialist",
      id: string,
      medicalSpecialist: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTroubleQueryVariables = {
  id: string,
};

export type GetTroubleQuery = {
  getTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTroublesQueryVariables = {
  filter?: ModelTroubleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTroublesQuery = {
  listTroubles?:  {
    __typename: "ModelTroubleConnection",
    items:  Array< {
      __typename: "Trouble",
      id: string,
      trouble: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type: string,
      channel?: string | null,
      text: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPointHistoryQueryVariables = {
  id: string,
};

export type GetPointHistoryQuery = {
  getPointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPointHistoriesQueryVariables = {
  filter?: ModelPointHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPointHistoriesQuery = {
  listPointHistories?:  {
    __typename: "ModelPointHistoryConnection",
    items:  Array< {
      __typename: "PointHistory",
      id: string,
      type: string,
      point: number,
      userId: string,
      text: string,
      doctorId?: string | null,
      messageId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRoomSuggestionQueryVariables = {
  id: string,
};

export type GetRoomSuggestionQuery = {
  getRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRoomSuggestionsQueryVariables = {
  filter?: ModelRoomSuggestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoomSuggestionsQuery = {
  listRoomSuggestions?:  {
    __typename: "ModelRoomSuggestionConnection",
    items:  Array< {
      __typename: "RoomSuggestion",
      id: string,
      userId: string,
      roomId: string,
      suggestion: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserTagQueryVariables = {
  id: string,
};

export type GetUserTagQuery = {
  getUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserTagsQueryVariables = {
  filter?: ModelUserTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserTagsQuery = {
  listUserTags?:  {
    __typename: "ModelUserTagConnection",
    items:  Array< {
      __typename: "UserTag",
      id: string,
      userId: string,
      tagId: string,
      tag?:  {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetQuestionnaireQueryVariables = {
  id: string,
};

export type GetQuestionnaireQuery = {
  getQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionnairesQueryVariables = {
  filter?: ModelQuestionnaireFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionnairesQuery = {
  listQuestionnaires?:  {
    __typename: "ModelQuestionnaireConnection",
    items:  Array< {
      __typename: "Questionnaire",
      id: string,
      roomId: string,
      question: string,
      users?:  {
        __typename: "ModelUserQuestionnaireConnection",
        items:  Array< {
          __typename: "UserQuestionnaire",
          id: string,
          userId: string,
          questionId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQuestionnaireQueryVariables = {
  id: string,
};

export type GetUserQuestionnaireQuery = {
  getUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserQuestionnairesQueryVariables = {
  filter?: ModelUserQuestionnaireFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserQuestionnairesQuery = {
  listUserQuestionnaires?:  {
    __typename: "ModelUserQuestionnaireConnection",
    items:  Array< {
      __typename: "UserQuestionnaire",
      id: string,
      userId: string,
      questionId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserTagsByUserIdAndTagIdQueryVariables = {
  userId: string,
  tagId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserTagsByUserIdAndTagIdQuery = {
  userTagsByUserIdAndTagId?:  {
    __typename: "ModelUserTagConnection",
    items:  Array< {
      __typename: "UserTag",
      id: string,
      userId: string,
      tagId: string,
      tag?:  {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserTagsByTagIdAndUserIdQueryVariables = {
  tagId: string,
  userId?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserTagsByTagIdAndUserIdQuery = {
  userTagsByTagIdAndUserId?:  {
    __typename: "ModelUserTagConnection",
    items:  Array< {
      __typename: "UserTag",
      id: string,
      userId: string,
      tagId: string,
      tag?:  {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserQuestionnairesByIdAndQuestionIdAndUserIdQueryVariables = {
  id: string,
  questionIdUserId?: ModelUserQuestionnaireByQuestionCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserQuestionnaireFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserQuestionnairesByIdAndQuestionIdAndUserIdQuery = {
  userQuestionnairesByIdAndQuestionIdAndUserId?:  {
    __typename: "ModelUserQuestionnaireConnection",
    items:  Array< {
      __typename: "UserQuestionnaire",
      id: string,
      userId: string,
      questionId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHospitalQueryVariables = {
  id: string,
};

export type GetHospitalQuery = {
  getHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHospitalsQueryVariables = {
  filter?: ModelHospitalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHospitalsQuery = {
  listHospitals?:  {
    __typename: "ModelHospitalConnection",
    items:  Array< {
      __typename: "Hospital",
      id: string,
      name?: string | null,
      address?: string | null,
      homePageUrl?: string | null,
      logo?: string | null,
      introductionImage?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TagsByCategoryIdQueryVariables = {
  categoryId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TagsByCategoryIdQuery = {
  tagsByCategoryId?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserDeviceQueryVariables = {
  id: string,
};

export type GetUserDeviceQuery = {
  getUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserDevicesQueryVariables = {
  filter?: ModelUserDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserDevicesQuery = {
  listUserDevices?:  {
    __typename: "ModelUserDeviceConnection",
    items:  Array< {
      __typename: "UserDevice",
      id: string,
      userId: string,
      token: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserDevicesByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserDevicesByUserIdQuery = {
  userDevicesByUserId?:  {
    __typename: "ModelUserDeviceConnection",
    items:  Array< {
      __typename: "UserDevice",
      id: string,
      userId: string,
      token: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMembershipQueryVariables = {
  id: string,
};

export type GetMembershipQuery = {
  getMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMembershipsQueryVariables = {
  filter?: ModelMembershipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMembershipsQuery = {
  listMemberships?:  {
    __typename: "ModelMembershipConnection",
    items:  Array< {
      __typename: "Membership",
      id: string,
      email: string,
      room: string,
      price: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSpecialtySubscriptionVariables = {
  filter?: ModelSubscriptionSpecialtyFilterInput | null,
};

export type OnCreateSpecialtySubscription = {
  onCreateSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSpecialtySubscriptionVariables = {
  filter?: ModelSubscriptionSpecialtyFilterInput | null,
};

export type OnUpdateSpecialtySubscription = {
  onUpdateSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSpecialtySubscriptionVariables = {
  filter?: ModelSubscriptionSpecialtyFilterInput | null,
};

export type OnDeleteSpecialtySubscription = {
  onDeleteSpecialty?:  {
    __typename: "Specialty",
    id: string,
    specialty: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMedicalSpecialistSubscriptionVariables = {
  filter?: ModelSubscriptionMedicalSpecialistFilterInput | null,
};

export type OnCreateMedicalSpecialistSubscription = {
  onCreateMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMedicalSpecialistSubscriptionVariables = {
  filter?: ModelSubscriptionMedicalSpecialistFilterInput | null,
};

export type OnUpdateMedicalSpecialistSubscription = {
  onUpdateMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMedicalSpecialistSubscriptionVariables = {
  filter?: ModelSubscriptionMedicalSpecialistFilterInput | null,
};

export type OnDeleteMedicalSpecialistSubscription = {
  onDeleteMedicalSpecialist?:  {
    __typename: "MedicalSpecialist",
    id: string,
    medicalSpecialist: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTroubleSubscriptionVariables = {
  filter?: ModelSubscriptionTroubleFilterInput | null,
};

export type OnCreateTroubleSubscription = {
  onCreateTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTroubleSubscriptionVariables = {
  filter?: ModelSubscriptionTroubleFilterInput | null,
};

export type OnUpdateTroubleSubscription = {
  onUpdateTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTroubleSubscriptionVariables = {
  filter?: ModelSubscriptionTroubleFilterInput | null,
};

export type OnDeleteTroubleSubscription = {
  onDeleteTrouble?:  {
    __typename: "Trouble",
    id: string,
    trouble: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    channel?: string | null,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePointHistorySubscriptionVariables = {
  filter?: ModelSubscriptionPointHistoryFilterInput | null,
};

export type OnCreatePointHistorySubscription = {
  onCreatePointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePointHistorySubscriptionVariables = {
  filter?: ModelSubscriptionPointHistoryFilterInput | null,
};

export type OnUpdatePointHistorySubscription = {
  onUpdatePointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePointHistorySubscriptionVariables = {
  filter?: ModelSubscriptionPointHistoryFilterInput | null,
};

export type OnDeletePointHistorySubscription = {
  onDeletePointHistory?:  {
    __typename: "PointHistory",
    id: string,
    type: string,
    point: number,
    userId: string,
    text: string,
    doctorId?: string | null,
    messageId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRoomSuggestionSubscriptionVariables = {
  filter?: ModelSubscriptionRoomSuggestionFilterInput | null,
};

export type OnCreateRoomSuggestionSubscription = {
  onCreateRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRoomSuggestionSubscriptionVariables = {
  filter?: ModelSubscriptionRoomSuggestionFilterInput | null,
};

export type OnUpdateRoomSuggestionSubscription = {
  onUpdateRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRoomSuggestionSubscriptionVariables = {
  filter?: ModelSubscriptionRoomSuggestionFilterInput | null,
};

export type OnDeleteRoomSuggestionSubscription = {
  onDeleteRoomSuggestion?:  {
    __typename: "RoomSuggestion",
    id: string,
    userId: string,
    roomId: string,
    suggestion: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserTagSubscriptionVariables = {
  filter?: ModelSubscriptionUserTagFilterInput | null,
};

export type OnCreateUserTagSubscription = {
  onCreateUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserTagSubscriptionVariables = {
  filter?: ModelSubscriptionUserTagFilterInput | null,
};

export type OnUpdateUserTagSubscription = {
  onUpdateUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserTagSubscriptionVariables = {
  filter?: ModelSubscriptionUserTagFilterInput | null,
};

export type OnDeleteUserTagSubscription = {
  onDeleteUserTag?:  {
    __typename: "UserTag",
    id: string,
    userId: string,
    tagId: string,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      users?:  {
        __typename: "ModelUserTagConnection",
        items:  Array< {
          __typename: "UserTag",
          id: string,
          userId: string,
          tagId: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      feedsCount?: number | null,
      categoryId?: string | null,
      category?:  {
        __typename: "Category",
        id: string,
        name: string,
        order?: number | null,
        description?: string | null,
        image?: string | null,
        tags?:  {
          __typename: "ModelTagConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionnaireSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionnaireFilterInput | null,
};

export type OnCreateQuestionnaireSubscription = {
  onCreateQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionnaireSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionnaireFilterInput | null,
};

export type OnUpdateQuestionnaireSubscription = {
  onUpdateQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionnaireSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionnaireFilterInput | null,
};

export type OnDeleteQuestionnaireSubscription = {
  onDeleteQuestionnaire?:  {
    __typename: "Questionnaire",
    id: string,
    roomId: string,
    question: string,
    users?:  {
      __typename: "ModelUserQuestionnaireConnection",
      items:  Array< {
        __typename: "UserQuestionnaire",
        id: string,
        userId: string,
        questionId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserQuestionnaireSubscriptionVariables = {
  filter?: ModelSubscriptionUserQuestionnaireFilterInput | null,
};

export type OnCreateUserQuestionnaireSubscription = {
  onCreateUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserQuestionnaireSubscriptionVariables = {
  filter?: ModelSubscriptionUserQuestionnaireFilterInput | null,
};

export type OnUpdateUserQuestionnaireSubscription = {
  onUpdateUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserQuestionnaireSubscriptionVariables = {
  filter?: ModelSubscriptionUserQuestionnaireFilterInput | null,
};

export type OnDeleteUserQuestionnaireSubscription = {
  onDeleteUserQuestionnaire?:  {
    __typename: "UserQuestionnaire",
    id: string,
    userId: string,
    questionId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHospitalSubscriptionVariables = {
  filter?: ModelSubscriptionHospitalFilterInput | null,
};

export type OnCreateHospitalSubscription = {
  onCreateHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHospitalSubscriptionVariables = {
  filter?: ModelSubscriptionHospitalFilterInput | null,
};

export type OnUpdateHospitalSubscription = {
  onUpdateHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHospitalSubscriptionVariables = {
  filter?: ModelSubscriptionHospitalFilterInput | null,
};

export type OnDeleteHospitalSubscription = {
  onDeleteHospital?:  {
    __typename: "Hospital",
    id: string,
    name?: string | null,
    address?: string | null,
    homePageUrl?: string | null,
    logo?: string | null,
    introductionImage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    users?:  {
      __typename: "ModelUserTagConnection",
      items:  Array< {
        __typename: "UserTag",
        id: string,
        userId: string,
        tagId: string,
        tag?:  {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    feedsCount?: number | null,
    categoryId?: string | null,
    category?:  {
      __typename: "Category",
      id: string,
      name: string,
      order?: number | null,
      description?: string | null,
      image?: string | null,
      tags?:  {
        __typename: "ModelTagConnection",
        items:  Array< {
          __typename: "Tag",
          id: string,
          name: string,
          feedsCount?: number | null,
          categoryId?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscriptionVariables = {
  filter?: ModelSubscriptionCategoryFilterInput | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    order?: number | null,
    description?: string | null,
    image?: string | null,
    tags?:  {
      __typename: "ModelTagConnection",
      items:  Array< {
        __typename: "Tag",
        id: string,
        name: string,
        users?:  {
          __typename: "ModelUserTagConnection",
          nextToken?: string | null,
        } | null,
        feedsCount?: number | null,
        categoryId?: string | null,
        category?:  {
          __typename: "Category",
          id: string,
          name: string,
          order?: number | null,
          description?: string | null,
          image?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionUserDeviceFilterInput | null,
};

export type OnCreateUserDeviceSubscription = {
  onCreateUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionUserDeviceFilterInput | null,
};

export type OnUpdateUserDeviceSubscription = {
  onUpdateUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserDeviceSubscriptionVariables = {
  filter?: ModelSubscriptionUserDeviceFilterInput | null,
};

export type OnDeleteUserDeviceSubscription = {
  onDeleteUserDevice?:  {
    __typename: "UserDevice",
    id: string,
    userId: string,
    token: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMembershipSubscriptionVariables = {
  filter?: ModelSubscriptionMembershipFilterInput | null,
};

export type OnCreateMembershipSubscription = {
  onCreateMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMembershipSubscriptionVariables = {
  filter?: ModelSubscriptionMembershipFilterInput | null,
};

export type OnUpdateMembershipSubscription = {
  onUpdateMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMembershipSubscriptionVariables = {
  filter?: ModelSubscriptionMembershipFilterInput | null,
};

export type OnDeleteMembershipSubscription = {
  onDeleteMembership?:  {
    __typename: "Membership",
    id: string,
    email: string,
    room: string,
    price: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
