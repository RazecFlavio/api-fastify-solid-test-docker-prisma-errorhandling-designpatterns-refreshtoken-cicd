import fastify from 'fastify'
import { usersRoutes } from './http/routes'

export const app = fastify()

app.register(usersRoutes)
