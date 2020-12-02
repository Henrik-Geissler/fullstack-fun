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

import { COOKIE_NAME, PRODUCTION } from './constants'
import { Post } from './entities/Post'
import { Updoot } from './entities/Updoot'
import { User } from './entities/User'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import { createUpdootLoader } from './utils/createUpdootLoader'
import { createUserLoader } from './utils/createUserLoader'

const main = async () => {
  // const conn =
  await createConnection({
    entities: [Post, User, Updoot],
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
    type: 'postgres',
    url: process.env.DATABASE_URL,
  })
  // await conn.runMigrations();

  // await Post.delete({});

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)
  app.set('trust proxy', 1)
  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    })
  )
  app.use(
    session({
      cookie: {
        // cookie only works in https
        domain: PRODUCTION ? '.fullstack.fun' : undefined,

        // 10 years
        httpOnly: true,

        maxAge: 1_000 * 60 * 60 * 24 * 365 * 10,
        sameSite: 'lax',
        // csrf
        secure: PRODUCTION,
      },
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      secret:
        process.env.SESSION_SECRET ?? 'no environmental SESSION_SECRET found',
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

  app.listen(Number.parseInt(process.env.PORT ?? '4000', 10), () => {
    console.log('server started on localhost:4000')
  })
}
// eslint-disable-next-line toplevel/no-toplevel-side-effect
main().catch(error => {
  console.error(error)
})
