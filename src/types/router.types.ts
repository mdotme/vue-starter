import { RouteRecordRaw } from 'vue-router'

import { TGuardNames } from '@/router/guards'

export type TRouteMeta = {
  guards?: TGuardNames[]
}

export type TRouteRecordMeta = Omit<RouteRecordRaw, 'meta' | 'children'> & {
  meta?: TRouteMeta
  children?: RouteRecordRaw[] | TRouteRecordMeta[]
}

export type TRouteRecordLike = TRouteRecordMeta
