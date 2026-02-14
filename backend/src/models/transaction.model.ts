import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

export enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

registerEnumType(TransactionType, {
  name: "TransactionType",
  description: "Transaction type: Expense or Income",
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => CategoryModel)
  category!: CategoryModel;

  @Field(() => UserModel)
  user!: UserModel;
}
