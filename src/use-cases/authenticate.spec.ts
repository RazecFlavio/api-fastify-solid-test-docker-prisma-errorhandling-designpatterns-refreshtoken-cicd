import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, it, describe, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// test unitarios
let repository: InMemoryUsersRepository
let useCase: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    useCase = new AuthenticateUseCase(repository)
  })
  it('should be able to authenticate', async () => {
    await repository.create({
      name: 'Flavio Cezar',
      email: 'fcezar@example.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await useCase.execute({
      email: 'fcezar@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should be not able to authenticate with wrong email', async () => {
    await expect(async () => {
      await useCase.execute({
        email: 'fcezar@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should be not able to authenticate with wrong password', async () => {
    await repository.create({
      name: 'Flavio Cezar',
      email: 'fcezar@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async () => {
      await useCase.execute({
        email: 'fcezar@example.com',
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
