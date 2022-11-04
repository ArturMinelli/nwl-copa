import { FastifyInstance } from "fastify";
import { z } from "zod";
import fetch from 'node-fetch'
import { prisma } from "../lib/prisma"
import { User } from "@prisma/client";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    const createUserBody = z.object({
      access_token: z.string(),
    })
    const { access_token } = createUserBody.parse(request.body)

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    const userData = await userResponse.json()

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url()
    })

    const userInfo = userInfoSchema.parse(userData)

    let user: any

    user = prisma.user.findUnique({
      where: {
        googleId: userInfo.id
      }
    })

    if(!user) {
      user = prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          googleId: userInfo.id
        }
      })
    }

    const token = fastify.jwt.sign({
      name: user.id,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id,
      expiresIn: '7 days',
    })
  })
}