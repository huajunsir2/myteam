import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OverallView from '../views/OverallView.vue'
import DirectionView from '../views/DirectionView.vue'
import PlatformView from '../views/PlatformView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: '首页' } },
  { path: '/overall', name: 'overall', component: OverallView, meta: { title: '总体架构' } },
  { path: '/direction', name: 'direction', component: DirectionView, meta: { title: '研究方向' } },
  { path: '/platform', name: 'platform', component: PlatformView, meta: { title: '平台依托' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = '知识引擎实验室 · 管理与组织架构'
  document.title = to.meta.title ? `${to.meta.title} | ${base}` : base
})

export default router
