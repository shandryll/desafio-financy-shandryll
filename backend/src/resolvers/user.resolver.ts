import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateUserInput, UpdateUserInput, UpdateProfileInput } from "../dtos/input/user.input";
import { GraphqlContext } from "../graphql/context";
import { mapUserToGql } from "../utils/mapToGql";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput,
  ): Promise<UserModel> {
    const user = await this.userService.createUser(data);
    return mapUserToGql(user) as UserModel;
  }

  @Mutation(() => UserModel)
  async updateProfile(
    @Arg("data", () => UpdateProfileInput) data: UpdateProfileInput,
    @Arg("id", () => String) id: string,
  ): Promise<UserModel> {
    const user = await this.userService.updateProfile(data, id);
    return mapUserToGql(user) as UserModel;
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
  ): Promise<UserModel> {
    const user = await this.userService.updateUser(id, data);
    return mapUserToGql(user) as UserModel;
  }

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    const user = await this.userService.findUser(id);
    return mapUserToGql(user) as UserModel;
  }
}
