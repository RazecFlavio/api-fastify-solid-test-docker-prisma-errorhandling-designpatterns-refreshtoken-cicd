import request from 'supertest'
import { app } from '@/app'

import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby a gyms', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Nice Gym',
        phone: '119999999',
        latitude: -23.4645856,
        longitude: -46.5231297,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Nice Gym',
        phone: '119999999',
        latitude: -23.1828726,
        longitude: -45.8470641,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -23.1828726,
        longitude: -45.8470641,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })
})
