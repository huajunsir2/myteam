<template>
  <div class="app-shell">
    <!-- Header -->
    <header class="site-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="logo-area">
          <div class="logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="url(#grad1)" opacity="0.15"/>
              <path d="M10 20 L20 10 L30 20 L20 30 Z" fill="url(#grad1)" opacity="0.6"/>
              <circle cx="20" cy="20" r="5" fill="url(#grad1)"/>
              <circle cx="10" cy="20" r="3" fill="#36cfc9" opacity="0.8"/>
              <circle cx="30" cy="20" r="3" fill="#36cfc9" opacity="0.8"/>
              <circle cx="20" cy="10" r="3" fill="#4096ff" opacity="0.8"/>
              <circle cx="20" cy="30" r="3" fill="#4096ff" opacity="0.8"/>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#1677ff"/>
                  <stop offset="100%" style="stop-color:#13c2c2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="logo-text">
            <h1 class="site-title">知识引擎实验室</h1>
            <p class="site-subtitle">管理与组织架构</p>
          </div>
        </div>
        <nav class="main-nav">
          <router-link to="/overall" class="nav-link">
            <span class="nav-icon">🏛️</span>
            <span>总体架构</span>
          </router-link>
          <router-link to="/research" class="nav-link">
            <span class="nav-icon">🔭</span>
            <span>研究方向</span>
          </router-link>
          <router-link to="/platform" class="nav-link">
            <span class="nav-icon">🏢</span>
            <span>平台依托</span>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <p>© 2024 知识引擎实验室 · 浙江大学</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(22, 119, 255, 0.1);
  box-shadow: 0 2px 20px rgba(22, 119, 255, 0.08);
}

.header-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(22,119,255,0.03) 0%, rgba(19,194,194,0.03) 100%);
  pointer-events: none;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.site-title {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.site-subtitle {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 1px;
  line-height: 1.2;
}

/* Nav */
.main-nav {
  display: flex;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  background: var(--primary-bg);
  color: var(--primary);
  border-color: rgba(22, 119, 255, 0.2);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.3);
}

.nav-icon {
  font-size: 16px;
  line-height: 1;
}

/* Main */
.main-content {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
}

/* Footer */
.site-footer {
  background: rgba(255,255,255,0.8);
  border-top: 1px solid var(--border);
  padding: 16px 24px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}
</style>
