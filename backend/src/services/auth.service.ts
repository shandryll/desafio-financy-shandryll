import { prismaClient } from "../../prisma/prisma";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";
import { mapUserToGql } from "../utils/mapToGql";
import type { User } from "@prisma/client";

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!existingUser) throw new Error("User not registered!");
    const compare = await comparePassword(data.password, existingUser.password);
    if (!compare) throw new Error("Invalid password!");
    return this.gerenerateTokens(existingUser);
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) throw new Error("Email already registered!");

    const hash = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.full_name,
        email: data.email,
        password: hash,
      },
    });
    return this.gerenerateTokens(user);
  }

  gerenerateTokens(user: User) {
    const token = signJwt({ id: user.id, email: user.email }, "1d");
    const refreshToken = signJwt({ id: user.id, email: user.email }, "15d");
    return { token, refreshToken, user: mapUserToGql(user) };
  }
}
