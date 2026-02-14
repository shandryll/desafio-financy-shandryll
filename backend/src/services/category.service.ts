import { prismaClient } from "../../prisma/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(userId: string, data: CreateCategoryInput) {
    return prismaClient.category.create({
      data: { name: data.name, user: { connect: { id: userId } } },
    });
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({ where: { userId } });
  }

  async findCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Action not authorized");
    return category;
  }

  async updateCategory(id: string, userId: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Action not authorized");
    return prismaClient.category.update({
      where: { id },
      data: { name: data.name ?? undefined },
    });
  }

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Action not authorized");
    await prismaClient.category.delete({ where: { id } });
    return true;
  }
}
