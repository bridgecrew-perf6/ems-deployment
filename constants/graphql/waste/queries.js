import { gql } from "@apollo/client"


export const GET_WASTE_LIST = gql`
query {
    waste {
      id
      name
      description
    }
  }
`;