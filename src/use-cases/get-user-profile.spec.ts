import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

// test unitarios
let repository: InMemoryUsersRepository
let useCase: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    useCase = new GetUserProfileUseCase(repository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await repository.create({
      name: 'Flavio Cezar',
      email: 'fcezar@example.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await useCase.execute({ userId: createdUser.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Flavio Cezar')
  })
  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      useCase.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
