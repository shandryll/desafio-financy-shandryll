import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { IsAuth } from "../middlewares/auth.middleware";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";
import { GraphqlContext } from "../graphql/context";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ): Promise<CategoryModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.categoryService.createCategory(ctx.user, data);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ): Promise<CategoryModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.categoryService.updateCategory(id, ctx.user, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<boolean> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.categoryService.deleteCategory(id, ctx.user);
  }

  @Query(() => CategoryModel)
  async getCategory(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<CategoryModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.categoryService.findCategory(id, ctx.user);
  }

  @Query(() => [CategoryModel])
  async listCategories(@Ctx() ctx: GraphqlContext): Promise<CategoryModel[]> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.categoryService.listCategories(ctx.user);
  }
}
