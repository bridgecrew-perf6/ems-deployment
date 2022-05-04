import {gql} from '@apollo/client'

export const UNIT_LIST = gql`
query Unit {
    unit {
      id
      name
      description
    }
  }
`;