import { gql } from "@apollo/client"


export const GET_FLOOR_LIST = gql`
query {
    floor {
      id
      num
      description
    }
  }
`;