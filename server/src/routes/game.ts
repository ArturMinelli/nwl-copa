import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/pools/:id/games',
    {
      onRequest: [authenticate]
    },
    async (request, reply) => {
      const listGamesParams = z.object({
        id: string(),
      })

      const { id } = listGamesParams.parse(request.params)

      const games = await prisma.game.findMany({
        orderBy: {
          date: 'desc'
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                poolId: id
              }
            }
          }
        }
      })

      return {
        games: games.map((game) => {
          return {
            ...games,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined,
          }
        })
      }
    }
  )
}
