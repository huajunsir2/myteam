<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  { to: '/', label: '首页' },
  { to: '/overall', label: '总体架构' },
  { to: '/direction', label: '研究方向' },
  { to: '/platform', label: '平台依托' },
]

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" @click="menuOpen = false">
        <span class="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#0ea5e9" />
                <stop offset="1" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="3" fill="url(#g1)" />
            <circle cx="4" cy="6" r="2" fill="#0ea5e9" />
            <circle cx="20" cy="6" r="2" fill="#8b5cf6" />
            <circle cx="4" cy="18" r="2" fill="#14b8a6" />
            <circle cx="20" cy="18" r="2" fill="#0ea5e9" />
            <line x1="12" y1="12" x2="4" y2="6" stroke="#94a3b8" stroke-width="1" />
            <line x1="12" y1="12" x2="20" y2="6" stroke="#94a3b8" stroke-width="1" />
            <line x1="12" y1="12" x2="4" y2="18" stroke="#94a3b8" stroke-width="1" />
            <line x1="12" y1="12" x2="20" y2="18" stroke="#94a3b8" stroke-width="1" />
          </svg>
        </span>
        <span class="brand-text">
          <strong>知识引擎实验室</strong>
          <small>Knowledge Engine Lab</small>
        </span>
      </RouterLink>

      <button
        class="menu-toggle"
        :class="{ open: menuOpen }"
        aria-label="菜单"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>

      <nav class="nav" :class="{ open: menuOpen }">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: route.path === item.to }"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <strong>知识引擎实验室</strong>
        <span class="dot">·</span>
        <span>浙江大学</span>
      </div>
      <div class="muted">© {{ year }} Knowledge Engine Lab · 管理与组织架构</div>
    </div>
  </footer>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid var(--color-border-soft);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--color-text);
}
.brand-mark {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(139, 92, 246, 0.12));
  border-radius: 12px;
  border: 1px solid var(--color-border-soft);
}
.brand-mark svg { width: 24px; height: 24px; }
.brand-text { display: flex; flex-direction: column; line-height: 1.1; }
.brand-text strong { font-size: 16px; font-weight: 800; letter-spacing: 0.5px; }
.brand-text small { color: var(--color-text-subtle); font-size: 11px; letter-spacing: 0.06em; }

.nav { display: flex; gap: 6px; }
.nav-link {
  position: relative;
  padding: 8px 14px;
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 500;
  border-radius: 8px;
  transition: color 0.18s ease, background 0.18s ease;
}
.nav-link:hover { color: var(--color-text); background: rgba(14, 165, 233, 0.08); }
.nav-link.active {
  color: var(--color-primary-600);
  background: rgba(14, 165, 233, 0.12);
}
.nav-link.active::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: -2px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
}

.menu-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 38px;
  height: 38px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 0;
}
.menu-toggle span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.18s ease;
}

.site-footer {
  border-top: 1px solid var(--color-border-soft);
  background: rgba(255, 255, 255, 0.6);
  padding: 18px 0;
  font-size: 13px;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.footer-inner .muted { color: var(--color-text-subtle); }
.footer-inner .dot { margin: 0 8px; color: var(--color-text-subtle); }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from { opacity: 0; transform: translateY(8px); }
.fade-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 768px) {
  .menu-toggle { display: inline-flex; }
  .nav {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom: 1px solid var(--color-border-soft);
    flex-direction: column;
    padding: 12px;
    gap: 4px;
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease;
  }
  .nav.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .nav-link { padding: 12px 14px; }
}
</style>
