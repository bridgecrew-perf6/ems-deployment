import {gql} from '@apollo/client'

export const UPSERT_UNIT = gql`
mutation UpsertUnit($id: Int, $name: String, $description: String) {
    upsertUnit(id: $id, name: $name, description: $description) {
      id
      description
      name
    }
  }
`;

export const DELETE_UNIT = gql`
mutation Deleteunit($id: Int) {
    deleteunit(id: $id) {
      id
    }
  }
`;