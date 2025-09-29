import { PrismaClient } from "./generated/prisma";

export const prisma = new PrismaClient();

// async function main() {
//   // const result = await prisma.user.create({
//   //   data: {
//   //     name: "Imran Khan3",
//   //     email: "imran3@gmail.com",
//   //   },
//   // });

//   const userData = await prisma.user.findMany()
//   console.log(userData);
// }

// main();
