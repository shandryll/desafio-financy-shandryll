import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query ListCategory {
    listCategory {
      id
      title
      description
      icon
      color
      created_at
      updated_at
      user_id
      transactions {
        id
        value
      }
    }
  }
`;
