/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const batchCreateUserTag = /* GraphQL */ `mutation BatchCreateUserTag($tags: [BatchCreateUserTag]) {
  batchCreateUserTag(tags: $tags) {
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
` as GeneratedMutation<
  APITypes.BatchCreateUserTagMutationVariables,
  APITypes.BatchCreateUserTagMutation
>;
export const batchDeleteUserTag = /* GraphQL */ `mutation BatchDeleteUserTag($deleteIds: [ID!]) {
  batchDeleteUserTag(deleteIds: $deleteIds) {
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
` as GeneratedMutation<
  APITypes.BatchDeleteUserTagMutationVariables,
  APITypes.BatchDeleteUserTagMutation
>;
export const addToCollection = /* GraphQL */ `mutation AddToCollection(
  $foreignId: String!
  $time: String!
  $userId: String!
  $targetId: String!
) {
  addToCollection(
    foreignId: $foreignId
    time: $time
    userId: $userId
    targetId: $targetId
  )
}
` as GeneratedMutation<
  APITypes.AddToCollectionMutationVariables,
  APITypes.AddToCollectionMutation
>;
export const updateCategoryOrder = /* GraphQL */ `mutation UpdateCategoryOrder($categories: [UpdateCategoryOrder]) {
  updateCategoryOrder(categories: $categories) {
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
` as GeneratedMutation<
  APITypes.UpdateCategoryOrderMutationVariables,
  APITypes.UpdateCategoryOrderMutation
>;
export const createHospital = /* GraphQL */ `mutation CreateHospital(
  $input: CreateHospitalInput!
  $condition: ModelHospitalConditionInput
) {
  createHospital(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateHospitalMutationVariables,
  APITypes.CreateHospitalMutation
>;
export const updateHospital = /* GraphQL */ `mutation UpdateHospital(
  $input: UpdateHospitalInput!
  $condition: ModelHospitalConditionInput
) {
  updateHospital(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateHospitalMutationVariables,
  APITypes.UpdateHospitalMutation
>;
export const deleteHospital = /* GraphQL */ `mutation DeleteHospital(
  $input: DeleteHospitalInput!
  $condition: ModelHospitalConditionInput
) {
  deleteHospital(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteHospitalMutationVariables,
  APITypes.DeleteHospitalMutation
>;
export const createSpecialty = /* GraphQL */ `mutation CreateSpecialty(
  $input: CreateSpecialtyInput!
  $condition: ModelSpecialtyConditionInput
) {
  createSpecialty(input: $input, condition: $condition) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSpecialtyMutationVariables,
  APITypes.CreateSpecialtyMutation
>;
export const updateSpecialty = /* GraphQL */ `mutation UpdateSpecialty(
  $input: UpdateSpecialtyInput!
  $condition: ModelSpecialtyConditionInput
) {
  updateSpecialty(input: $input, condition: $condition) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSpecialtyMutationVariables,
  APITypes.UpdateSpecialtyMutation
>;
export const deleteSpecialty = /* GraphQL */ `mutation DeleteSpecialty(
  $input: DeleteSpecialtyInput!
  $condition: ModelSpecialtyConditionInput
) {
  deleteSpecialty(input: $input, condition: $condition) {
    id
    specialty
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSpecialtyMutationVariables,
  APITypes.DeleteSpecialtyMutation
>;
export const createMedicalSpecialist = /* GraphQL */ `mutation CreateMedicalSpecialist(
  $input: CreateMedicalSpecialistInput!
  $condition: ModelMedicalSpecialistConditionInput
) {
  createMedicalSpecialist(input: $input, condition: $condition) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMedicalSpecialistMutationVariables,
  APITypes.CreateMedicalSpecialistMutation
>;
export const updateMedicalSpecialist = /* GraphQL */ `mutation UpdateMedicalSpecialist(
  $input: UpdateMedicalSpecialistInput!
  $condition: ModelMedicalSpecialistConditionInput
) {
  updateMedicalSpecialist(input: $input, condition: $condition) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMedicalSpecialistMutationVariables,
  APITypes.UpdateMedicalSpecialistMutation
>;
export const deleteMedicalSpecialist = /* GraphQL */ `mutation DeleteMedicalSpecialist(
  $input: DeleteMedicalSpecialistInput!
  $condition: ModelMedicalSpecialistConditionInput
) {
  deleteMedicalSpecialist(input: $input, condition: $condition) {
    id
    medicalSpecialist
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMedicalSpecialistMutationVariables,
  APITypes.DeleteMedicalSpecialistMutation
>;
export const createTrouble = /* GraphQL */ `mutation CreateTrouble(
  $input: CreateTroubleInput!
  $condition: ModelTroubleConditionInput
) {
  createTrouble(input: $input, condition: $condition) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTroubleMutationVariables,
  APITypes.CreateTroubleMutation
>;
export const updateTrouble = /* GraphQL */ `mutation UpdateTrouble(
  $input: UpdateTroubleInput!
  $condition: ModelTroubleConditionInput
) {
  updateTrouble(input: $input, condition: $condition) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTroubleMutationVariables,
  APITypes.UpdateTroubleMutation
>;
export const deleteTrouble = /* GraphQL */ `mutation DeleteTrouble(
  $input: DeleteTroubleInput!
  $condition: ModelTroubleConditionInput
) {
  deleteTrouble(input: $input, condition: $condition) {
    id
    trouble
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTroubleMutationVariables,
  APITypes.DeleteTroubleMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $input: CreateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  createNotification(input: $input, condition: $condition) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $input: UpdateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  updateNotification(input: $input, condition: $condition) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $input: DeleteNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  deleteNotification(input: $input, condition: $condition) {
    id
    type
    channel
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const createPointHistory = /* GraphQL */ `mutation CreatePointHistory(
  $input: CreatePointHistoryInput!
  $condition: ModelPointHistoryConditionInput
) {
  createPointHistory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePointHistoryMutationVariables,
  APITypes.CreatePointHistoryMutation
>;
export const updatePointHistory = /* GraphQL */ `mutation UpdatePointHistory(
  $input: UpdatePointHistoryInput!
  $condition: ModelPointHistoryConditionInput
) {
  updatePointHistory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePointHistoryMutationVariables,
  APITypes.UpdatePointHistoryMutation
>;
export const deletePointHistory = /* GraphQL */ `mutation DeletePointHistory(
  $input: DeletePointHistoryInput!
  $condition: ModelPointHistoryConditionInput
) {
  deletePointHistory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePointHistoryMutationVariables,
  APITypes.DeletePointHistoryMutation
>;
export const createRoomSuggestion = /* GraphQL */ `mutation CreateRoomSuggestion(
  $input: CreateRoomSuggestionInput!
  $condition: ModelRoomSuggestionConditionInput
) {
  createRoomSuggestion(input: $input, condition: $condition) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRoomSuggestionMutationVariables,
  APITypes.CreateRoomSuggestionMutation
>;
export const updateRoomSuggestion = /* GraphQL */ `mutation UpdateRoomSuggestion(
  $input: UpdateRoomSuggestionInput!
  $condition: ModelRoomSuggestionConditionInput
) {
  updateRoomSuggestion(input: $input, condition: $condition) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRoomSuggestionMutationVariables,
  APITypes.UpdateRoomSuggestionMutation
>;
export const deleteRoomSuggestion = /* GraphQL */ `mutation DeleteRoomSuggestion(
  $input: DeleteRoomSuggestionInput!
  $condition: ModelRoomSuggestionConditionInput
) {
  deleteRoomSuggestion(input: $input, condition: $condition) {
    id
    userId
    roomId
    suggestion
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRoomSuggestionMutationVariables,
  APITypes.DeleteRoomSuggestionMutation
>;
export const createTag = /* GraphQL */ `mutation CreateTag(
  $input: CreateTagInput!
  $condition: ModelTagConditionInput
) {
  createTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTagMutationVariables,
  APITypes.CreateTagMutation
>;
export const updateTag = /* GraphQL */ `mutation UpdateTag(
  $input: UpdateTagInput!
  $condition: ModelTagConditionInput
) {
  updateTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTagMutationVariables,
  APITypes.UpdateTagMutation
>;
export const deleteTag = /* GraphQL */ `mutation DeleteTag(
  $input: DeleteTagInput!
  $condition: ModelTagConditionInput
) {
  deleteTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTagMutationVariables,
  APITypes.DeleteTagMutation
>;
export const createCategory = /* GraphQL */ `mutation CreateCategory(
  $input: CreateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  createCategory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCategoryMutationVariables,
  APITypes.CreateCategoryMutation
>;
export const updateCategory = /* GraphQL */ `mutation UpdateCategory(
  $input: UpdateCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  updateCategory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCategoryMutationVariables,
  APITypes.UpdateCategoryMutation
>;
export const deleteCategory = /* GraphQL */ `mutation DeleteCategory(
  $input: DeleteCategoryInput!
  $condition: ModelCategoryConditionInput
) {
  deleteCategory(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCategoryMutationVariables,
  APITypes.DeleteCategoryMutation
>;
export const createUserTag = /* GraphQL */ `mutation CreateUserTag(
  $input: CreateUserTagInput!
  $condition: ModelUserTagConditionInput
) {
  createUserTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserTagMutationVariables,
  APITypes.CreateUserTagMutation
>;
export const updateUserTag = /* GraphQL */ `mutation UpdateUserTag(
  $input: UpdateUserTagInput!
  $condition: ModelUserTagConditionInput
) {
  updateUserTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserTagMutationVariables,
  APITypes.UpdateUserTagMutation
>;
export const deleteUserTag = /* GraphQL */ `mutation DeleteUserTag(
  $input: DeleteUserTagInput!
  $condition: ModelUserTagConditionInput
) {
  deleteUserTag(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserTagMutationVariables,
  APITypes.DeleteUserTagMutation
>;
export const createQuestionnaire = /* GraphQL */ `mutation CreateQuestionnaire(
  $input: CreateQuestionnaireInput!
  $condition: ModelQuestionnaireConditionInput
) {
  createQuestionnaire(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateQuestionnaireMutationVariables,
  APITypes.CreateQuestionnaireMutation
>;
export const updateQuestionnaire = /* GraphQL */ `mutation UpdateQuestionnaire(
  $input: UpdateQuestionnaireInput!
  $condition: ModelQuestionnaireConditionInput
) {
  updateQuestionnaire(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateQuestionnaireMutationVariables,
  APITypes.UpdateQuestionnaireMutation
>;
export const deleteQuestionnaire = /* GraphQL */ `mutation DeleteQuestionnaire(
  $input: DeleteQuestionnaireInput!
  $condition: ModelQuestionnaireConditionInput
) {
  deleteQuestionnaire(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteQuestionnaireMutationVariables,
  APITypes.DeleteQuestionnaireMutation
>;
export const createUserQuestionnaire = /* GraphQL */ `mutation CreateUserQuestionnaire(
  $input: CreateUserQuestionnaireInput!
  $condition: ModelUserQuestionnaireConditionInput
) {
  createUserQuestionnaire(input: $input, condition: $condition) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserQuestionnaireMutationVariables,
  APITypes.CreateUserQuestionnaireMutation
>;
export const updateUserQuestionnaire = /* GraphQL */ `mutation UpdateUserQuestionnaire(
  $input: UpdateUserQuestionnaireInput!
  $condition: ModelUserQuestionnaireConditionInput
) {
  updateUserQuestionnaire(input: $input, condition: $condition) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserQuestionnaireMutationVariables,
  APITypes.UpdateUserQuestionnaireMutation
>;
export const deleteUserQuestionnaire = /* GraphQL */ `mutation DeleteUserQuestionnaire(
  $input: DeleteUserQuestionnaireInput!
  $condition: ModelUserQuestionnaireConditionInput
) {
  deleteUserQuestionnaire(input: $input, condition: $condition) {
    id
    userId
    questionId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserQuestionnaireMutationVariables,
  APITypes.DeleteUserQuestionnaireMutation
>;
export const updateUserDevice = /* GraphQL */ `mutation UpdateUserDevice(
  $input: UpdateUserDeviceInput!
  $condition: ModelUserDeviceConditionInput
) {
  updateUserDevice(input: $input, condition: $condition) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserDeviceMutationVariables,
  APITypes.UpdateUserDeviceMutation
>;
export const deleteUserDevice = /* GraphQL */ `mutation DeleteUserDevice(
  $input: DeleteUserDeviceInput!
  $condition: ModelUserDeviceConditionInput
) {
  deleteUserDevice(input: $input, condition: $condition) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserDeviceMutationVariables,
  APITypes.DeleteUserDeviceMutation
>;
export const updateMembership = /* GraphQL */ `mutation UpdateMembership(
  $input: UpdateMembershipInput!
  $condition: ModelMembershipConditionInput
) {
  updateMembership(input: $input, condition: $condition) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMembershipMutationVariables,
  APITypes.UpdateMembershipMutation
>;
export const createUserDevice = /* GraphQL */ `mutation CreateUserDevice(
  $input: CreateUserDeviceInput!
  $condition: ModelUserDeviceConditionInput
) {
  createUserDevice(input: $input, condition: $condition) {
    id
    userId
    token
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserDeviceMutationVariables,
  APITypes.CreateUserDeviceMutation
>;
export const createMembership = /* GraphQL */ `mutation CreateMembership(
  $input: CreateMembershipInput!
  $condition: ModelMembershipConditionInput
) {
  createMembership(input: $input, condition: $condition) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMembershipMutationVariables,
  APITypes.CreateMembershipMutation
>;
export const deleteMembership = /* GraphQL */ `mutation DeleteMembership(
  $input: DeleteMembershipInput!
  $condition: ModelMembershipConditionInput
) {
  deleteMembership(input: $input, condition: $condition) {
    id
    email
    room
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMembershipMutationVariables,
  APITypes.DeleteMembershipMutation
>;
