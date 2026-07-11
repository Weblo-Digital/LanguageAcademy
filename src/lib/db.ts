import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const isNode = typeof window === "undefined" && process.env.NEXT_RUNTIME !== "edge";

function createPrismaClient() {
  if (!isNode) return null as any;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return new PrismaClient() as any; // Fallback during compilation if URL is missing
  }

  const adapter = new PrismaMariaDb(connectionString);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (isNode && process.env.NODE_ENV !== "production" && db) {
  globalForPrisma.prisma = db;
}
