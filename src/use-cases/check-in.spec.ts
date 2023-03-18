import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckinUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberCheckInsError } from './errors/max-numer-of-check-ins-error'

let checkInRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let useCase: CheckinUseCase

// test unitarios
describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    useCase = new CheckinUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript GYM',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      description: '',
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in a day', async () => {
    vi.setSystemTime(new Date(2023, 0, 26, 21, 50, 0))

    await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(async () => {
      await useCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should not be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 26, 21, 50, 0))

    await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2023, 0, 27, 21, 50, 0))
    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript GYM',
      latitude: new Decimal(-23.4634863),
      longitude: new Decimal(-46.5280645),
      description: '',
      phone: '',
    })

    await expect(
      async () =>
        await useCase.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: -23.4645807,
          userLongitude: -46.5231297,
        }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
