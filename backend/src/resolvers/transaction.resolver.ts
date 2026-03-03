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
import { TransactionModel } from "../models/transaction.model";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { TransactionService } from "../services/transaction.service";
import { CategoryService } from "../services/category.service";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { GraphqlContext } from "../graphql/context";
import { mapTransactionToGql, mapCategoryToGql, mapUserToGql } from "../utils/mapToGql";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();
  private userService = new UserService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @Ctx() ctx: GraphqlContext,
  ): Promise<TransactionModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    const tx = await this.transactionService.createTransaction(ctx.user, data);
    return mapTransactionToGql(tx) as TransactionModel;
  }

  @Query(() => [TransactionModel])
  async listTransaction(@Ctx() ctx: GraphqlContext): Promise<TransactionModel[]> {
    if (!ctx.user) throw new Error("User not authenticated");
    const list = await this.transactionService.listTransaction(ctx.user);
    return list.map(mapTransactionToGql) as TransactionModel[];
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<TransactionModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    const tx = await this.transactionService.updateTransaction(id, ctx.user, data);
    return mapTransactionToGql(tx) as TransactionModel;
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<boolean> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.transactionService.deleteTransaction(id, ctx.user);
  }

  @FieldResolver(() => UserModel, { nullable: true })
  async user(@Root() transaction: TransactionModel): Promise<UserModel | null> {
    const u = await this.userService.findUser(transaction.user_id);
    return u ? (mapUserToGql(u) as UserModel) : null;
  }

  @FieldResolver(() => CategoryModel, { nullable: true })
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel | null> {
    const cat = await this.categoryService.findCategory(transaction.category_id, transaction.user_id);
    return cat ? (mapCategoryToGql(cat) as CategoryModel) : null;
  }
}
