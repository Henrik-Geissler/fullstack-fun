/**
 * Copyright (c) 2020, Henrik Geißler
 */
import 'reflect-metadata'
import 'dotenv-safe/config'

import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import {
  COOKIE_NAME,
  CORS_ORIGIN,
  DATABASE_URL,
  PORT,
  PRODUCTION,
  REDIS_URL,
  SESSION_SECRET,
} from './config'
import Post from './entities/Post'
import Updoot from './entities/Updoot'
import User from './entities/User'
import HelloResolver from './resolvers/HelloResolver'
import PostResolver from './resolvers/Post/PostResolver'
import UserResolver from './resolvers/UserResolver'
import createUpdootLoader from './utils/createUpdootLoader'
import createUserLoader from './utils/createUserLoader'

const main = async () => {
  // const conn =
  await createConnection({
    entities: [Post, User, Updoot],
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
    type: 'postgres',
    url: DATABASE_URL,
  })
  // await conn.runMigrations();
  const app = express()
  const RedisStore = connectRedis(session)
  const redis = new Redis(REDIS_URL)
  app.set('trust proxy', 1)
  app.use(
    cors({
      credentials: true,
      origin: CORS_ORIGIN,
    })
  )
  app.use(
    session({
      cookie: {
        domain: PRODUCTION ? '.fullstack.fun' : undefined,
        httpOnly: true,
        maxAge: 1_000 * 60 * 60 * 24 * 365 * 10,
        sameSite: 'lax',
        secure: PRODUCTION,
      },
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
    })
  )
  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({
      redis,
      req,
      res,
      updootLoader: createUpdootLoader(),
      userLoader: createUserLoader(),
    }),
    // TODO: rm intro & playground in prod
    introspection: true,
    playground: true,
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
  })
  apolloServer.applyMiddleware({
    app,
    cors: false,
  })
  app.listen(PORT, () => {})
}
main().catch(error => {
  console.error(error)
})
