import Fastify from 'fastify'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  fastify.get('/pools/count', (req, res) => {
    return { count: 126 }
  })

  fastify.listen({ port: 3333 })
}

bootstrap()
