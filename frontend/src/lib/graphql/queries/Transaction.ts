import { gql } from "@apollo/client";

export const LIST_MY_TRANSACTIONS = gql`
  query ListTransaction {
    listTransaction {
      id
      type
      description
      date
      value
      category_id
      user_id
      category {
        id
        title
      }
      user {
        id
        full_name
      }
    }
  }
`;
