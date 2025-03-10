import { createRouter, createWebHistory } from 'vue-router'

import { RouterGuardsBeforeEach } from './guards/index.ts'
import routes from './routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(RouterGuardsBeforeEach)

export default router
