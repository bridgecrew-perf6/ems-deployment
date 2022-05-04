import { gql } from "@apollo/client"


export const UPSERT_GEN = gql`
mutation UpsertGenerator($name: String!, $description: String!, $id: Int) {
  upsertGenerator(name: $name, description: $description, id: $id) {
    id
    name
    description
  }
}
`;


export const DELETE_GEN = gql`
mutation DeleteGenerator($id: Int) {
  deleteGenerator(id: $id) {
    id
  }
}
`;