import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(repository)

  return useCase
}
