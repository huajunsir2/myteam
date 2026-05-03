import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Repo name on GitHub: myteam
// For GitHub Pages we need the correct base path in production
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === 'production' ? '/myteam/' : '/',
}))
