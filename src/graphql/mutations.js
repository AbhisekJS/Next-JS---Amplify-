/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMemories = /* GraphQL */ `
  mutation CreateMemories(
    $input: CreateMemoriesInput!
    $condition: ModelMemoriesConditionInput
  ) {
    createMemories(input: $input, condition: $condition) {
      id
      name
      image {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMemories = /* GraphQL */ `
  mutation UpdateMemories(
    $input: UpdateMemoriesInput!
    $condition: ModelMemoriesConditionInput
  ) {
    updateMemories(input: $input, condition: $condition) {
      id
      name
      image {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMemories = /* GraphQL */ `
  mutation DeleteMemories(
    $input: DeleteMemoriesInput!
    $condition: ModelMemoriesConditionInput
  ) {
    deleteMemories(input: $input, condition: $condition) {
      id
      name
      image {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
