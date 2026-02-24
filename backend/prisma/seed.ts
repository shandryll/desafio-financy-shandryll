import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

async function main() {
  console.log("Starting seed...");

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@email.com",
    },
  });

  if (existingAdmin) {
    console.log("Admin user already exists.");
  } else {
    const hashedPassword = await hashPassword("admin123");

    await prisma.user.create({
      data: {
        name: "Administrator",
        email: "admin@email.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  console.log("Seed finished!");
}

main()
  .catch((e) => {
    console.error("Error running seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
