/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Arg, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'

import Toast from '../../entities/Toast'
import ToastInput from './types/ToastInput'
import ToastResponse from './types/ToastResponse'

@Resolver(Toast)
class ToastResolver {
  @Query(() => Toast)
  async getToast(): Promise<Toast> {
    const toast = await getConnection().query(
      `
    select p.*
    from toast p
    order by p."createdAt" DESC
    limit 1
    `
    )

    return toast[0]
  }

  @Query(() => ToastResponse)
  async newToast(@Arg('options') options: ToastInput): Promise<ToastResponse> {
    // const errors = validateToast(options)
    // if (errors) {
    // return { errors }
    // }
    let toast
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Toast)
        .values({
          amount: options.amount,
          category: options.category,
          name: options.name,
        })
        .returning('*')
        .execute()
      toast = result.raw[0]
    } catch (error) {
      return error
    }

    return { toast }
  }
}

export default ToastResolver
