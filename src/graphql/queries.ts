/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const CreateUserToken = /* GraphQL */ `query CreateUserToken($id: ID!) {
  CreateUserToken(id: $id) {
    token
    rooms {
      channel {
        id
        type
        image
        name
        description
        feedsCount
        doctorFeedsCount
        researchFeedsCount
        questions
        tags
        owner
        disabled
        frozen
        category
        subcat
        intractable
        billable
        checkout_url
        price
        price_desc
        startTime
        endTime
        terms
        isCustomTerm
        __typename
      }
      members {
        user_id
        user {
          name
          role
          image
          firstName
          lastName
          category
          __typename
        }
        role
        __typename
      }
      messages {
        type
        author_name
        text
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CreateUserTokenQueryVariables,
  APITypes.CreateUserTokenQuery
>;
export const getRoomChannels = /* GraphQL */ `query GetRoomChannels($room_id: String!) {
  getRoomChannels(room_id: $room_id) {
    channel {
      id
      type
      image
      name
      description
      feedsCount
      doctorFeedsCount
      researchFeedsCount
      questions
      tags
      owner
      disabled
      frozen
      category
      subcat
      intractable
      billable
      checkout_url
      price
      price_desc
      startTime
      endTime
      terms
      isCustomTerm
      __typename
    }
    members {
      user_id
      user {
        name
        role
        image
        firstName
        lastName
        category
        __typename
      }
      role
      __typename
    }
    messages {
      type
      author_name
      text
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRoomChannelsQueryVariables,
  APITypes.GetRoomChannelsQuery
>;
export const sendPushNotification = /* GraphQL */ `query SendPushNotification($type: String!, $channel: String!, $text: String!) {
  sendPushNotification(type: $type, channel: $channel, text: $text)
}
` as GeneratedQuery<
  APITypes.SendPushNotificationQueryVariables,
  APITypes.SendPushNotificationQuery
>;
export const getSpecialty = /* GraphQL */ `query GetSpecialty($id: ID!) {
  getSpecialty(id: $id) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSpecialtyQueryVariables,
  APITypes.GetSpecialtyQuery
>;
export const listSpecialties = /* GraphQL */ `query ListSpecialties(
  $filter: ModelSpecialtyFilterInput
  $limit: Int
  $nextToken: String
) {
  listSpecialties(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      specialty
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSpecialtiesQueryVariables,
  APITypes.ListSpecialtiesQuery
>;
export const getMedicalSpecialist = /* GraphQL */ `query GetMedicalSpecialist($id: ID!) {
  getMedicalSpecialist(id: $id) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMedicalSpecialistQueryVariables,
  APITypes.GetMedicalSpecialistQuery
>;
export const listMedicalSpecialists = /* GraphQL */ `query ListMedicalSpecialists(
  $filter: ModelMedicalSpecialistFilterInput
  $limit: Int
  $nextToken: String
) {
  listMedicalSpecialists(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      medicalSpecialist
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMedicalSpecialistsQueryVariables,
  APITypes.ListMedicalSpecialistsQuery
>;
export const getTrouble = /* GraphQL */ `query GetTrouble($id: ID!) {
  getTrouble(id: $id) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTroubleQueryVariables,
  APITypes.GetTroubleQuery
>;
export const listTroubles = /* GraphQL */ `query ListTroubles(
  $filter: ModelTroubleFilterInput
  $limit: Int
  $nextToken: String
) {
  listTroubles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      trouble
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTroublesQueryVariables,
  APITypes.ListTroublesQuery
>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      channel
      text
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const getPointHistory = /* GraphQL */ `query GetPointHistory($id: ID!) {
  getPointHistory(id: $id) {
    id
    type
    point
    userId
    text
    doctorId
    messageId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPointHistoryQueryVariables,
  APITypes.GetPointHistoryQuery
>;
export const listPointHistories = /* GraphQL */ `query ListPointHistories(
  $filter: ModelPointHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listPointHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      point
      userId
      text
      doctorId
      messageId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPointHistoriesQueryVariables,
  APITypes.ListPointHistoriesQuery
>;
export const getRoomSuggestion = /* GraphQL */ `query GetRoomSuggestion($id: ID!) {
  getRoomSuggestion(id: $id) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRoomSuggestionQueryVariables,
  APITypes.GetRoomSuggestionQuery
>;
export const listRoomSuggestions = /* GraphQL */ `query ListRoomSuggestions(
  $filter: ModelRoomSuggestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoomSuggestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      roomId
      suggestion
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRoomSuggestionsQueryVariables,
  APITypes.ListRoomSuggestionsQuery
>;
export const getUserTag = /* GraphQL */ `query GetUserTag($id: ID!) {
  getUserTag(id: $id) {
    id
    userId
    tagId
    tag {
      id
      name
      users {
        items {
          id
          userId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      feedsCount
      categoryId
      category {
        id
        name
        order
        description
        image
        tags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserTagQueryVariables,
  APITypes.GetUserTagQuery
>;
export const listUserTags = /* GraphQL */ `query ListUserTags(
  $filter: ModelUserTagFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      tagId
      tag {
        id
        name
        users {
          nextToken
          __typename
        }
        feedsCount
        categoryId
        category {
          id
          name
          order
          description
          image
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserTagsQueryVariables,
  APITypes.ListUserTagsQuery
>;
export const getQuestionnaire = /* GraphQL */ `query GetQuestionnaire($id: ID!) {
  getQuestionnaire(id: $id) {
    id
    roomId
    question
    users {
      items {
        id
        userId
        questionId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionnaireQueryVariables,
  APITypes.GetQuestionnaireQuery
>;
export const listQuestionnaires = /* GraphQL */ `query ListQuestionnaires(
  $filter: ModelQuestionnaireFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      roomId
      question
      users {
        items {
          id
          userId
          questionId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuestionnairesQueryVariables,
  APITypes.ListQuestionnairesQuery
>;
export const getUserQuestionnaire = /* GraphQL */ `query GetUserQuestionnaire($id: ID!) {
  getUserQuestionnaire(id: $id) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserQuestionnaireQueryVariables,
  APITypes.GetUserQuestionnaireQuery
>;
export const listUserQuestionnaires = /* GraphQL */ `query ListUserQuestionnaires(
  $filter: ModelUserQuestionnaireFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserQuestionnaires(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      questionId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserQuestionnairesQueryVariables,
  APITypes.ListUserQuestionnairesQuery
>;
export const userTagsByUserIdAndTagId = /* GraphQL */ `query UserTagsByUserIdAndTagId(
  $userId: String!
  $tagId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserTagFilterInput
  $limit: Int
  $nextToken: String
) {
  userTagsByUserIdAndTagId(
    userId: $userId
    tagId: $tagId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      tagId
      tag {
        id
        name
        users {
          nextToken
          __typename
        }
        feedsCount
        categoryId
        category {
          id
          name
          order
          description
          image
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserTagsByUserIdAndTagIdQueryVariables,
  APITypes.UserTagsByUserIdAndTagIdQuery
>;
export const userTagsByTagIdAndUserId = /* GraphQL */ `query UserTagsByTagIdAndUserId(
  $tagId: ID!
  $userId: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserTagFilterInput
  $limit: Int
  $nextToken: String
) {
  userTagsByTagIdAndUserId(
    tagId: $tagId
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      tagId
      tag {
        id
        name
        users {
          nextToken
          __typename
        }
        feedsCount
        categoryId
        category {
          id
          name
          order
          description
          image
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserTagsByTagIdAndUserIdQueryVariables,
  APITypes.UserTagsByTagIdAndUserIdQuery
>;
export const userQuestionnairesByIdAndQuestionIdAndUserId = /* GraphQL */ `query UserQuestionnairesByIdAndQuestionIdAndUserId(
  $id: ID!
  $questionIdUserId: ModelUserQuestionnaireByQuestionCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserQuestionnaireFilterInput
  $limit: Int
  $nextToken: String
) {
  userQuestionnairesByIdAndQuestionIdAndUserId(
    id: $id
    questionIdUserId: $questionIdUserId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      questionId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserQuestionnairesByIdAndQuestionIdAndUserIdQueryVariables,
  APITypes.UserQuestionnairesByIdAndQuestionIdAndUserIdQuery
>;
export const getHospital = /* GraphQL */ `query GetHospital($id: ID!) {
  getHospital(id: $id) {
    id
    name
    address
    homePageUrl
    logo
    introductionImage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetHospitalQueryVariables,
  APITypes.GetHospitalQuery
>;
export const listHospitals = /* GraphQL */ `query ListHospitals(
  $filter: ModelHospitalFilterInput
  $limit: Int
  $nextToken: String
) {
  listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      address
      homePageUrl
      logo
      introductionImage
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHospitalsQueryVariables,
  APITypes.ListHospitalsQuery
>;
export const getTag = /* GraphQL */ `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    users {
      items {
        id
        userId
        tagId
        tag {
          id
          name
          feedsCount
          categoryId
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    feedsCount
    categoryId
    category {
      id
      name
      order
      description
      image
      tags {
        items {
          id
          name
          feedsCount
          categoryId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTagQueryVariables, APITypes.GetTagQuery>;
export const listTags = /* GraphQL */ `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      users {
        items {
          id
          userId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      feedsCount
      categoryId
      category {
        id
        name
        order
        description
        image
        tags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTagsQueryVariables, APITypes.ListTagsQuery>;
export const tagsByCategoryId = /* GraphQL */ `query TagsByCategoryId(
  $categoryId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTagFilterInput
  $limit: Int
  $nextToken: String
) {
  tagsByCategoryId(
    categoryId: $categoryId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      users {
        items {
          id
          userId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      feedsCount
      categoryId
      category {
        id
        name
        order
        description
        image
        tags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TagsByCategoryIdQueryVariables,
  APITypes.TagsByCategoryIdQuery
>;
export const getCategory = /* GraphQL */ `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    order
    description
    image
    tags {
      items {
        id
        name
        users {
          nextToken
          __typename
        }
        feedsCount
        categoryId
        category {
          id
          name
          order
          description
          image
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCategoryQueryVariables,
  APITypes.GetCategoryQuery
>;
export const listCategories = /* GraphQL */ `query ListCategories(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      order
      description
      image
      tags {
        items {
          id
          name
          feedsCount
          categoryId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCategoriesQueryVariables,
  APITypes.ListCategoriesQuery
>;
export const getUserDevice = /* GraphQL */ `query GetUserDevice($id: ID!) {
  getUserDevice(id: $id) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserDeviceQueryVariables,
  APITypes.GetUserDeviceQuery
>;
export const listUserDevices = /* GraphQL */ `query ListUserDevices(
  $filter: ModelUserDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      token
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserDevicesQueryVariables,
  APITypes.ListUserDevicesQuery
>;
export const userDevicesByUserId = /* GraphQL */ `query UserDevicesByUserId(
  $userId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserDeviceFilterInput
  $limit: Int
  $nextToken: String
) {
  userDevicesByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      token
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserDevicesByUserIdQueryVariables,
  APITypes.UserDevicesByUserIdQuery
>;
export const getMembership = /* GraphQL */ `query GetMembership($id: ID!) {
  getMembership(id: $id) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMembershipQueryVariables,
  APITypes.GetMembershipQuery
>;
export const listMemberships = /* GraphQL */ `query ListMemberships(
  $filter: ModelMembershipFilterInput
  $limit: Int
  $nextToken: String
) {
  listMemberships(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      room
      price
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMembershipsQueryVariables,
  APITypes.ListMembershipsQuery
>;
