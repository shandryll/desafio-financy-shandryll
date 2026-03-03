import { prismaClient } from "../../prisma/prisma";
import { CreateUserInput, UpdateUserInput, UpdateProfileInput } from "../dtos/input/user.input";
import { hashPassword } from "../utils/hash";

export class UserService {
  async createUser(data: CreateUserInput) {
    const findUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (findUser) throw new Error("User already registered!");
    const hash = data.password ? await hashPassword(data.password) : undefined;
    return prismaClient.user.create({
      data: {
        name: data.full_name,
        email: data.email,
        password: hash ?? undefined,
      },
    });
  }

  async updateProfile(data: UpdateProfileInput, id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    return prismaClient.user.update({
      where: { id },
      data: {
        name: data.full_name ?? undefined,
        email: data.email ?? undefined,
      },
    });
  }

  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new Error("User does not exist");
    return user;
  }

  async listUsers() {
    return prismaClient.user.findMany();
  }

  async updateUser(id: string, data: UpdateUserInput & UpdateProfileInput) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error("User does not exist");

    return prismaClient.user.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        role: data.role ?? undefined,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error("User does not exist");

    await prismaClient.user.delete({
      where: { id },
    });

    return true;
  }
}
