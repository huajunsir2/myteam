<template>
  <div class="page-platform">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-icon">🏢</div>
      <div>
        <h2 class="page-title">平台依托</h2>
        <p class="page-desc">按所在二级单位划分，展示各依托平台的师生构成</p>
      </div>
    </div>

    <!-- Units Grid -->
    <div class="units-grid">
      <div
        v-for="(unit, idx) in unitsWithData"
        :key="unit.id"
        class="unit-card"
        :style="{ '--unit-color': unitColors[idx % unitColors.length] }"
      >
        <!-- Unit Header -->
        <div class="unit-header">
          <div class="unit-icon">{{ unitIcons[unit.id] || '🏫' }}</div>
          <div class="unit-title-area">
            <h3 class="unit-name">{{ unit.name }}</h3>
            <div class="unit-meta">
              <span class="meta-badge">{{ unit.teachers.length }}位教师</span>
              <span class="meta-badge">{{ unit.totalStudents }}位学生</span>
            </div>
          </div>
        </div>

        <!-- Teachers -->
        <div class="unit-section" v-if="unit.teachers.length > 0">
          <div class="section-label">
            <span class="section-icon">👨‍🏫</span>
            教师
          </div>
          <div class="teacher-list">
            <div v-for="teacher in unit.teachers" :key="teacher.id || teacher.name" class="teacher-item">
              <div class="teacher-avatar" :class="`color-${teacher.type}`">{{ teacher.avatar }}</div>
              <div class="teacher-info">
                <div class="teacher-name">{{ teacher.name }}</div>
                <div class="teacher-pos">{{ teacher.position }}</div>
              </div>
              <div class="teacher-role-badge" :class="`role-${teacher.type}`">{{ teacher.role }}</div>
            </div>
          </div>
        </div>

        <!-- Students by Degree -->
        <div
          v-for="degKey in degreeOrder"
          :key="degKey"
          class="unit-section"
          v-if="getStudentsByUnitDegree(unit.id, degKey).length > 0"
        >
          <div class="section-label">
            <span class="section-icon">{{ degreeIcons[degKey] }}</span>
            {{ degreeLabels[degKey] }}
            <span class="section-count">{{ getStudentsByUnitDegree(unit.id, degKey).length }}人</span>
          </div>
          <!-- Group by Grade -->
          <div
            v-for="gradeGroup in getGradeGroups(unit.id, degKey)"
            :key="gradeGroup.grade"
            class="grade-group"
          >
            <div class="grade-label">{{ gradeGroup.grade }}级</div>
            <div class="grade-students">
              <div
                v-for="student in gradeGroup.students"
                :key="student.id"
                class="student-pill"
                :class="`pill-${degKey}`"
              >
                <span class="pill-avatar">{{ student.avatar }}</span>
                <span class="pill-name">{{ student.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Zhike Huichuang -->
    <div class="company-card">
      <div class="company-header">
        <div class="company-logo">
          <span>智</span>
        </div>
        <div class="company-title-area">
          <h3 class="company-name">智科慧创</h3>
          <p class="company-desc">知识引擎实验室孵化企业 · 人工智能产业化平台</p>
        </div>
        <div class="company-badge">企业平台</div>
      </div>

      <div class="company-body">
        <!-- Leadership -->
        <div class="company-section">
          <div class="company-section-title">核心管理</div>
          <div class="leadership-grid">
            <div class="leader-card">
              <div class="leader-rank ceo-rank">CEO</div>
              <div class="leader-avatar">{{ zhikehuichuang.ceo.name.charAt(0) }}</div>
              <div class="leader-name">{{ zhikehuichuang.ceo.name }}</div>
            </div>
            <div class="leader-connector"></div>
            <div class="leader-card">
              <div class="leader-rank cto-rank">CTO</div>
              <div class="leader-avatar">{{ zhikehuichuang.cto.name.charAt(0) }}</div>
              <div class="leader-name">{{ zhikehuichuang.cto.name }}</div>
            </div>
            <div class="leader-connector"></div>
            <div class="leader-card">
              <div class="leader-rank cs-rank">首席科学家</div>
              <div class="leader-avatar">{{ zhikehuichuang.chiefScientist.name.charAt(0) }}</div>
              <div class="leader-name">{{ zhikehuichuang.chiefScientist.name }}</div>
            </div>
          </div>
        </div>

        <!-- Employees -->
        <div class="company-section">
          <div class="company-section-title">员工</div>
          <div class="employee-list">
            <div
              v-for="emp in zhikehuichuang.employees"
              :key="emp.id"
              class="employee-card"
            >
              <div class="emp-avatar">{{ emp.avatar }}</div>
              <div class="emp-info">
                <div class="emp-name">{{ emp.name }}</div>
                <div class="emp-role">{{ emp.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { director, pis, students, units, zhikehuichuang, degreeLabels, degreeOrder } from '../data/members.js'

const unitColors = ['#1677ff', '#13c2c2', '#52c41a', '#fa8c16', '#0050b3', '#722ed1']

const unitIcons = {
  cs: '💻',
  software: '⌨️',
  ai: '🤖',
  hiic: '🏙️',
  ocean: '🌊',
  engineer: '⚙️',
}

const degreeIcons = {
  phd: '🎓',
  master: '📚',
  undergrad: '📖',
  engineer: '🔧',
}

// Map unit name to unit id
const unitNameToId = {
  '计算机学院': 'cs',
  '软件学院': 'software',
  '人工智能学院': 'ai',
  '杭州国际科创中心': 'hiic',
  '舟山海洋研究中心': 'ocean',
  '工程师学院': 'engineer',
}

const unitsWithData = computed(() => {
  return units.map(unit => {
    // Teachers for this unit: director (cs) + relevant PIs
    let teachers = []
    if (unit.id === 'cs') {
      teachers = [{ ...director, type: 'director', role: '实验室负责人' }]
    }
    const unitPIs = pis.filter(p => p.unit === unit.name)
    teachers = [...teachers, ...unitPIs]

    const unitStudents = students.filter(s => s.unit === unit.name)
    const totalStudents = unitStudents.length

    return { ...unit, teachers, totalStudents }
  })
})

function getStudentsByUnitDegree(unitId, degree) {
  const unit = units.find(u => u.id === unitId)
  if (!unit) return []
  return students.filter(s => s.unit === unit.name && s.degree === degree)
}

function getGradeGroups(unitId, degree) {
  const unitStudents = getStudentsByUnitDegree(unitId, degree)
  const gradeMap = {}
  unitStudents.forEach(s => {
    if (!gradeMap[s.grade]) gradeMap[s.grade] = []
    gradeMap[s.grade].push(s)
  })
  return Object.entries(gradeMap)
    .map(([grade, studs]) => ({ grade: Number(grade), students: studs }))
    .sort((a, b) => a.grade - b.grade)
}
</script>

<style scoped>
.page-platform {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

/* Units Grid */
.units-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
}

/* Unit Card */
.unit-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid rgba(0,0,0,0.05);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.unit-card:hover { box-shadow: var(--shadow-lg); }

/* Unit Header */
.unit-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: linear-gradient(135deg, rgba(var(--unit-color-rgb, 22,119,255), 0.06) 0%, rgba(19,194,194,0.04) 100%);
  border-bottom: 2px solid var(--unit-color, #1677ff);
  border-bottom-color: var(--unit-color);
}

.unit-icon {
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.unit-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
}

.unit-meta {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.meta-badge {
  font-size: 11px;
  padding: 2px 8px;
  background: rgba(22,119,255,0.08);
  color: #1677ff;
  border-radius: 20px;
  font-weight: 500;
}

/* Unit Sections */
.unit-section {
  padding: 14px 20px;
  border-bottom: 1px solid #f0f4fb;
}

.unit-section:last-child { border-bottom: none; }

.section-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.section-icon { font-size: 14px; }

.section-count {
  font-size: 11px;
  background: #f0f4fb;
  color: var(--text-muted);
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 500;
  margin-left: 2px;
}

/* Teacher List */
.teacher-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.teacher-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #fafbff;
  border-radius: var(--radius-sm);
  border: 1px solid #eef2f8;
}

.teacher-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.color-director { background: linear-gradient(135deg, #1677ff 0%, #4096ff 100%); }
.color-academic_pi { background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%); }
.color-engineering_pi { background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%); }
.color-industry_pi { background: linear-gradient(135deg, #fa8c16 0%, #ffa940 100%); }

.teacher-info { flex: 1; min-width: 0; }
.teacher-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.teacher-pos { font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.teacher-role-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 600;
  white-space: nowrap;
}

.role-director { background: #e6f4ff; color: #0958d9; border: 1px solid #91caff; }
.role-academic_pi { background: #e6f4ff; color: #0958d9; }
.role-engineering_pi { background: #f6ffed; color: #389e0d; }
.role-industry_pi { background: #fff7e6; color: #d46b08; }

/* Grade Groups */
.grade-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.grade-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  background: #f0f4fb;
  padding: 3px 8px;
  border-radius: 10px;
  white-space: nowrap;
  margin-top: 2px;
  flex-shrink: 0;
}

.grade-students {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.student-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px 4px 5px;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid transparent;
}

.pill-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: white;
}

.pill-phd { background: #eff6ff; border-color: #bfdbfe; }
.pill-phd .pill-avatar { background: #1677ff; }

.pill-master { background: #f0fdf4; border-color: #bbf7d0; }
.pill-master .pill-avatar { background: #52c41a; }

.pill-undergrad { background: #fff7ed; border-color: #fed7aa; }
.pill-undergrad .pill-avatar { background: #fa8c16; }

.pill-engineer { background: #fdf4ff; border-color: #e9d5ff; }
.pill-engineer .pill-avatar { background: #722ed1; }

.pill-name { font-size: 12px; font-weight: 500; color: var(--text-primary); }

/* Company Card - Zhike Huichuang */
.company-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid rgba(114,46,209,0.15);
}

.company-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  background: linear-gradient(135deg, #f9f0ff 0%, #e6f4ff 100%);
  border-bottom: 2px solid #722ed1;
}

.company-logo {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #722ed1 0%, #1677ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 12px rgba(114,46,209,0.3);
  flex-shrink: 0;
}

.company-title-area { flex: 1; }
.company-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}
.company-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.company-badge {
  background: linear-gradient(135deg, #722ed1 0%, #1677ff 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(114,46,209,0.25);
}

.company-body {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.company-section-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.company-section-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 14px;
  background: linear-gradient(to bottom, #722ed1, #1677ff);
  border-radius: 2px;
}

/* Leadership Grid */
.leadership-grid {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.leader-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f9f0ff 0%, #f0f5ff 100%);
  border-radius: var(--radius);
  border: 1px solid rgba(114,46,209,0.15);
  min-width: 120px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.leader-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(114,46,209,0.12);
}

.leader-rank {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.ceo-rank { background: linear-gradient(135deg, #722ed1, #1677ff); color: white; }
.cto-rank { background: linear-gradient(135deg, #1677ff, #13c2c2); color: white; }
.cs-rank { background: linear-gradient(135deg, #13c2c2, #52c41a); color: white; font-size: 10px; }

.leader-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #722ed1 0%, #1677ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
  box-shadow: 0 3px 10px rgba(114,46,209,0.25);
}

.leader-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.leader-connector {
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, #722ed1, #1677ff);
  opacity: 0.3;
  border-radius: 1px;
}

/* Employees */
.employee-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.employee-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #fafbff;
  border-radius: var(--radius);
  border: 1px solid #e8edf5;
  transition: transform 0.15s;
}

.employee-card:hover { transform: translateY(-2px); }

.emp-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fa8c16, #ffa940);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.emp-name { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.emp-role { font-size: 12px; color: var(--text-muted); }
</style>
