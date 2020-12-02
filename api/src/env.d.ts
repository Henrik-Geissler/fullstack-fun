/**
 * Copyright (c) 2020, Henrik Geißler
 */
/* eslint-disable unicorn/prevent-abbreviations */
declare namespace NodeJS {
  export interface ProcessEnvironment {
    DATABASE_URL: string
    REDIS_URL: string
    PORT: string
    SESSION_SECRET: string
    CORS_ORIGIN: string
  }
}
