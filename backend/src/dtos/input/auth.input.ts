import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterInput {
  @Field(() => String)
  full_name!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}
