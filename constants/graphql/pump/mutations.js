import { gql } from "@apollo/client"
import { constant } from "lodash";


export const UPSERT_PUMP = gql`
mutation UpsertPump($name: String, $description: String, $id: Int) {
  upsertPump(name: $name, description: $description, id: $id) {
    id
    name
    description
  }
}
`;


export const DELETE_PUMP = gql`
mutation DeletePump($id: Int) {
  deletePump(id: $id) {
    id
  }
}
`;