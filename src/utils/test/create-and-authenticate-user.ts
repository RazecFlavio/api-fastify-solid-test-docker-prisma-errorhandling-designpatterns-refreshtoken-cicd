import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Flavio Cezar',
    email: 'email@email.com',
    password: '123456',
  })
  const authReponse = await request(app.server).post('/sessions').send({
    email: 'email@email.com',
    password: '123456',
  })

  const { token } = authReponse.body

  return { token }
}
