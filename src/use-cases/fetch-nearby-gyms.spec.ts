import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let checkInRepository: InMemoryGymsRepository
let useCase: FetchNearbyGymsUseCase

// test unitarios
describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryGymsRepository()
    useCase = new FetchNearbyGymsUseCase(checkInRepository)
  })

  it('should be able to search for gyms', async () => {
    await checkInRepository.create({
      title: 'Near Gym',
      description: 'FullStack JS',
      latitude: -23.4645856,
      longitude: -46.5231297,
    })
    await checkInRepository.create({
      title: 'Far Gym',
      description: 'This gym is too far away',
      latitude: -23.1828726,
      longitude: -45.8470641,
    })
    const { gyms } = await useCase.execute({
      userLatitude: -23.4648016,
      userLongitude: -46.5220192,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
