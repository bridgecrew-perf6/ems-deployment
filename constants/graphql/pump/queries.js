import { gql } from "@apollo/client"


export const GET_PUMP_LIST = gql`
query {
    pump {
      id
      name
      description
    }
  }
`;