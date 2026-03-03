import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CategoryModel } from "../models/category.model";
import type { TransactionModel } from "../models/transaction.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";
import { GraphqlContext } from "../graphql/context";
import { mapCategoryToGql, mapTransactionToGql, mapUserToGql } from "../utils/mapToGql";
import { UserModel } from "../models/user.model";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();
  private userService = new UserService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ): Promise<CategoryModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    const category = await this.categoryService.createCategory(ctx.user, data);
    return mapCategoryToGql(category) as CategoryModel;
  }

  @Query(() => [CategoryModel])
  async listCategory(@Ctx() ctx: GraphqlContext): Promise<CategoryModel[]> {
    if (!ctx.user) throw new Error("User not authenticated");
    const list = await this.categoryService.listCategories(ctx.user);
    return list.map(mapCategoryToGql) as CategoryModel[];
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<CategoryModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    const category = await this.categoryService.updateCategory(id, ctx.user, data);
    return mapCategoryToGql(category) as CategoryModel;
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<boolean> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.categoryService.deleteCategory(id, ctx.user);
  }

  @FieldResolver(() => UserModel, { nullable: true })
  async user(@Root() category: CategoryModel): Promise<UserModel | null> {
    const u = await this.userService.findUser(category.user_id);
    return u ? mapUserToGql(u) as UserModel : null;
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    const list = await this.transactionService.findByCategoryId(category.id);
    return list.map(mapTransactionToGql) as TransactionModel[];
  }
}
