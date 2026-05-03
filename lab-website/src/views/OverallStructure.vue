<template>
  <div class="page-overall">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-icon">🏛️</div>
      <div>
        <h2 class="page-title">总体架构</h2>
        <p class="page-desc">以人为核心的层次树形结构，展示实验室成员归属关系</p>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-num">{{ pis.length }}</span>
        <span class="stat-label">学术/工程/产业PI</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ students.filter(s=>s.degree==='phd').length }}</span>
        <span class="stat-label">博士研究生</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ students.filter(s=>s.degree==='master').length }}</span>
        <span class="stat-label">硕士研究生</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ students.filter(s=>s.degree==='undergrad').length }}</span>
        <span class="stat-label">本科生</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ students.length }}</span>
        <span class="stat-label">成员总数</span>
      </div>
    </div>

    <!-- Tree Root: Director -->
    <div class="tree-container">
      <!-- Director Node -->
      <div class="level level-0">
        <div class="director-card">
          <div class="director-avatar">
            <span>{{ director.avatar }}</span>
          </div>
          <div class="director-info">
            <div class="director-name">{{ director.name }}</div>
            <div class="director-title">{{ director.title }}</div>
            <div class="director-pos">{{ director.position }}</div>
            <div class="director-badge">实验室负责人</div>
          </div>
          <div class="secretary-badge">
            <span class="sec-icon">📋</span>
            <span>秘书：{{ secretary.name }}</span>
          </div>
        </div>
      </div>

      <!-- Connector -->
      <div class="v-connector"></div>

      <!-- PI Type Row -->
      <div class="level level-1">
        <div class="pi-type-groups">
          <!-- Academic PIs -->
          <div class="pi-type-group">
            <div class="pi-type-header academic">
              <span class="type-icon">🎓</span>
              <span>学术PI</span>
              <span class="type-count">{{ academicPIs.length }}人</span>
            </div>
            <div class="h-connector-bar"></div>
            <div class="pi-nodes">
              <div v-for="pi in academicPIs" :key="pi.id" class="pi-subtree">
                <div class="pi-card" :class="`pi-type-${pi.type}`">
                  <div class="pi-avatar academic-avatar">{{ pi.avatar }}</div>
                  <div class="pi-info">
                    <div class="pi-name">{{ pi.name }}</div>
                    <div class="pi-title-badge">{{ pi.title }}</div>
                    <div class="pi-unit">{{ pi.unit }}</div>
                  </div>
                  <div class="pi-student-count">
                    <span>{{ getStudentsByPi(pi.id).length }}</span>人
                  </div>
                </div>
                <!-- Students under PI -->
                <div class="v-connector-sm"></div>
                <div class="student-cluster">
                  <div
                    v-for="student in getStudentsByPi(pi.id)"
                    :key="student.id"
                    class="student-chip"
                    :class="`degree-${student.degree}`"
                  >
                    <span class="student-avatar">{{ student.avatar }}</span>
                    <span class="student-name">{{ student.name }}</span>
                    <span class="student-grade">{{ student.grade }}</span>
                    <span class="degree-dot" :title="degreeLabels[student.degree]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Engineering PIs -->
          <div class="pi-type-group">
            <div class="pi-type-header engineering">
              <span class="type-icon">⚙️</span>
              <span>工程PI</span>
              <span class="type-count">{{ engineeringPIs.length }}人</span>
            </div>
            <div class="h-connector-bar"></div>
            <div class="pi-nodes">
              <div v-for="pi in engineeringPIs" :key="pi.id" class="pi-subtree">
                <div class="pi-card engineering-card">
                  <div class="pi-avatar engineering-avatar">{{ pi.avatar }}</div>
                  <div class="pi-info">
                    <div class="pi-name">{{ pi.name }}</div>
                    <div class="pi-title-badge">{{ pi.title }}</div>
                    <div class="pi-unit">{{ pi.unit }}</div>
                  </div>
                  <div class="pi-student-count">
                    <span>{{ getStudentsByPi(pi.id).length }}</span>人
                  </div>
                </div>
                <div class="v-connector-sm"></div>
                <div class="student-cluster">
                  <div
                    v-for="student in getStudentsByPi(pi.id)"
                    :key="student.id"
                    class="student-chip"
                    :class="`degree-${student.degree}`"
                  >
                    <span class="student-avatar">{{ student.avatar }}</span>
                    <span class="student-name">{{ student.name }}</span>
                    <span class="student-grade">{{ student.grade }}</span>
                    <span class="degree-dot" :title="degreeLabels[student.degree]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Industry PIs -->
          <div class="pi-type-group">
            <div class="pi-type-header industry">
              <span class="type-icon">🏭</span>
              <span>产业PI</span>
              <span class="type-count">{{ industryPIs.length }}人</span>
            </div>
            <div class="h-connector-bar"></div>
            <div class="pi-nodes">
              <div v-for="pi in industryPIs" :key="pi.id" class="pi-subtree">
                <div class="pi-card industry-card">
                  <div class="pi-avatar industry-avatar">{{ pi.avatar }}</div>
                  <div class="pi-info">
                    <div class="pi-name">{{ pi.name }}</div>
                    <div class="pi-title-badge">{{ pi.title }}</div>
                    <div class="pi-unit">{{ pi.unit }}</div>
                  </div>
                  <div class="pi-student-count">
                    <span>{{ getStudentsByPi(pi.id).length }}</span>人
                  </div>
                </div>
                <div class="v-connector-sm"></div>
                <div class="student-cluster">
                  <div
                    v-for="student in getStudentsByPi(pi.id)"
                    :key="student.id"
                    class="student-chip"
                    :class="`degree-${student.degree}`"
                  >
                    <span class="student-avatar">{{ student.avatar }}</span>
                    <span class="student-name">{{ student.name }}</span>
                    <span class="student-grade">{{ student.grade }}</span>
                    <span class="degree-dot" :title="degreeLabels[student.degree]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend-bar">
      <span class="legend-title">学位图例：</span>
      <span class="legend-item degree-phd"><span class="degree-dot"></span>博士研究生</span>
      <span class="legend-item degree-master"><span class="degree-dot"></span>硕士研究生</span>
      <span class="legend-item degree-undergrad"><span class="degree-dot"></span>本科生</span>
      <span class="legend-item degree-engineer"><span class="degree-dot"></span>工程师</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { director, secretary, pis, students, degreeLabels } from '../data/members.js'

const academicPIs = computed(() => pis.filter(p => p.type === 'academic_pi'))
const engineeringPIs = computed(() => pis.filter(p => p.type === 'engineering_pi'))
const industryPIs = computed(() => pis.filter(p => p.type === 'industry_pi'))

function getStudentsByPi(piId) {
  return students.filter(s => s.piId === piId)
}
</script>

<style scoped>
.page-overall {
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

.page-header-icon {
  font-size: 36px;
  line-height: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
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

/* Stats */
.stats-bar {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-item {
  flex: 1;
  min-width: 120px;
  background: white;
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(22,119,255,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.stat-num {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
  text-align: center;
}

/* Tree Container */
.tree-container {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px 24px 40px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(22,119,255,0.06);
  overflow-x: auto;
}

/* Level */
.level {
  display: flex;
  justify-content: center;
}

/* Director Card */
.director-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #e6f4ff 0%, #e6fffb 100%);
  border: 2px solid #1677ff;
  border-radius: var(--radius-lg);
  padding: 20px 28px;
  position: relative;
  min-width: 500px;
  box-shadow: 0 4px 20px rgba(22,119,255,0.15);
}

.director-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(22,119,255,0.3);
}

.director-info {
  flex: 1;
}

.director-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.director-title {
  font-size: 14px;
  color: #1677ff;
  font-weight: 600;
  margin: 2px 0;
}

.director-pos {
  font-size: 12px;
  color: var(--text-secondary);
}

.director-badge {
  display: inline-block;
  margin-top: 6px;
  background: linear-gradient(135deg, #1677ff 0%, #13c2c2 100%);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}

.secretary-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(22,119,255,0.08);
  border: 1px solid rgba(22,119,255,0.2);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  color: #1677ff;
  font-weight: 500;
  white-space: nowrap;
}

/* Connectors */
.v-connector {
  width: 2px;
  height: 32px;
  background: linear-gradient(to bottom, #1677ff, #13c2c2);
  margin: 0 auto;
  border-radius: 1px;
  opacity: 0.5;
}

.v-connector-sm {
  width: 2px;
  height: 20px;
  background: #c0cce4;
  margin: 0 auto;
  border-radius: 1px;
}

/* PI Type Groups */
.pi-type-groups {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.pi-type-group {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pi-type-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.pi-type-header.academic {
  background: linear-gradient(135deg, #e6f4ff 0%, #bae0ff 100%);
  color: #0958d9;
  border: 1.5px solid #91caff;
}

.pi-type-header.engineering {
  background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%);
  color: #389e0d;
  border: 1.5px solid #95de64;
}

.pi-type-header.industry {
  background: linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%);
  color: #d46b08;
  border: 1.5px solid #ffd591;
}

.type-icon { font-size: 16px; }

.type-count {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.7;
}

.h-connector-bar {
  width: 80%;
  height: 2px;
  background: #e2e8f0;
  border-radius: 1px;
  margin-bottom: 8px;
}

/* PI Nodes */
.pi-nodes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
}

.pi-subtree {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.pi-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: var(--radius);
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  width: 100%;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.pi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.pi-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.academic-avatar { background: linear-gradient(135deg, #1677ff, #4096ff); }
.engineering-avatar { background: linear-gradient(135deg, #52c41a, #73d13d); }
.industry-avatar { background: linear-gradient(135deg, #fa8c16, #ffa940); }

.pi-info { flex: 1; min-width: 0; }
.pi-name { font-size: 15px; font-weight: 700; color: var(--text-primary); }

.pi-title-badge {
  display: inline-block;
  font-size: 10px;
  padding: 1px 7px;
  border-radius: 10px;
  margin: 2px 0;
  font-weight: 600;
}

.pi-card .pi-title-badge {
  background: #f0f5ff;
  color: #1677ff;
}

.engineering-card .pi-title-badge {
  background: #f6ffed;
  color: #389e0d;
}

.industry-card .pi-title-badge {
  background: #fff7e6;
  color: #d46b08;
}

.pi-unit { font-size: 11px; color: var(--text-muted); }

.pi-student-count {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  padding: 4px 10px;
  background: #f8fafc;
  border-radius: 20px;
}

.pi-student-count span {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
  margin-right: 2px;
}

/* Student Cluster */
.student-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  padding: 8px;
  background: #fafbff;
  border-radius: var(--radius);
  border: 1px dashed #e2e8f0;
  width: 100%;
  min-height: 40px;
}

.student-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px 4px 6px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: default;
  transition: transform 0.15s;
  border: 1px solid transparent;
}

.student-chip:hover { transform: scale(1.05); }

.student-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.student-name { color: var(--text-primary); }
.student-grade { font-size: 10px; color: var(--text-muted); }

.degree-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Degree Colors */
.degree-phd {
  background: #eff6ff;
  border-color: #bfdbfe;
}
.degree-phd .student-avatar { background: #1677ff; }
.degree-phd .degree-dot { background: #1677ff; }

.degree-master {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.degree-master .student-avatar { background: #52c41a; }
.degree-master .degree-dot { background: #52c41a; }

.degree-undergrad {
  background: #fff7ed;
  border-color: #fed7aa;
}
.degree-undergrad .student-avatar { background: #fa8c16; }
.degree-undergrad .degree-dot { background: #fa8c16; }

.degree-engineer {
  background: #fdf4ff;
  border-color: #e9d5ff;
}
.degree-engineer .student-avatar { background: #722ed1; }
.degree-engineer .degree-dot { background: #722ed1; }

/* Legend */
.legend-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background: white;
  border-radius: var(--radius);
  padding: 14px 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.legend-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid transparent;
}

.legend-item.degree-phd {
  background: #eff6ff;
  border-color: #bfdbfe;
}
.legend-item.degree-phd .degree-dot { background: #1677ff; }

.legend-item.degree-master {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.legend-item.degree-master .degree-dot { background: #52c41a; }

.legend-item.degree-undergrad {
  background: #fff7ed;
  border-color: #fed7aa;
}
.legend-item.degree-undergrad .degree-dot { background: #fa8c16; }

.legend-item.degree-engineer {
  background: #fdf4ff;
  border-color: #e9d5ff;
}
.legend-item.degree-engineer .degree-dot { background: #722ed1; }
</style>
