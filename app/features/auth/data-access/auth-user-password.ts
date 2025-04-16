import bcrypt from 'bcryptjs'

export const authUserPassword = {
  compare: (password: string, hash: string) => bcrypt.compare(password, hash),
  hash: (password: string) => bcrypt.hash(password, 10),
}
