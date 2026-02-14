import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => UserModel)
  user!: UserModel;
}
