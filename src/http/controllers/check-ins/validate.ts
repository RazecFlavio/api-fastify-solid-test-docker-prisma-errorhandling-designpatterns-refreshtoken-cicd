import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidadeCheckInsUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const useCase = makeValidadeCheckInsUseCase()

  await useCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
