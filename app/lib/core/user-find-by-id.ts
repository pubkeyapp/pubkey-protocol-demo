import { db } from '~/lib/db.server'

export async function userFindById(id: string) {
  return await db.user.findFirst({ where: { id }, include: { identities: true } })
}
