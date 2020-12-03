/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, InputType } from 'type-graphql'

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string

  @Field()
  username: string

  @Field()
  password: string
}
