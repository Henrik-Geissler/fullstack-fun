/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return 'hello whaat'
  }
}
