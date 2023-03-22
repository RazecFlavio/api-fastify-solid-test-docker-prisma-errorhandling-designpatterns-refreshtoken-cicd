import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // vai validar os cookies

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )
  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // https - o front end nao consegue ver o valor desta informação
      sameSite: true, // este cookie so vai ser acessivel pelo mesmo site
      httpOnly: true, // so vai ser acessado pelo back-end da app (request, response)
    })
    .status(200)
    .send({ token })
}
