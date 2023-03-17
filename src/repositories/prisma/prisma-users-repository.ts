import { api } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await api.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await api.user.create({
      data,
    })

    return user
  }
}
