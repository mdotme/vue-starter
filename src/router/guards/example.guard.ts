import { RouteLocationRaw } from 'vue-router'

import { Promisable } from '@/types/general.types'

import { RouterGuard, RouterGuardContext } from './router.guard'

// TODO: Example purposes only remove this
export class ExampleGuard implements RouterGuard {
  canActivate(
    _ctx: RouterGuardContext,
  ): Promisable<RouteLocationRaw | boolean> {
    console.warn('ExampleGuard is for example purposes please remove this')

    console.log('Is this working?')

    if (prompt('Enter password (vue)') !== 'vue') {
      alert('Sorry invalid password not allowed to this page')
      return false
    }

    return true
  }
}
