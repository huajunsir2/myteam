<template>
  <div class="page-research">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-icon">🔭</div>
      <div>
        <h2 class="page-title">研究方向</h2>
        <p class="page-desc">以研究方向为中心，展示三大研究领域的团队构成</p>
      </div>
    </div>

    <!-- Direction Cards -->
    <div class="directions-grid">
      <div
        v-for="direction in directionsWithData"
        :key="direction.id"
        class="direction-card"
        :class="`dir-${direction.id}`"
      >
        <!-- Card Header -->
        <div class="dir-header">
          <div class="dir-icon-wrap">
            <span class="dir-icon">{{ direction.icon }}</span>
          </div>
          <div class="dir-title-area">
            <h3 class="dir-name">{{ direction.name }}</h3>
            <p class="dir-desc">{{ direction.description }}</p>
          </div>
          <div class="dir-stats">
            <div class="dir-stat">
              <span class="dir-stat-num">{{ direction.pis.length }}</span>
              <span class="dir-stat-label">PI</span>
            </div>
            <div class="dir-stat">
              <span class="dir-stat-num">{{ direction.totalStudents }}</span>
              <span class="dir-stat-label">学生</span>
            </div>
          </div>
        </div>

        <!-- PI Sections -->
        <div class="pi-sections">
          <div
            v-for="pi in direction.pis"
            :key="pi.id"
            class="pi-section"
          >
            <!-- PI Header -->
            <div class="pi-section-header">
              <div class="pi-avatar-lg">{{ pi.avatar }}</div>
              <div class="pi-section-info">
                <div class="pi-section-name">{{ pi.name }}</div>
                <div class="pi-section-role">{{ pi.role }}</div>
                <div class="pi-section-pos">{{ pi.position }}</div>
              </div>
              <div class="pi-section-badge" :class="`role-${pi.type}`">
                {{ pi.role }}
              </div>
            </div>

            <!-- Students Grid -->
            <div class="pi-students" v-if="getStudentsByPi(pi.id).length > 0">
              <div class="students-by-degree" v-for="degKey in degreeOrder" :key="degKey">
                <template v-if="getStudentsByDegree(pi.id, degKey).length > 0">
                  <div class="degree-section-label">
                    <span class="degree-badge" :class="`badge-${degKey}`">
                      {{ degreeLabels[degKey] }}
                      <span class="badge-count">{{ getStudentsByDegree(pi.id, degKey).length }}</span>
                    </span>
                  </div>
                  <div class="student-cards-row">
                    <div
                      v-for="student in getStudentsByDegree(pi.id, degKey)"
                      :key="student.id"
                      class="student-card"
                      :class="`sc-${degKey}`"
                    >
                      <div class="sc-avatar">{{ student.avatar }}</div>
                      <div class="sc-info">
                        <div class="sc-name">{{ student.name }}</div>
                        <div class="sc-grade">{{ student.grade }}级</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="no-students" v-else>暂无学生数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { pis, students, researchDirections, degreeLabels, degreeOrder } from '../data/members.js'

const directionsWithData = computed(() => {
  return researchDirections.map(dir => {
    const dirPIs = pis.filter(p => dir.piIds.includes(p.id))
    const totalStudents = dirPIs.reduce((sum, pi) => sum + students.filter(s => s.piId === pi.id).length, 0)
    return { ...dir, pis: dirPIs, totalStudents }
  })
})

function getStudentsByPi(piId) {
  return students.filter(s => s.piId === piId)
}

function getStudentsByDegree(piId, degree) {
  return students.filter(s => s.piId === piId && s.degree === degree).sort((a, b) => a.grade - b.grade)
}
</script>

<style scoped>
.page-research {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(22,119,255,0.08);
}

.page-header-icon { font-size: 36px; line-height: 1; }

.page-title {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 4px;
}

/* Directions Grid */
.directions-grid {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Direction Card */
.direction-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid transparent;
  transition: box-shadow 0.2s;
}

.direction-card:hover { box-shadow: var(--shadow-lg); }

.dir-general_ai { border-color: rgba(22,119,255,0.15); }
.dir-ai4s { border-color: rgba(19,194,194,0.15); }
.dir-ai_ocean { border-color: rgba(24,144,255,0.15); }

/* Card Header */
.dir-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
}

.dir-general_ai .dir-header { background: linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%); }
.dir-ai4s .dir-header { background: linear-gradient(135deg, #e6fffb 0%, #f0fff4 100%); }
.dir-ai_ocean .dir-header { background: linear-gradient(135deg, #e6f7ff 0%, #e6f4ff 100%); }

.dir-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dir-general_ai .dir-icon-wrap { background: linear-gradient(135deg, #1677ff 0%, #4096ff 100%); box-shadow: 0 4px 12px rgba(22,119,255,0.3); }
.dir-ai4s .dir-icon-wrap { background: linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%); box-shadow: 0 4px 12px rgba(19,194,194,0.3); }
.dir-ai_ocean .dir-icon-wrap { background: linear-gradient(135deg, #0050b3 0%, #1677ff 100%); box-shadow: 0 4px 12px rgba(0,80,179,0.3); }

.dir-icon { font-size: 28px; }

.dir-title-area { flex: 1; }

.dir-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.dir-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.dir-stats {
  display: flex;
  gap: 20px;
}

.dir-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255,255,255,0.7);
  border-radius: var(--radius);
  min-width: 60px;
}

.dir-stat-num {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dir-stat-label { font-size: 12px; color: var(--text-muted); }

/* PI Sections */
.pi-sections {
  padding: 20px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pi-section {
  background: #fafbff;
  border-radius: var(--radius);
  border: 1px solid #e8edf5;
  overflow: hidden;
}

.pi-section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #f0f4fb;
}

.pi-avatar-lg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(22,119,255,0.25);
}

.pi-section-info { flex: 1; }
.pi-section-name { font-size: 17px; font-weight: 700; color: var(--text-primary); }
.pi-section-role { font-size: 12px; color: #1677ff; font-weight: 600; margin: 2px 0; }
.pi-section-pos { font-size: 12px; color: var(--text-muted); }

.pi-section-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.role-academic_pi { background: #e6f4ff; color: #0958d9; border: 1px solid #91caff; }
.role-engineering_pi { background: #f6ffed; color: #389e0d; border: 1px solid #95de64; }
.role-industry_pi { background: #fff7e6; color: #d46b08; border: 1px solid #ffd591; }

/* Students */
.pi-students {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.degree-section-label { margin-bottom: 6px; }

.degree-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  background: rgba(255,255,255,0.6);
}

.badge-phd { background: #e6f4ff; color: #0958d9; }
.badge-master { background: #f6ffed; color: #389e0d; }
.badge-undergrad { background: #fff7e6; color: #d46b08; }
.badge-engineer { background: #f9f0ff; color: #531dab; }

.student-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.student-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  transition: transform 0.15s, box-shadow 0.15s;
  cursor: default;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.sc-phd { background: #f0f7ff; border-color: #bfdbfe; }
.sc-master { background: #f0fdf4; border-color: #bbf7d0; }
.sc-undergrad { background: #fff7ed; border-color: #fed7aa; }
.sc-engineer { background: #fdf4ff; border-color: #e9d5ff; }

.sc-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.sc-phd .sc-avatar { background: linear-gradient(135deg, #1677ff, #4096ff); }
.sc-master .sc-avatar { background: linear-gradient(135deg, #52c41a, #73d13d); }
.sc-undergrad .sc-avatar { background: linear-gradient(135deg, #fa8c16, #ffa940); }
.sc-engineer .sc-avatar { background: linear-gradient(135deg, #722ed1, #9254de); }

.sc-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.sc-grade { font-size: 11px; color: var(--text-muted); }

.no-students {
  padding: 16px 20px;
  font-size: 13px;
  color: var(--text-muted);
  text-align: center;
  font-style: italic;
}
</style>
