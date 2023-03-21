import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckinUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckinUseCase(checkInRepository, gymsRepository)

  return useCase
}
