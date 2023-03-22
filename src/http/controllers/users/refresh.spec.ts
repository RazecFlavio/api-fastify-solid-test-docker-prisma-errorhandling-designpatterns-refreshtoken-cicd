import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'Flavio Cezar',
      email: 'email@email.com',
      password: '123456',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'email@email.com',
      password: '123456',
    })

    const cookies = response.get('Set-Cookie')

    const tokenRefreshResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(tokenRefreshResponse.statusCode).toEqual(200)
    expect(tokenRefreshResponse.body).toEqual({
      token: expect.any(String),
    })
    expect(tokenRefreshResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
