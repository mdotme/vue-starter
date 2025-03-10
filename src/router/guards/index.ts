import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { ExampleGuard } from './example.guard'

// This should not be empty
const guards = {
  ExampleGuard,
}

export type TGuardNames = keyof typeof guards

export const RouterGuardsBeforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const routeGuards = to.meta?.guards as TGuardNames[] | undefined

  if (!routeGuards || routeGuards.length === 0) {
    return next()
  }

  for (const guardName of routeGuards) {
    const GuardClass = guards?.[guardName]

    if (GuardClass) {
      const instance = new GuardClass()
      const result = await instance.canActivate({ from, to })

      if (result === false) {
        return next(false) // Stop navigation if guard fails
      } else if (typeof result === 'object') {
        return next(result) // Redirect if guard returns a route
      }
    }
  }

  next() // Proceed if all guards pass
}
