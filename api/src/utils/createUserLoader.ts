/**
 * Copyright (c) 2020, Henrik Geißler
 */
import DataLoader from 'dataloader'

import { User } from '../entities/User'

// [1, 78, 8, 9]
// [{id: 1, username: 'tim'}, {}, {}, {}]
export const createUserLoader = (): DataLoader<number, User> =>
  new DataLoader<number, User>(async userIds => {
    const users = await User.findByIds(userIds as number[])
    const userIdToUser: Record<number, User> = {}
    users.forEach(eachUser => {
      userIdToUser[eachUser.id] = eachUser
    })

    const sortedUsers = userIds.map(userId => userIdToUser[Number(userId)])
    // console.log("userIds", userIds);
    // console.log("map", userIdToUser);
    // console.log("sortedUsers", sortedUsers);

    return sortedUsers
  })
