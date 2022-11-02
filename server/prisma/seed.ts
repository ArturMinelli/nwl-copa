import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@doe.com',
      avatarUrl: 'https://github.com/ArturMinell.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Test Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-29T20:20:30.300Z",
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-29T20:20:30.300Z",
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 7,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()
