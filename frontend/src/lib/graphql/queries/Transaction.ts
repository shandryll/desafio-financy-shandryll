import { gql } from "@apollo/client";

export const LIST_MY_TRANSACTIONS = gql`
  query ListMyTransactions {
    listMyTransactions {
      id
      type
      description
      date
      amount
      category {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;
