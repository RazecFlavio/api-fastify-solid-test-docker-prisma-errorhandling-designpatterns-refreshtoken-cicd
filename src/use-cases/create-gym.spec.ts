import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let usecase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    usecase = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create a gym', async () => {
    const { gym } = await usecase.execute({
      title: 'JavaScript Gym',
      description: 'Academia javascript para todos',
      latitude: 0,
      longitude: 0,
      phone: '11999999999',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
