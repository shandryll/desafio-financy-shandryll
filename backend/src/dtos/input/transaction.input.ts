import { Field, InputType } from "type-graphql";
import { TransactionType } from "../../models/transaction.model";

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  date!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
