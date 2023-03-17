import { IUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

// Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6)

    const exists = await this.usersRepository.findByEmail(email)
    if (exists) {
      throw new UserAlreadyExistsError()
    }

    this.usersRepository.create({ name, email, password_hash })
  }
}
