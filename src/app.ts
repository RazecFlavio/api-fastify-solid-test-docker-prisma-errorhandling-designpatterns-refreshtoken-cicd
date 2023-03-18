import { env } from 'env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { usersRoutes } from './http/routes'

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error,', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: aqui deveriamos fazer um log para uma ferramenta externa como Datadog/newrelic/sentry
    // -> ferramenta de observabilidade
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
