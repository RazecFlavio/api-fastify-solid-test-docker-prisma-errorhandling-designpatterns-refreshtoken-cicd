import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(repository)

  return useCase
}
