import { getUser } from "~/features/auth/data-access/get-user";

export async function ensureUser(request: Request) {
  const user = await getUser(request)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}