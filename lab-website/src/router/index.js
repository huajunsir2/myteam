import { createRouter, createWebHashHistory } from 'vue-router'
import OverallStructure from '../views/OverallStructure.vue'
import ResearchDirections from '../views/ResearchDirections.vue'
import PlatformAffiliation from '../views/PlatformAffiliation.vue'

const routes = [
  { path: '/', redirect: '/overall' },
  { path: '/overall', component: OverallStructure, meta: { title: '总体架构' } },
  { path: '/research', component: ResearchDirections, meta: { title: '研究方向' } },
  { path: '/platform', component: PlatformAffiliation, meta: { title: '平台依托' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
