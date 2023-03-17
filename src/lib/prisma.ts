import { PrismaClient } from '@prisma/client'
import { env } from 'env'

export const api = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
