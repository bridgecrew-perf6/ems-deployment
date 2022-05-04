import { gql } from "@apollo/client"
import { constant } from "lodash";


export const UPSERT_WASTE = gql`
mutation UpsertWaste($name: String!, $description: String!, $id: Int) {
  upsertWaste(name: $name, description: $description, id: $id) {
    id
    name
    description
  }
}
`;


export const DELETE_WASTE = gql`
mutation DeleteWaste($id: Int) {
  deleteWaste(id: $id) {
    id
  }
}
`;