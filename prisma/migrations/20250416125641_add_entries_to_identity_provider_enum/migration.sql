-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "IdentityProvider" ADD VALUE 'Discord';
ALTER TYPE "IdentityProvider" ADD VALUE 'Github';
ALTER TYPE "IdentityProvider" ADD VALUE 'Solana';
ALTER TYPE "IdentityProvider" ADD VALUE 'Telegram';
ALTER TYPE "IdentityProvider" ADD VALUE 'X';
