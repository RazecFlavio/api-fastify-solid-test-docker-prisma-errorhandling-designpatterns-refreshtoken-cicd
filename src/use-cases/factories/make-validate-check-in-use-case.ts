import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckinUseCase } from '../validate-check-in'

export function makeValidadeCheckInsUseCase() {
  const repository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckinUseCase(repository)

  return useCase
}
