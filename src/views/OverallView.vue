<script setup>
import { computed } from 'vue'
import {
  leader,
  facultyList,
  membersByAdvisor,
  memberTypeLabels,
} from '../data/members.js'
import PersonCard from '../components/PersonCard.vue'

const groups = [
  { id: 'academic',    label: '学术 PI', color: '#0ea5e9', desc: '科研方向带头人，主持基础研究与人才培养。' },
  { id: 'engineering', label: '工程 PI', color: '#14b8a6', desc: '负责工程化、平台与系统集成。' },
  { id: 'industry',    label: '产业 PI', color: '#f59e0b', desc: '联通学术与产业，推动成果转化与落地。' },
]

const grouped = computed(() => {
  return groups.map((g) => ({
    ...g,
    pis: facultyList
      .filter((f) => f.roleType === g.id)
      .map((f) => ({ ...f, students: membersByAdvisor(f.id) })),
  }))
})
</script>

<template>
  <main class="page">
    <div class="container">
      <div class="page-header">
        <span class="page-eyebrow">视图 01 · OVERALL</span>
        <h1 class="page-title">总体架构</h1>
        <p class="page-desc">
          以人为核心的层次树形结构：学术带头人位于顶层，向下分为
          <b>学术 PI</b> / <b>工程 PI</b> / <b>产业 PI</b>，每位 PI 下挂载所指导的学生与工程师。
        </p>
      </div>

      <!-- 第一层：学术带头人 -->
      <div class="tree">
        <div class="leader-wrap">
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
        </div>

        <!-- 连线到三个组 -->
        <div class="trunk-line"></div>

        <!-- 第二层：三个 PI 组 -->
        <div class="groups">
          <div
            v-for="group in grouped"
            :key="group.id"
            class="group-col"
          >
            <div class="branch-line" :style="{ background: group.color }"></div>

            <div class="group-card card" :style="{ borderTopColor: group.color }">
              <div class="group-header">
                <div class="group-title">
                  <span class="group-dot" :style="{ background: group.color }"></span>
                  <h2>{{ group.label }}</h2>
                </div>
                <p class="group-desc">{{ group.desc }}</p>
                <div class="group-count">{{ group.pis.length }} 位 PI</div>
              </div>

              <div class="pi-list">
                <div v-for="pi in group.pis" :key="pi.id" class="pi-block">
                  <div class="pi-head">
                    <PersonCard
                      :name="pi.name"
                      :sub="`${pi.title} · ${pi.org}`"
                      :role="pi.roleType"
                      variant="pi"
                    >
                      <template #badge>
                        <span class="role-badge" :class="`role-${pi.roleType}`">
                          {{ pi.roleLabel }}
                        </span>
                      </template>
                    </PersonCard>
                  </div>

                  <div v-if="pi.students.length" class="pi-students">
                    <div class="connector"></div>
                    <div class="students-grid">
                      <div
                        v-for="s in pi.students"
                        :key="s.id"
                        class="student-chip"
                        :title="`${memberTypeLabels[s.type]} · ${s.year} 级`"
                      >
                        <span class="dot" :style="{ background: group.color }"></span>
                        <span class="s-name">{{ s.name }}</span>
                        <span class="s-meta">{{ memberTypeLabels[s.type][0] }}{{ s.year }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="empty-students">暂无在册成员</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 图例 -->
      <div class="legend card">
        <div class="legend-title">图例</div>
        <div class="legend-items">
          <div class="legend-item"><span class="lg-dot" style="background:#0ea5e9"></span>学术 PI</div>
          <div class="legend-item"><span class="lg-dot" style="background:#14b8a6"></span>工程 PI</div>
          <div class="legend-item"><span class="lg-dot" style="background:#f59e0b"></span>产业 PI</div>
          <div class="legend-item"><span class="lg-tag">博</span>博士研究生</div>
          <div class="legend-item"><span class="lg-tag">硕</span>硕士研究生</div>
          <div class="legend-item"><span class="lg-tag">本</span>本科生</div>
          <div class="legend-item"><span class="lg-tag">工</span>工程师</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.tree {
  position: relative;
  padding-top: 8px;
}

.leader-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.trunk-line {
  width: 2px;
  height: 36px;
  margin: 0 auto;
  background: linear-gradient(180deg, #0ea5e9, transparent);
  opacity: 0.6;
}

.groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  align-items: stretch;
}

.group-col {
  position: relative;
  display: flex;
  flex-direction: column;
}
.branch-line {
  width: 2px;
  height: 18px;
  margin: -2px auto 8px;
  border-radius: 2px;
  opacity: 0.7;
}

.group-card {
  border-top: 4px solid var(--color-primary);
  padding: 18px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
}

.group-header { display: flex; flex-direction: column; gap: 4px; }
.group-title { display: flex; align-items: center; gap: 10px; }
.group-title h2 { margin: 0; font-size: 18px; font-weight: 700; }
.group-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
}
.group-desc { font-size: 12.5px; color: var(--color-text-muted); margin: 0; }
.group-count {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-subtle);
  background: var(--color-bg-soft);
  padding: 2px 8px;
  border-radius: 999px;
  width: fit-content;
}

.pi-list { display: flex; flex-direction: column; gap: 16px; }

.pi-block {
  position: relative;
  border: 1px solid var(--color-border-soft);
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(180deg, #fbfdff, #ffffff);
}

.pi-head { display: flex; }

.pi-students { margin-top: 12px; }
.connector {
  width: 2px;
  height: 10px;
  margin: 0 0 8px 18px;
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.5), transparent);
  border-radius: 2px;
}
.students-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.student-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: 999px;
  padding: 4px 10px 4px 8px;
  font-size: 12px;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.student-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(14, 165, 233, 0.5);
  box-shadow: 0 2px 6px rgba(14, 165, 233, 0.12);
}
.student-chip .dot {
  width: 6px; height: 6px; border-radius: 50%;
}
.student-chip .s-name { font-weight: 600; color: var(--color-text); }
.student-chip .s-meta {
  font-size: 10.5px;
  color: var(--color-text-subtle);
  background: var(--color-bg-soft);
  border-radius: 999px;
  padding: 1px 6px;
}

.empty-students {
  margin-top: 10px;
  padding: 8px 12px;
  background: var(--color-bg-soft);
  border-radius: 10px;
  color: var(--color-text-subtle);
  font-size: 12px;
  text-align: center;
}

.legend {
  margin-top: 28px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.legend-title { font-weight: 700; font-size: 13px; color: var(--color-text); }
.legend-items { display: flex; flex-wrap: wrap; gap: 14px; }
.legend-item { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--color-text-muted); }
.lg-dot { width: 10px; height: 10px; border-radius: 50%; }
.lg-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--color-bg-soft);
  font-size: 10.5px;
  font-weight: 700;
  color: var(--color-primary-600);
}

@media (max-width: 980px) {
  .groups { grid-template-columns: 1fr; }
}
</style>
