import { adapterPrisma } from './adapter-prisma'
import { createPubkeyAuth } from './pubkey-auth'

export const pubkeyAuth = createPubkeyAuth({
  database: adapterPrisma(),
})
