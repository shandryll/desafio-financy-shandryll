import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      type
      description
      date
      value
      category_id
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

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($data: UpdateTransactionInput!, $id: String!) {
    updateTransaction(data: $data, id: $id) {
      id
      type
      description
      date
      value
      category_id
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

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      icon
      color
      created_at
      updated_at
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($data: UpdateCategoryInput!, $id: String!) {
    updateCategory(data: $data, id: $id) {
      id
      title
      description
      icon
      color
      created_at
      updated_at
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
