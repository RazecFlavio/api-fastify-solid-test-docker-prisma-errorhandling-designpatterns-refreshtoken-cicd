import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let checkInRepository: InMemoryGymsRepository
let useCase: SearchGymsUseCase

// test unitarios
describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryGymsRepository()
    useCase = new SearchGymsUseCase(checkInRepository)
  })

  it('should be able to search for gyms', async () => {
    await checkInRepository.create({
      title: 'JavaScript Gym',
      description: 'FullStack JS',
      latitude: 0,
      longitude: 0,
    })
    await checkInRepository.create({
      title: 'TypeScript Gym',
      description: 'FullStack JS with TS',
      latitude: 0,
      longitude: 0,
    })
    const { gyms } = await useCase.execute({ query: 'JavaScript', page: 1 })

    expect(gyms).toHaveLength(1)
  })
  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        title: `TypeScript Gym ${i}`,
        description: 'FullStack JS with TS',
        latitude: 0,
        longitude: 0,
      })
    }
    const { gyms } = await useCase.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})
