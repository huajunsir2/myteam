<script setup>
import { RouterLink } from 'vue-router'
import { leader, secretary, facultyList, memberList, directions, platforms } from '../data/members.js'
import PersonCard from '../components/PersonCard.vue'

const stats = [
  { label: '学术带头人', value: 1 },
  { label: '核心 PI', value: facultyList.length },
  { label: '在读 / 工程师', value: memberList.length },
  { label: '研究方向', value: directions.length },
  { label: '依托平台', value: platforms.length },
]

const pages = [
  {
    to: '/overall',
    eyebrow: '视图 01',
    title: '总体架构',
    desc: '以人为核心的层次树形结构，清晰呈现学术带头人、PI 与学生的归属关系。',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    icon: '🌳',
  },
  {
    to: '/direction',
    eyebrow: '视图 02',
    title: '研究方向',
    desc: '按通用智能技术、AI4S、AI 海洋三大方向组织，方向 → PI → 成员逐级展开。',
    color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    icon: '🧭',
  },
  {
    to: '/platform',
    eyebrow: '视图 03',
    title: '平台依托',
    desc: '按二级单位划分，老师在前，学生与工程师按入学年级排列；含智科慧创公司架构。',
    color: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
    icon: '🏛️',
  },
]
</script>

<template>
  <main class="page home">
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-text">
            <span class="page-eyebrow">Knowledge Engine Lab · ZJU</span>
            <h1 class="hero-title">
              知识引擎实验室
            </h1>
            <p class="hero-subtitle">管理与组织架构</p>
            <p class="hero-desc">
              聚焦知识图谱、知识引擎、可信人工智能与跨学科 AI 应用，
              构建从基础研究到产业落地的完整链路。
            </p>
            <div class="hero-cta">
              <RouterLink class="btn primary" to="/overall">查看总体架构 →</RouterLink>
              <RouterLink class="btn ghost" to="/direction">研究方向</RouterLink>
              <RouterLink class="btn ghost" to="/platform">平台依托</RouterLink>
            </div>
          </div>

          <div class="hero-card card">
            <div class="hero-card-header glass-header">
              <span>实验室负责人</span>
            </div>
            <div class="hero-card-body">
              <PersonCard
                :name="leader.name"
                :sub="`${leader.title} · ${leader.org}`"
                size="lg"
                variant="leader"
                glow
              >
                <template #badge>
                  <span class="role-badge role-academic">学术带头人</span>
                </template>
              </PersonCard>
              <p class="leader-bio">{{ leader.bio }}</p>
              <div class="secretary-row">
                <span class="muted">实验室秘书</span>
                <PersonCard :name="secretary.name" :sub="secretary.role" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats container">
      <div class="stats-grid">
        <div v-for="s in stats" :key="s.label" class="stat-card">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <section class="container pages">
      <div class="section-head">
        <h2>三种组织架构呈现形式</h2>
        <p>同一实验室，三种视角。点击下方卡片进入对应页面。</p>
      </div>
      <div class="pages-grid">
        <RouterLink v-for="p in pages" :key="p.to" :to="p.to" class="page-card card">
          <div class="page-card-icon" :style="{ background: p.color }">
            <span>{{ p.icon }}</span>
          </div>
          <div class="page-card-body">
            <div class="page-card-eyebrow">{{ p.eyebrow }}</div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <span class="page-card-cta">进入页面 →</span>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home { padding-top: 32px; }

.hero { padding: 32px 0 24px; }
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 36px;
  align-items: center;
}

.hero-title {
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  margin: 14px 0 8px;
  background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 18px;
  letter-spacing: 0.04em;
}
.hero-desc {
  color: var(--color-text-muted);
  max-width: 560px;
  line-height: 1.75;
  font-size: 15px;
  margin-bottom: 24px;
}

.hero-cta { display: flex; gap: 10px; flex-wrap: wrap; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  border: 1px solid transparent;
}
.btn.primary {
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  color: #fff;
  box-shadow: 0 6px 18px rgba(14, 165, 233, 0.28);
}
.btn.primary:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(14, 165, 233, 0.34); }
.btn.ghost {
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-text);
  border-color: var(--color-border);
}
.btn.ghost:hover { background: #fff; border-color: rgba(14, 165, 233, 0.4); }

.hero-card { overflow: hidden; }
.hero-card-header {
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary-600);
  letter-spacing: 0.06em;
}
.hero-card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.leader-bio { font-size: 13.5px; color: var(--color-text-muted); line-height: 1.7; margin: 0; }
.secretary-row {
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px dashed var(--color-border);
  padding-top: 14px;
}
.muted { color: var(--color-text-subtle); font-size: 12.5px; }

.stats { margin: 28px auto; }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}
.stat-card {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--color-border-soft);
  border-radius: 14px;
  padding: 18px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.stat-value {
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-label { font-size: 12.5px; color: var(--color-text-muted); margin-top: 4px; }

.section-head { text-align: center; margin: 28px 0 20px; }
.section-head h2 { font-size: 24px; margin: 0 0 6px; }
.section-head p { color: var(--color-text-muted); font-size: 14px; margin: 0; }

.pages { margin-bottom: 40px; }
.pages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.page-card {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding: 22px;
  gap: 14px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  cursor: pointer;
}
.page-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(14, 165, 233, 0.4);
}
.page-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 26px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
}
.page-card-body { display: flex; flex-direction: column; gap: 6px; }
.page-card-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--color-primary-600);
}
.page-card-body h3 { margin: 0; font-size: 18px; font-weight: 700; }
.page-card-body p { margin: 0; color: var(--color-text-muted); font-size: 13.5px; line-height: 1.65; }
.page-card-cta { margin-top: 8px; color: var(--color-primary-600); font-weight: 600; font-size: 13px; }

@media (max-width: 980px) {
  .hero-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .pages-grid { grid-template-columns: 1fr; }
}
</style>
