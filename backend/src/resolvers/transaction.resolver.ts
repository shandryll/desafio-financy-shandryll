import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import { IsAuth } from "../middlewares/auth.middleware";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { GraphqlContext } from "../graphql/context";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @Ctx() ctx: GraphqlContext,
  ): Promise<TransactionModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.transactionService.createTransaction(ctx.user, data);
  }

  @Query(() => [TransactionModel])
  async listMyTransactions(
    @Ctx() ctx: GraphqlContext,
  ): Promise<TransactionModel[]> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.transactionService.listTransactionsByUser(ctx.user);
  }

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg("id", () => String) id: string,
  ): Promise<TransactionModel> {
    return this.transactionService.findTransaction(id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Ctx() ctx: GraphqlContext,
  ): Promise<TransactionModel> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.transactionService.updateTransaction(id, ctx.user, data);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<boolean> {
    if (!ctx.user) throw new Error("User not authenticated");
    return this.transactionService.deleteTransaction(id, ctx.user);
  }
}
