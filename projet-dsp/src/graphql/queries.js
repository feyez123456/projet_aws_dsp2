/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVoyage = /* GraphQL */ `
  query GetVoyage($id: ID!) {
    getVoyage(id: $id) {
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
export const listVoyages = /* GraphQL */ `
  query ListVoyages(
    $filter: ModelVoyageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVoyages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        place
        notes
        rating
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
