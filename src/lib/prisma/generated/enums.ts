
/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// @ts-nocheck 
/**
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/
export const ReadingStatus = {
  reading: 'reading',
  completed: 'completed',
  on_hold: 'on_hold',
  planning: 'planning',
  dropped: 'dropped'
} as const

export type ReadingStatus = (typeof ReadingStatus)[keyof typeof ReadingStatus]


export const NotificationType = {
  like: 'like',
  comment: 'comment',
  status_post: 'status_post',
  follow: 'follow'
} as const

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const AccountVisibility = {
  public: 'public',
  private: 'private'
} as const

export type AccountVisibility = (typeof AccountVisibility)[keyof typeof AccountVisibility]


export const FeedTab = {
  following: 'following',
  global: 'global'
} as const

export type FeedTab = (typeof FeedTab)[keyof typeof FeedTab]


export const ListOrder = {
  score: 'score',
  progress: 'progress',
  start_date: 'start_date',
  finish_date: 'finish_date',
  total_repeats: 'total_repeats'
} as const

export type ListOrder = (typeof ListOrder)[keyof typeof ListOrder]


export const ExploreOrder = {
  oldest: 'oldest',
  newest: 'newest',
  acsending: 'acsending',
  decsending: 'decsending'
} as const

export type ExploreOrder = (typeof ExploreOrder)[keyof typeof ExploreOrder]


export const EntryStatus = {
  planning: 'planning',
  reading: 'reading',
  completed: 'completed',
  on_hold: 'on_hold'
} as const

export type EntryStatus = (typeof EntryStatus)[keyof typeof EntryStatus]
