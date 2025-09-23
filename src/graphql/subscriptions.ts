/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSpecialty = /* GraphQL */ `subscription OnCreateSpecialty($filter: ModelSubscriptionSpecialtyFilterInput) {
  onCreateSpecialty(filter: $filter) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSpecialtySubscriptionVariables,
  APITypes.OnCreateSpecialtySubscription
>;
export const onUpdateSpecialty = /* GraphQL */ `subscription OnUpdateSpecialty($filter: ModelSubscriptionSpecialtyFilterInput) {
  onUpdateSpecialty(filter: $filter) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSpecialtySubscriptionVariables,
  APITypes.OnUpdateSpecialtySubscription
>;
export const onDeleteSpecialty = /* GraphQL */ `subscription OnDeleteSpecialty($filter: ModelSubscriptionSpecialtyFilterInput) {
  onDeleteSpecialty(filter: $filter) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSpecialtySubscriptionVariables,
  APITypes.OnDeleteSpecialtySubscription
>;
export const onCreateMedicalSpecialist = /* GraphQL */ `subscription OnCreateMedicalSpecialist(
  $filter: ModelSubscriptionMedicalSpecialistFilterInput
) {
  onCreateMedicalSpecialist(filter: $filter) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMedicalSpecialistSubscriptionVariables,
  APITypes.OnCreateMedicalSpecialistSubscription
>;
export const onUpdateMedicalSpecialist = /* GraphQL */ `subscription OnUpdateMedicalSpecialist(
  $filter: ModelSubscriptionMedicalSpecialistFilterInput
) {
  onUpdateMedicalSpecialist(filter: $filter) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMedicalSpecialistSubscriptionVariables,
  APITypes.OnUpdateMedicalSpecialistSubscription
>;
export const onDeleteMedicalSpecialist = /* GraphQL */ `subscription OnDeleteMedicalSpecialist(
  $filter: ModelSubscriptionMedicalSpecialistFilterInput
) {
  onDeleteMedicalSpecialist(filter: $filter) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMedicalSpecialistSubscriptionVariables,
  APITypes.OnDeleteMedicalSpecialistSubscription
>;
export const onCreateTrouble = /* GraphQL */ `subscription OnCreateTrouble($filter: ModelSubscriptionTroubleFilterInput) {
  onCreateTrouble(filter: $filter) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTroubleSubscriptionVariables,
  APITypes.OnCreateTroubleSubscription
>;
export const onUpdateTrouble = /* GraphQL */ `subscription OnUpdateTrouble($filter: ModelSubscriptionTroubleFilterInput) {
  onUpdateTrouble(filter: $filter) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTroubleSubscriptionVariables,
  APITypes.OnUpdateTroubleSubscription
>;
export const onDeleteTrouble = /* GraphQL */ `subscription OnDeleteTrouble($filter: ModelSubscriptionTroubleFilterInput) {
  onDeleteTrouble(filter: $filter) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTroubleSubscriptionVariables,
  APITypes.OnDeleteTroubleSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onCreateNotification(filter: $filter) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onUpdateNotification(filter: $filter) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onDeleteNotification(filter: $filter) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onCreatePointHistory = /* GraphQL */ `subscription OnCreatePointHistory(
  $filter: ModelSubscriptionPointHistoryFilterInput
) {
  onCreatePointHistory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePointHistorySubscriptionVariables,
  APITypes.OnCreatePointHistorySubscription
>;
export const onUpdatePointHistory = /* GraphQL */ `subscription OnUpdatePointHistory(
  $filter: ModelSubscriptionPointHistoryFilterInput
) {
  onUpdatePointHistory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePointHistorySubscriptionVariables,
  APITypes.OnUpdatePointHistorySubscription
>;
export const onDeletePointHistory = /* GraphQL */ `subscription OnDeletePointHistory(
  $filter: ModelSubscriptionPointHistoryFilterInput
) {
  onDeletePointHistory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePointHistorySubscriptionVariables,
  APITypes.OnDeletePointHistorySubscription
>;
export const onCreateRoomSuggestion = /* GraphQL */ `subscription OnCreateRoomSuggestion(
  $filter: ModelSubscriptionRoomSuggestionFilterInput
) {
  onCreateRoomSuggestion(filter: $filter) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRoomSuggestionSubscriptionVariables,
  APITypes.OnCreateRoomSuggestionSubscription
>;
export const onUpdateRoomSuggestion = /* GraphQL */ `subscription OnUpdateRoomSuggestion(
  $filter: ModelSubscriptionRoomSuggestionFilterInput
) {
  onUpdateRoomSuggestion(filter: $filter) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRoomSuggestionSubscriptionVariables,
  APITypes.OnUpdateRoomSuggestionSubscription
>;
export const onDeleteRoomSuggestion = /* GraphQL */ `subscription OnDeleteRoomSuggestion(
  $filter: ModelSubscriptionRoomSuggestionFilterInput
) {
  onDeleteRoomSuggestion(filter: $filter) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRoomSuggestionSubscriptionVariables,
  APITypes.OnDeleteRoomSuggestionSubscription
>;
export const onCreateUserTag = /* GraphQL */ `subscription OnCreateUserTag($filter: ModelSubscriptionUserTagFilterInput) {
  onCreateUserTag(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserTagSubscriptionVariables,
  APITypes.OnCreateUserTagSubscription
>;
export const onUpdateUserTag = /* GraphQL */ `subscription OnUpdateUserTag($filter: ModelSubscriptionUserTagFilterInput) {
  onUpdateUserTag(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserTagSubscriptionVariables,
  APITypes.OnUpdateUserTagSubscription
>;
export const onDeleteUserTag = /* GraphQL */ `subscription OnDeleteUserTag($filter: ModelSubscriptionUserTagFilterInput) {
  onDeleteUserTag(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserTagSubscriptionVariables,
  APITypes.OnDeleteUserTagSubscription
>;
export const onCreateQuestionnaire = /* GraphQL */ `subscription OnCreateQuestionnaire(
  $filter: ModelSubscriptionQuestionnaireFilterInput
) {
  onCreateQuestionnaire(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuestionnaireSubscriptionVariables,
  APITypes.OnCreateQuestionnaireSubscription
>;
export const onUpdateQuestionnaire = /* GraphQL */ `subscription OnUpdateQuestionnaire(
  $filter: ModelSubscriptionQuestionnaireFilterInput
) {
  onUpdateQuestionnaire(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionnaireSubscriptionVariables,
  APITypes.OnUpdateQuestionnaireSubscription
>;
export const onDeleteQuestionnaire = /* GraphQL */ `subscription OnDeleteQuestionnaire(
  $filter: ModelSubscriptionQuestionnaireFilterInput
) {
  onDeleteQuestionnaire(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionnaireSubscriptionVariables,
  APITypes.OnDeleteQuestionnaireSubscription
>;
export const onCreateUserQuestionnaire = /* GraphQL */ `subscription OnCreateUserQuestionnaire(
  $filter: ModelSubscriptionUserQuestionnaireFilterInput
) {
  onCreateUserQuestionnaire(filter: $filter) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserQuestionnaireSubscriptionVariables,
  APITypes.OnCreateUserQuestionnaireSubscription
>;
export const onUpdateUserQuestionnaire = /* GraphQL */ `subscription OnUpdateUserQuestionnaire(
  $filter: ModelSubscriptionUserQuestionnaireFilterInput
) {
  onUpdateUserQuestionnaire(filter: $filter) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserQuestionnaireSubscriptionVariables,
  APITypes.OnUpdateUserQuestionnaireSubscription
>;
export const onDeleteUserQuestionnaire = /* GraphQL */ `subscription OnDeleteUserQuestionnaire(
  $filter: ModelSubscriptionUserQuestionnaireFilterInput
) {
  onDeleteUserQuestionnaire(filter: $filter) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserQuestionnaireSubscriptionVariables,
  APITypes.OnDeleteUserQuestionnaireSubscription
>;
export const onCreateHospital = /* GraphQL */ `subscription OnCreateHospital($filter: ModelSubscriptionHospitalFilterInput) {
  onCreateHospital(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateHospitalSubscriptionVariables,
  APITypes.OnCreateHospitalSubscription
>;
export const onUpdateHospital = /* GraphQL */ `subscription OnUpdateHospital($filter: ModelSubscriptionHospitalFilterInput) {
  onUpdateHospital(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateHospitalSubscriptionVariables,
  APITypes.OnUpdateHospitalSubscription
>;
export const onDeleteHospital = /* GraphQL */ `subscription OnDeleteHospital($filter: ModelSubscriptionHospitalFilterInput) {
  onDeleteHospital(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteHospitalSubscriptionVariables,
  APITypes.OnDeleteHospitalSubscription
>;
export const onCreateTag = /* GraphQL */ `subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
  onCreateTag(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTagSubscriptionVariables,
  APITypes.OnCreateTagSubscription
>;
export const onUpdateTag = /* GraphQL */ `subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
  onUpdateTag(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTagSubscriptionVariables,
  APITypes.OnUpdateTagSubscription
>;
export const onDeleteTag = /* GraphQL */ `subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
  onDeleteTag(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTagSubscriptionVariables,
  APITypes.OnDeleteTagSubscription
>;
export const onCreateCategory = /* GraphQL */ `subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onCreateCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCategorySubscriptionVariables,
  APITypes.OnCreateCategorySubscription
>;
export const onUpdateCategory = /* GraphQL */ `subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onUpdateCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCategorySubscriptionVariables,
  APITypes.OnUpdateCategorySubscription
>;
export const onDeleteCategory = /* GraphQL */ `subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
  onDeleteCategory(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCategorySubscriptionVariables,
  APITypes.OnDeleteCategorySubscription
>;
export const onCreateUserDevice = /* GraphQL */ `subscription OnCreateUserDevice(
  $filter: ModelSubscriptionUserDeviceFilterInput
) {
  onCreateUserDevice(filter: $filter) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserDeviceSubscriptionVariables,
  APITypes.OnCreateUserDeviceSubscription
>;
export const onUpdateUserDevice = /* GraphQL */ `subscription OnUpdateUserDevice(
  $filter: ModelSubscriptionUserDeviceFilterInput
) {
  onUpdateUserDevice(filter: $filter) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserDeviceSubscriptionVariables,
  APITypes.OnUpdateUserDeviceSubscription
>;
export const onDeleteUserDevice = /* GraphQL */ `subscription OnDeleteUserDevice(
  $filter: ModelSubscriptionUserDeviceFilterInput
) {
  onDeleteUserDevice(filter: $filter) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserDeviceSubscriptionVariables,
  APITypes.OnDeleteUserDeviceSubscription
>;
export const onCreateMembership = /* GraphQL */ `subscription OnCreateMembership(
  $filter: ModelSubscriptionMembershipFilterInput
) {
  onCreateMembership(filter: $filter) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMembershipSubscriptionVariables,
  APITypes.OnCreateMembershipSubscription
>;
export const onUpdateMembership = /* GraphQL */ `subscription OnUpdateMembership(
  $filter: ModelSubscriptionMembershipFilterInput
) {
  onUpdateMembership(filter: $filter) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMembershipSubscriptionVariables,
  APITypes.OnUpdateMembershipSubscription
>;
export const onDeleteMembership = /* GraphQL */ `subscription OnDeleteMembership(
  $filter: ModelSubscriptionMembershipFilterInput
) {
  onDeleteMembership(filter: $filter) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMembershipSubscriptionVariables,
  APITypes.OnDeleteMembershipSubscription
>;
