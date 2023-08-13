/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVoyage = /* GraphQL */ `
  mutation CreateVoyage(
    $input: CreateVoyageInput!
    $condition: ModelVoyageConditionInput
  ) {
    createVoyage(input: $input, condition: $condition) {
      id
      place
      notes
      rating
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateVoyage = /* GraphQL */ `
  mutation UpdateVoyage(
    $input: UpdateVoyageInput!
    $condition: ModelVoyageConditionInput
  ) {
    updateVoyage(input: $input, condition: $condition) {
      id
      place
      notes
      rating
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteVoyage = /* GraphQL */ `
  mutation DeleteVoyage(
    $input: DeleteVoyageInput!
    $condition: ModelVoyageConditionInput
  ) {
    deleteVoyage(input: $input, condition: $condition) {
      id
      place
      notes
      rating
      createdAt
      updatedAt
      __typename
    }
  }
`;
