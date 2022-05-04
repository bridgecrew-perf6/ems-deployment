import { gql } from "@apollo/client"
import { constant } from "lodash";


export const UPSERT_FLOOR = gql`
mutation UpsertFloor($num: String!, $description: String!, $id: Int) {
  upsertFloor(num: $num, description: $description, id: $id) {
    id
    num
    description
  }
}
`;


export const DELETE_FLOOR = gql`
mutation DeleteFloor($id: Int) {
  deleteFloor(id: $id) {
    id
  }
}
`;