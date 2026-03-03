import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      refreshToken
      user {
        id
        full_name
        email
        created_at
        updated_at
      }
    }
  }
`
