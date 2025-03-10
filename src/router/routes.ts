import { TRouteRecordLike } from '@/types/router.types'

export default [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/PIndex.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/PAbout.vue'),
  },
  {
    path: '/protected',
    name: 'Protected',
    meta: {
      guards: ['ExampleGuard'],
    },
    component: () => import('@/pages/PProtected.vue'),
  },
] satisfies TRouteRecordLike[]
