import { db, type User, type UserUpdateInput, UserUpdateInputSchema } from "~/lib/db.server";

export type UserUpdateProfileInput = Pick<UserUpdateInput, 'avatarUrl' | 'name' | 'username'>

export async function userUpdateProfile(id: string, input: UserUpdateProfileInput): Promise<User> {
  const { error, data } = UserUpdateInputSchema.safeParse(input)
  if (error) {
    console.error(error)
    throw new Error('Invalid user data')
  }
  const found = await db.user.findFirst({ where: { id } })

  if (!found) {
    throw new Error('User not found')
  }


  try {
    return db.user.update({
      where: { id }, data: {
        ...data, admin: found.admin, password: found.password
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update user')
  }
}

