import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
    url: "file:./prisma/bot.sqlite"
});

const prisma = new PrismaClient({
    adapter
});

export default prisma;