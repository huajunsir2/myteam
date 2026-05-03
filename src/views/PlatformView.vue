<script setup>
import { computed } from 'vue'
import {
  platforms,
  getFacultyById,
  organizeByPlatform,
  memberTypeLabels,
  memberTypeOrder,
  company,
  leader,
} from '../data/members.js'
import PersonCard from '../components/PersonCard.vue'

const platformData = computed(() =>
  platforms.map((p) => {
    const data = organizeByPlatform(p.short)
    const facultyDetailed = p.facultyIds.map((fid) => getFacultyById(fid)).filter(Boolean)
    // 计算机学院特殊：把陈华钧老师放进来
    if (p.id === 'cs') {
      facultyDetailed.unshift({
        ...leader,
        roleType: 'academic',
        roleLabel: '学术带头人',
      })
    }
    let total = 0
    Object.values(data.members).forEach((groupByYear) => {
      Object.values(groupByYear).forEach((arr) => (total += arr.length))
    })
    return {
      ...p,
      faculty: facultyDetailed,
      members: data.members,
      total,
    }
  }),
)

function sortedYears(yearsObj) {
  return Object.keys(yearsObj).sort((a, b) => Number(a) - Number(b))
}
</script>

<template>
  <main class="page">
    <div class="container">
      <div class="page-header">
        <span class="page-eyebrow">视图 03 · PLATFORMS</span>
        <h1 class="page-title">平台依托</h1>
        <p class="page-desc">
          按所在二级单位划分。每个单位先列老师，再按
          <b>博士研究生 → 硕士研究生 → 本科生 → 工程师</b> 的顺序排列学生与工程师，
          同类成员再按入学年级分组。最后专门展示孵化平台 <b>智科慧创</b>。
        </p>
      </div>

      <div class="platform-grid">
        <section
          v-for="p in platformData"
          :key="p.id"
          class="platform-card card"
          :style="{ '--accent': p.color }"
        >
          <header class="p-head">
            <div class="p-icon" :style="{ background: p.color }">
              <span>{{ p.icon }}</span>
            </div>
            <div>
              <h2>{{ p.name }}</h2>
              <p class="p-meta">
                <span><b>{{ p.faculty.length }}</b> 位老师</span>
                <span class="dot">·</span>
                <span><b>{{ p.total }}</b> 位成员</span>
              </p>
            </div>
          </header>

          <!-- 老师 -->
          <section class="p-section">
            <div class="p-section-title">
              <span class="bar" :style="{ background: p.color }"></span>
              师资团队
            </div>
            <div v-if="p.faculty.length" class="faculty-list">
              <PersonCard
                v-for="f in p.faculty"
                :key="f.id"
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
            <div v-else class="empty-soft">该平台暂无在册老师</div>
          </section>

          <!-- 学生与工程师 -->
          <section
            v-for="t in memberTypeOrder.filter((x) => p.members[x])"
            :key="t"
            class="p-section"
          >
            <div class="p-section-title">
              <span class="bar" :style="{ background: p.color }"></span>
              {{ memberTypeLabels[t] }}
              <span class="t-count">
                {{ Object.values(p.members[t]).reduce((a, b) => a + b.length, 0) }} 人
              </span>
            </div>

            <div class="year-blocks">
              <div
                v-for="y in sortedYears(p.members[t])"
                :key="y"
                class="year-block"
              >
                <div class="year-tag">{{ y }} 级</div>
                <div class="year-list">
                  <span
                    v-for="s in p.members[t][y]"
                    :key="s.id"
                    class="m-pill"
                  >
                    {{ s.name }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div v-if="!p.faculty.length && !p.total" class="empty-soft">暂无数据</div>
        </section>

        <!-- 智科慧创 -->
        <section class="platform-card card company-card" :style="{ '--accent': company.color }">
          <header class="p-head">
            <div class="p-icon" :style="{ background: company.color }">
              <span>{{ company.icon }}</span>
            </div>
            <div>
              <h2>{{ company.name }}</h2>
              <p class="p-meta company-meta">
                <span class="company-tag">孵化平台 · COMPANY</span>
                <span>{{ company.tagline }}</span>
              </p>
            </div>
          </header>

          <section class="p-section">
            <div class="p-section-title">
              <span class="bar" :style="{ background: company.color }"></span>
              核心团队
            </div>
            <div class="company-team">
              <div
                v-for="m in company.members"
                :key="m.name + m.role"
                class="company-card-item"
              >
                <div class="company-role" :style="{ background: company.color }">{{ m.role }}</div>
                <PersonCard :name="m.name" :sub="m.role" />
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.platform-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.platform-card {
  --accent: #0ea5e9;
  position: relative;
  padding: 0;
  overflow: hidden;
}
.platform-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0;
  height: 4px;
  background: var(--accent);
}

.p-head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
  padding: 22px 22px 14px;
}
.p-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
}
.p-head h2 { margin: 0; font-size: 18px; font-weight: 700; }
.p-meta {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--color-text-subtle);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.p-meta b { color: var(--color-text); font-weight: 800; margin-right: 2px; }
.p-meta .dot { color: var(--color-text-subtle); }

.p-section { padding: 8px 22px 18px; }
.p-section-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
}
.p-section-title .bar {
  display: inline-block;
  width: 4px;
  height: 14px;
  border-radius: 4px;
}
.t-count {
  font-size: 11px;
  color: var(--color-text-subtle);
  background: var(--color-bg-soft);
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 700;
  margin-left: 4px;
}

.faculty-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.year-blocks { display: flex; flex-direction: column; gap: 8px; }
.year-block {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 10px;
  align-items: center;
  background: var(--color-bg-soft);
  border-radius: 10px;
  padding: 8px 10px;
}
.year-tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 80%, #475569), var(--accent));
  border-radius: 8px;
  padding: 4px 6px;
}
.year-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.m-pill {
  display: inline-flex;
  align-items: center;
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-text);
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.m-pill:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--accent) 60%, transparent);
}

.empty-soft {
  margin: 0 22px 16px;
  background: var(--color-bg-soft);
  color: var(--color-text-subtle);
  text-align: center;
  font-size: 12.5px;
  padding: 10px;
  border-radius: 10px;
}

.company-card {
  grid-column: 1 / -1;
  background:
    radial-gradient(circle at 8% -10%, rgba(239, 68, 68, 0.08), transparent 60%),
    linear-gradient(180deg, #ffffff, #fff8f8);
}
.company-meta { color: var(--color-text-muted); }
.company-tag {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.06em;
}

.company-team {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.company-card-item {
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.company-card-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.company-role {
  align-self: flex-start;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.08em;
}

@media (max-width: 980px) {
  .platform-grid { grid-template-columns: 1fr; }
}
</style>
