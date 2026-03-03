import { registerEnumType } from "type-graphql";

export enum TransactionTypeGql {
  expense = "expense",
  revenue = "revenue",
}

registerEnumType(TransactionTypeGql, {
  name: "TransactionType",
});
