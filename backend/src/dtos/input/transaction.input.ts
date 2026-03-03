import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TransactionTypeGql } from "../../graphql/enums";

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionTypeGql)
  type!: TransactionTypeGql;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  value!: number;

  @Field(() => String)
  category_id!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => TransactionTypeGql, { nullable: true })
  type?: TransactionTypeGql;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date;

  @Field(() => Number, { nullable: true })
  value?: number;

  @Field(() => String, { nullable: true })
  category_id?: string;
}
