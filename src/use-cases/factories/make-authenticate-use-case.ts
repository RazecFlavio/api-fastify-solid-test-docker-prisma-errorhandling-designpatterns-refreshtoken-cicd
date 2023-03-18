import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
