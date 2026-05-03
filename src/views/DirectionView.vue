<script setup>
import { computed } from 'vue'
import {
  directions,
  getFacultyById,
  membersByAdvisor,
  memberTypeLabels,
  memberTypeOrder,
} from '../data/members.js'
import PersonCard from '../components/PersonCard.vue'

const dirData = computed(() =>
  directions.map((d) => ({
    ...d,
    faculty: d.facultyIds.map((fid) => {
      const f = getFacultyById(fid)
      const students = membersByAdvisor(fid)
      const grouped = {}
      memberTypeOrder.forEach((t) => {
        const list = students.filter((s) => s.type === t)
        if (list.length) grouped[t] = list
      })
      return { ...f, students, grouped, total: students.length }
    }),
  })),
)
</script>

<template>
  <main class="page">
    <div class="container">
      <div class="page-header">
        <span class="page-eyebrow">视图 02 · DIRECTIONS</span>
        <h1 class="page-title">研究方向</h1>
        <p class="page-desc">
          以方向为中心组织人员：通用智能技术、AI 4 Science、AI 海洋。
          每个方向下挂载若干 PI，PI 下进一步呈现学生与工程师团队。
        </p>
      </div>

      <div class="dir-grid">
        <article
          v-for="dir in dirData"
          :key="dir.id"
          class="dir-card card"
          :style="{ '--accent': dir.color }"
        >
          <header class="dir-head">
            <div class="dir-icon" :style="{ background: dir.color }">
              <span>{{ dir.icon }}</span>
            </div>
            <div>
              <h2>{{ dir.name }}</h2>
              <p>{{ dir.summary }}</p>
            </div>
            <div class="dir-meta">
              <div><b>{{ dir.faculty.length }}</b> 位 PI</div>
              <div><b>{{ dir.faculty.reduce((a, b) => a + b.total, 0) }}</b> 位成员</div>
            </div>
          </header>

          <div class="pi-grid">
            <section v-for="f in dir.faculty" :key="f.id" class="pi-card">
              <div class="pi-card-head">
                <PersonCard
                  :name="f.name"
                  :sub="`${f.title} · ${f.org}`"
                  :role="f.roleType"
                  variant="pi"
                >
                  <template #badge>
                    <span class="role-badge" :class="`role-${f.roleType}`">{{ f.roleLabel }}</span>
                  </template>
                </PersonCard>
              </div>

              <div class="pi-students">
                <div v-if="!f.total" class="empty">暂无在册成员</div>
                <div v-else class="type-blocks">
                  <div
                    v-for="t in memberTypeOrder.filter((x) => f.grouped[x])"
                    :key="t"
                    class="type-block"
                  >
                    <div class="type-label">
                      <span class="t-dot" :style="{ background: dir.color }"></span>
                      {{ memberTypeLabels[t] }}
                      <span class="t-count">{{ f.grouped[t].length }}</span>
                    </div>
                    <div class="type-list">
                      <span v-for="s in f.grouped[t]" :key="s.id" class="s-pill">
                        {{ s.name }}
                        <small>{{ s.year }}</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dir-grid {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dir-card {
  --accent: #0ea5e9;
  position: relative;
  overflow: hidden;
  padding: 0;
}
.dir-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--accent);
}

.dir-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 22px 24px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, transparent), transparent);
  border-bottom: 1px solid var(--color-border-soft);
}
.dir-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 26px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
}
.dir-head h2 { margin: 0 0 4px; font-size: 20px; font-weight: 700; }
.dir-head p { margin: 0; color: var(--color-text-muted); font-size: 13px; line-height: 1.5; }
.dir-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; font-size: 12px; color: var(--color-text-subtle); }
.dir-meta b { font-weight: 800; color: var(--color-text); font-size: 16px; margin-right: 4px; }

.pi-grid {
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
}

.pi-card {
  border: 1px solid var(--color-border-soft);
  border-radius: 14px;
  padding: 16px;
  background: linear-gradient(180deg, #fbfdff, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pi-card-head { display: flex; }

.type-blocks { display: flex; flex-direction: column; gap: 10px; }

.type-block {
  border-top: 1px dashed var(--color-border);
  padding-top: 10px;
}
.type-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
}
.t-dot { width: 8px; height: 8px; border-radius: 50%; }
.t-count {
  font-size: 11px;
  color: var(--color-text-subtle);
  background: var(--color-bg-soft);
  padding: 1px 7px;
  border-radius: 999px;
  font-weight: 700;
  margin-left: 4px;
}

.type-list { display: flex; flex-wrap: wrap; gap: 6px; }
.s-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12.5px;
  color: var(--color-text);
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.s-pill:hover { border-color: color-mix(in srgb, var(--accent) 60%, transparent); transform: translateY(-1px); }
.s-pill small { color: var(--color-text-subtle); font-size: 10.5px; }

.empty {
  background: var(--color-bg-soft);
  color: var(--color-text-subtle);
  text-align: center;
  font-size: 12.5px;
  padding: 8px;
  border-radius: 10px;
}
</style>
