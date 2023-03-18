import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckinsRepository
let useCase: GetUserMetricsUseCase

// test unitarios
describe('Get user metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckinsRepository()
    useCase = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await useCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
