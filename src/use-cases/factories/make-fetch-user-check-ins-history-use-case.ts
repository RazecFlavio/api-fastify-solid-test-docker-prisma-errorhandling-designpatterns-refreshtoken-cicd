import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(repository)

  return useCase
}
