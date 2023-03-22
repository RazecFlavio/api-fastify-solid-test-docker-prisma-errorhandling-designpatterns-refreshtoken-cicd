import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Flavio Cezar',
      email: 'email@email.com',
      password: '123456',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'email@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
