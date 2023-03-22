import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  // Authenticaded
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
