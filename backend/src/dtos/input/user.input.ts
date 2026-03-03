import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  full_name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  role?: string;
}

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  full_name?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
