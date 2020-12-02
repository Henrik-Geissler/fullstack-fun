/**
 * Copyright (c) 2020, Henrik Geißler
 */
import DataLoader from 'dataloader'

import { Updoot } from '../entities/Updoot'

// [{postId: 5, userId: 10}]
// [{postId: 5, userId: 10, value: 1}]
export const createUpdootLoader = (): DataLoader<
  { postId: number; userId: number },
  Updoot | null
> =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async keys => {
      const updoots = await Updoot.findByIds(keys as any)
      const updootIdsToUpdoot: Record<string, Updoot> = {}
      updoots.forEach(updoot => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot
      })

      return keys.map(key => updootIdsToUpdoot[`${key.userId}|${key.postId}`])
    }
  )
