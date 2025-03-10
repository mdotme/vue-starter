import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

import { Promisable } from '@/types/general.types'

export interface RouterGuardContext {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
}

export abstract class RouterGuard {
  abstract canActivate(
    ctx: RouterGuardContext,
  ): Promisable<RouteLocationRaw | boolean>
}
