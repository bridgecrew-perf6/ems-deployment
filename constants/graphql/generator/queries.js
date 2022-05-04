import { gql } from "@apollo/client"


export const GET_GEN_LIST = gql`
query {
    generators {
      id
      name
      description
    }
  }
`;