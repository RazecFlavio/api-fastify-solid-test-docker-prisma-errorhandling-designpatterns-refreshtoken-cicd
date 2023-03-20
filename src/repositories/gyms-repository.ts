import { Gym, Prisma } from '@prisma/client'

export interface findManyGymsNearbyParams {
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyGymsNearby({
    latitude,
    longitude,
  }: findManyGymsNearbyParams): Promise<Gym[]>
}
