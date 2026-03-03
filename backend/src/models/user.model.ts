import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  full_name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  created_at?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated_at?: Date;
}
