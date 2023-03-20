import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckinUseCase } from './validate-check-in'

let checkInRepository: InMemoryCheckinsRepository
let useCase: ValidateCheckinUseCase

// test unitarios
describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckinsRepository()
    useCase = new ValidateCheckinUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validade the checkin', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await useCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validade an inexistent check-in', async () => {
    await expect(async () => {
      await useCase.execute({
        checkInId: 'inexistent-check-in-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to validade check-in after 20 minutos of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 26, 13, 20))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const twentyOneMinutes = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutes)

    await expect(async () => {
      await useCase.execute({
        checkInId: createdCheckIn.id,
      })
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
