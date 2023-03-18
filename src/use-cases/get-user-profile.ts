import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}
interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.repository.findById(userId)
    if (!user) throw new ResourceNotFoundError()
    return {
      user,
    }
  }
}
