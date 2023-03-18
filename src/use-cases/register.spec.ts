import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, it, describe, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let repository: InMemoryUsersRepository
let useCase: RegisterUseCase

// test unitarios
describe('Register Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    useCase = new RegisterUseCase(repository)
  })

  it('should be able to register', async () => {
    const { user } = await useCase.execute({
      name: 'Flavio Cezar',
      email: 'fcezar@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await useCase.execute({
      name: 'Flavio Cezar',
      email: 'fcezar@example.com',
      password: '123456',
    })

    const isHashed = await compare('123456', user.password_hash)
    expect(isHashed).toBe(true)
  })
  it('should not be able to register with same emai twice', async () => {
    const email = 'email@email.com.br'

    await useCase.execute({
      name: 'Flavio Cezar',
      email,
      password: '123456',
    })

    await expect(() =>
      useCase.execute({
        name: 'Flavio Cezar',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
