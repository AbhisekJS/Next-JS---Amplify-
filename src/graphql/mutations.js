/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPark = /* GraphQL */ `
  mutation CreatePark(
    $input: CreateParkInput!
    $condition: ModelParkConditionInput
  ) {
    createPark(input: $input, condition: $condition) {
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
export const updatePark = /* GraphQL */ `
  mutation UpdatePark(
    $input: UpdateParkInput!
    $condition: ModelParkConditionInput
  ) {
    updatePark(input: $input, condition: $condition) {
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
export const deletePark = /* GraphQL */ `
  mutation DeletePark(
    $input: DeleteParkInput!
    $condition: ModelParkConditionInput
  ) {
    deletePark(input: $input, condition: $condition) {
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
