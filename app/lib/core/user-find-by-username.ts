import { db, type User } from "~/lib/db.server";

export async function userFindByUsername(username: string): Promise<User | null> {
  return await db.user.findFirst({ where: { username } })
}