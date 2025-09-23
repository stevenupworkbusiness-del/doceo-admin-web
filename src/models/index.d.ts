import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";



type EagerChannel = {
  readonly id: string;
  readonly type?: string | null;
  readonly image?: string | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly feedsCount?: number | null;
  readonly doctorFeedsCount?: number | null;
  readonly questions?: (string | null)[] | null;
  readonly tags?: (string | null)[] | null;
  readonly owner?: string | null;
  readonly disabled?: boolean | null;
  readonly category?: string | null;
}

type LazyChannel = {
  readonly id: string;
  readonly type?: string | null;
  readonly image?: string | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly feedsCount?: number | null;
  readonly doctorFeedsCount?: number | null;
  readonly questions?: (string | null)[] | null;
  readonly tags?: (string | null)[] | null;
  readonly owner?: string | null;
  readonly disabled?: boolean | null;
  readonly category?: string | null;
}

export declare type Channel = LazyLoading extends LazyLoadingDisabled ? EagerChannel : LazyChannel

export declare const Channel: (new (init: ModelInit<Channel>) => Channel)

type EagerUser = {
  readonly name?: string | null;
  readonly role?: string | null;
  readonly image?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
}

type LazyUser = {
  readonly name?: string | null;
  readonly role?: string | null;
  readonly image?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User)

type EagerMember = {
  readonly user_id?: string | null;
  readonly user?: User | null;
  readonly role?: string | null;
}

type LazyMember = {
  readonly user_id?: string | null;
  readonly user?: User | null;
  readonly role?: string | null;
}

export declare type Member = LazyLoading extends LazyLoadingDisabled ? EagerMember : LazyMember

export declare const Member: (new (init: ModelInit<Member>) => Member)

type EagerMessage = {
  readonly type?: string | null;
  readonly author_name?: string | null;
  readonly text?: string | null;
}

type LazyMessage = {
  readonly type?: string | null;
  readonly author_name?: string | null;
  readonly text?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message)

type EagerChannelDetail = {
  readonly channel: Channel;
  readonly members: (Member | null)[];
  readonly messages: (Message | null)[];
}

type LazyChannelDetail = {
  readonly channel: Channel;
  readonly members: (Member | null)[];
  readonly messages: (Message | null)[];
}

export declare type ChannelDetail = LazyLoading extends LazyLoadingDisabled ? EagerChannelDetail : LazyChannelDetail

export declare const ChannelDetail: (new (init: ModelInit<ChannelDetail>) => ChannelDetail)

type EagerCreateUserTokenResponse = {
  readonly token: string;
  readonly rooms: (ChannelDetail | null)[];
}

type LazyCreateUserTokenResponse = {
  readonly token: string;
  readonly rooms: (ChannelDetail | null)[];
}

export declare type CreateUserTokenResponse = LazyLoading extends LazyLoadingDisabled ? EagerCreateUserTokenResponse : LazyCreateUserTokenResponse

export declare const CreateUserTokenResponse: (new (init: ModelInit<CreateUserTokenResponse>) => CreateUserTokenResponse)

type EagerHospital = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Hospital, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly address?: string | null;
  readonly homePageUrl?: string | null;
  readonly logo?: string | null;
  readonly introductionImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHospital = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Hospital, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly address?: string | null;
  readonly homePageUrl?: string | null;
  readonly logo?: string | null;
  readonly introductionImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Hospital = LazyLoading extends LazyLoadingDisabled ? EagerHospital : LazyHospital

export declare const Hospital: (new (init: ModelInit<Hospital>) => Hospital) & {
  copyOf(source: Hospital, mutator: (draft: MutableModel<Hospital>) => MutableModel<Hospital> | void): Hospital;
}

type EagerSpecialty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Specialty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly specialty: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySpecialty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Specialty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly specialty: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Specialty = LazyLoading extends LazyLoadingDisabled ? EagerSpecialty : LazySpecialty

export declare const Specialty: (new (init: ModelInit<Specialty>) => Specialty) & {
  copyOf(source: Specialty, mutator: (draft: MutableModel<Specialty>) => MutableModel<Specialty> | void): Specialty;
}

type EagerMedicalSpecialist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MedicalSpecialist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly medicalSpecialist: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMedicalSpecialist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MedicalSpecialist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly medicalSpecialist: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MedicalSpecialist = LazyLoading extends LazyLoadingDisabled ? EagerMedicalSpecialist : LazyMedicalSpecialist

export declare const MedicalSpecialist: (new (init: ModelInit<MedicalSpecialist>) => MedicalSpecialist) & {
  copyOf(source: MedicalSpecialist, mutator: (draft: MutableModel<MedicalSpecialist>) => MutableModel<MedicalSpecialist> | void): MedicalSpecialist;
}

type EagerTrouble = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Trouble, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly trouble: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTrouble = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Trouble, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly trouble: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Trouble = LazyLoading extends LazyLoadingDisabled ? EagerTrouble : LazyTrouble

export declare const Trouble: (new (init: ModelInit<Trouble>) => Trouble) & {
  copyOf(source: Trouble, mutator: (draft: MutableModel<Trouble>) => MutableModel<Trouble> | void): Trouble;
}

type EagerNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly channel?: string | null;
  readonly text: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly channel?: string | null;
  readonly text: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification

export declare const Notification: (new (init: ModelInit<Notification>) => Notification) & {
  copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

type EagerPointHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PointHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly point: number;
  readonly userId: string;
  readonly text: string;
  readonly doctorId?: string | null;
  readonly messageId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPointHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PointHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly point: number;
  readonly userId: string;
  readonly text: string;
  readonly doctorId?: string | null;
  readonly messageId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PointHistory = LazyLoading extends LazyLoadingDisabled ? EagerPointHistory : LazyPointHistory

export declare const PointHistory: (new (init: ModelInit<PointHistory>) => PointHistory) & {
  copyOf(source: PointHistory, mutator: (draft: MutableModel<PointHistory>) => MutableModel<PointHistory> | void): PointHistory;
}

type EagerRoomSuggestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoomSuggestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly roomId: string;
  readonly suggestion: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRoomSuggestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoomSuggestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly roomId: string;
  readonly suggestion: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RoomSuggestion = LazyLoading extends LazyLoadingDisabled ? EagerRoomSuggestion : LazyRoomSuggestion

export declare const RoomSuggestion: (new (init: ModelInit<RoomSuggestion>) => RoomSuggestion) & {
  copyOf(source: RoomSuggestion, mutator: (draft: MutableModel<RoomSuggestion>) => MutableModel<RoomSuggestion> | void): RoomSuggestion;
}

type EagerTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly users?: (UserTag | null)[] | null;
  readonly feedsCount?: number | null;
  readonly categoryId?: string | null;
  readonly category?: Category | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly users: AsyncCollection<UserTag>;
  readonly feedsCount?: number | null;
  readonly categoryId?: string | null;
  readonly category: AsyncItem<Category | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Tag = LazyLoading extends LazyLoadingDisabled ? EagerTag : LazyTag

export declare const Tag: (new (init: ModelInit<Tag>) => Tag) & {
  copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly order?: number | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly tags?: (Tag | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly order?: number | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly tags: AsyncCollection<Tag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerUserTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly tagId: string;
  readonly tag?: Tag | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly tagId: string;
  readonly tag: AsyncItem<Tag | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserTag = LazyLoading extends LazyLoadingDisabled ? EagerUserTag : LazyUserTag

export declare const UserTag: (new (init: ModelInit<UserTag>) => UserTag) & {
  copyOf(source: UserTag, mutator: (draft: MutableModel<UserTag>) => MutableModel<UserTag> | void): UserTag;
}

type EagerQuestionnaire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Questionnaire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly roomId: string;
  readonly question: string;
  readonly users?: (UserQuestionnaire | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestionnaire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Questionnaire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly roomId: string;
  readonly question: string;
  readonly users: AsyncCollection<UserQuestionnaire>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Questionnaire = LazyLoading extends LazyLoadingDisabled ? EagerQuestionnaire : LazyQuestionnaire

export declare const Questionnaire: (new (init: ModelInit<Questionnaire>) => Questionnaire) & {
  copyOf(source: Questionnaire, mutator: (draft: MutableModel<Questionnaire>) => MutableModel<Questionnaire> | void): Questionnaire;
}

type EagerUserQuestionnaire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserQuestionnaire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly questionId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserQuestionnaire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserQuestionnaire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly questionId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserQuestionnaire = LazyLoading extends LazyLoadingDisabled ? EagerUserQuestionnaire : LazyUserQuestionnaire

export declare const UserQuestionnaire: (new (init: ModelInit<UserQuestionnaire>) => UserQuestionnaire) & {
  copyOf(source: UserQuestionnaire, mutator: (draft: MutableModel<UserQuestionnaire>) => MutableModel<UserQuestionnaire> | void): UserQuestionnaire;
}