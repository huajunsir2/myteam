// =============================================================
// 知识引擎实验室 - 成员数据
// -------------------------------------------------------------
// 所有页面（总体架构 / 研究方向 / 平台依托）均从本文件读取数据
// 学生名单为示例数据，可直接在此文件中维护后重新部署即可生效
// =============================================================

// ---------- 老师 ----------
export const leader = {
  id: 'chen',
  name: '陈华钧',
  title: '求是特聘教授',
  org: '浙江大学计算机科学与技术学院',
  role: '学术带头人 / 实验室负责人',
  bio: '浙江大学求是特聘教授，长期从事知识图谱、知识引擎与可信人工智能研究。',
};

export const secretary = {
  id: 'yujing',
  name: '余静',
  title: '实验室秘书',
  org: '知识引擎实验室',
  role: '实验室秘书',
};

// roleType: academic | industry | engineering
export const facultyList = [
  {
    id: 'zhangny',
    name: '张宁豫',
    title: '副教授',
    org: '浙江大学软件学院',
    roleType: 'academic',
    roleLabel: '学术 PI',
    direction: 'general_ai',
    platform: '软件学院',
  },
  {
    id: 'zhangwen',
    name: '张文',
    title: '副教授',
    org: '浙江大学软件学院',
    roleType: 'academic',
    roleLabel: '学术 PI',
    direction: 'general_ai',
    platform: '软件学院',
  },
  {
    id: 'dengsm',
    name: '邓淑敏',
    title: '百人计划研究员',
    org: '浙江大学人工智能学院',
    roleType: 'academic',
    roleLabel: '学术 PI',
    direction: 'general_ai',
    platform: '人工智能学院',
  },
  {
    id: 'zhangq',
    name: '张强',
    title: '百人计划研究员',
    org: '浙江大学海宁国际校区',
    roleType: 'academic',
    roleLabel: '学术 PI',
    direction: 'ai4s',
    platform: '工程师学院',
  },
  {
    id: 'dingky',
    name: '丁科炎',
    title: '百人计划研究员',
    org: '浙江大学杭州国际科创中心',
    roleType: 'industry',
    roleLabel: '产业 PI',
    direction: 'ai4s',
    platform: '杭州国际科创中心',
  },
  {
    id: 'wangym',
    name: '王一珉',
    title: '科创合伙人',
    org: '浙江大学杭州国际科创中心',
    roleType: 'industry',
    roleLabel: '产业 PI',
    direction: 'ai4s',
    platform: '杭州国际科创中心',
  },
  {
    id: 'zhenggz',
    name: '郑国轴',
    title: '信息所副所长',
    org: '浙江大学舟山海洋研究中心',
    roleType: 'engineering',
    roleLabel: '工程 PI',
    direction: 'ocean',
    platform: '舟山海洋研究中心',
  },
  {
    id: 'lick',
    name: '李传昆',
    title: '研究员',
    org: '浙江大学舟山海洋研究中心',
    roleType: 'engineering',
    roleLabel: '工程 PI',
    direction: 'ocean',
    platform: '舟山海洋研究中心',
  },
];

// ---------- 学生 / 工程师（示例数据，可按实际花名册替换） ----------
// type: phd 博士研究生 | master 硕士研究生 | ug 本科生 | engineer 工程师
// platform: 计算机学院 | 软件学院 | 人工智能学院 | 杭州国际科创中心 | 舟山海洋研究中心 | 工程师学院
export const memberList = [
  // 张宁豫（软件学院）
  { id: 'm-zny-1', name: '李博文', advisorId: 'zhangny', type: 'phd',     year: 2022, platform: '软件学院' },
  { id: 'm-zny-2', name: '王嘉怡', advisorId: 'zhangny', type: 'phd',     year: 2023, platform: '软件学院' },
  { id: 'm-zny-3', name: '陈思远', advisorId: 'zhangny', type: 'master',  year: 2024, platform: '软件学院' },
  { id: 'm-zny-4', name: '赵子昂', advisorId: 'zhangny', type: 'master',  year: 2024, platform: '软件学院' },
  { id: 'm-zny-5', name: '孙明珠', advisorId: 'zhangny', type: 'master',  year: 2025, platform: '软件学院' },
  { id: 'm-zny-6', name: '周予欣', advisorId: 'zhangny', type: 'ug',      year: 2023, platform: '软件学院' },

  // 张文（软件学院）
  { id: 'm-zw-1', name: '吴泽楷',  advisorId: 'zhangwen', type: 'phd',    year: 2021, platform: '软件学院' },
  { id: 'm-zw-2', name: '许梓萱',  advisorId: 'zhangwen', type: 'phd',    year: 2024, platform: '软件学院' },
  { id: 'm-zw-3', name: '高启航',  advisorId: 'zhangwen', type: 'master', year: 2023, platform: '软件学院' },
  { id: 'm-zw-4', name: '冯雨萌',  advisorId: 'zhangwen', type: 'master', year: 2024, platform: '软件学院' },
  { id: 'm-zw-5', name: '彭书宁',  advisorId: 'zhangwen', type: 'master', year: 2025, platform: '软件学院' },

  // 邓淑敏（人工智能学院）
  { id: 'm-dsm-1', name: '黄子韬', advisorId: 'dengsm', type: 'phd',     year: 2023, platform: '人工智能学院' },
  { id: 'm-dsm-2', name: '林书瑶', advisorId: 'dengsm', type: 'phd',     year: 2024, platform: '人工智能学院' },
  { id: 'm-dsm-3', name: '何雨桐', advisorId: 'dengsm', type: 'master',  year: 2024, platform: '人工智能学院' },
  { id: 'm-dsm-4', name: '罗思琪', advisorId: 'dengsm', type: 'master',  year: 2025, platform: '人工智能学院' },
  { id: 'm-dsm-5', name: '宋知夏', advisorId: 'dengsm', type: 'ug',      year: 2024, platform: '人工智能学院' },

  // 张强（海宁国际校区 / 工程师学院）
  { id: 'm-zq-1', name: '徐文博', advisorId: 'zhangq', type: 'phd',     year: 2022, platform: '工程师学院' },
  { id: 'm-zq-2', name: '汪诗涵', advisorId: 'zhangq', type: 'phd',     year: 2024, platform: '工程师学院' },
  { id: 'm-zq-3', name: '韩沐宸', advisorId: 'zhangq', type: 'master',  year: 2023, platform: '工程师学院' },
  { id: 'm-zq-4', name: '梁雨晨', advisorId: 'zhangq', type: 'master',  year: 2025, platform: '工程师学院' },

  // 丁科炎（杭州国际科创中心）
  { id: 'm-dky-1', name: '苏锦程', advisorId: 'dingky', type: 'phd',    year: 2023, platform: '杭州国际科创中心' },
  { id: 'm-dky-2', name: '蒋若涵', advisorId: 'dingky', type: 'master', year: 2024, platform: '杭州国际科创中心' },
  { id: 'm-dky-3', name: '邹皓辰', advisorId: 'dingky', type: 'master', year: 2025, platform: '杭州国际科创中心' },
  { id: 'm-dky-4', name: '郭语桐', advisorId: 'dingky', type: 'engineer', year: 2024, platform: '杭州国际科创中心' },

  // 王一珉（杭州国际科创中心）
  { id: 'm-wym-1', name: '范辰逸', advisorId: 'wangym', type: 'master', year: 2024, platform: '杭州国际科创中心' },
  { id: 'm-wym-2', name: '严婧雯', advisorId: 'wangym', type: 'master', year: 2025, platform: '杭州国际科创中心' },
  { id: 'm-wym-3', name: '崔瀚文', advisorId: 'wangym', type: 'engineer', year: 2023, platform: '杭州国际科创中心' },
  { id: 'm-wym-4', name: '杨宇晨', advisorId: 'wangym', type: 'engineer', year: 2024, platform: '杭州国际科创中心' },

  // 郑国轴（舟山海洋研究中心）
  { id: 'm-zgz-1', name: '钱沛霖', advisorId: 'zhenggz', type: 'phd',    year: 2022, platform: '舟山海洋研究中心' },
  { id: 'm-zgz-2', name: '邵知秋', advisorId: 'zhenggz', type: 'master', year: 2024, platform: '舟山海洋研究中心' },
  { id: 'm-zgz-3', name: '魏浩然', advisorId: 'zhenggz', type: 'engineer', year: 2023, platform: '舟山海洋研究中心' },

  // 李传昆（舟山海洋研究中心）
  { id: 'm-lck-1', name: '潘星辰', advisorId: 'lick', type: 'phd',     year: 2024, platform: '舟山海洋研究中心' },
  { id: 'm-lck-2', name: '段惜羽', advisorId: 'lick', type: 'master',  year: 2025, platform: '舟山海洋研究中心' },
];

// ---------- 衍生数据 ----------
const facultyById = Object.fromEntries(facultyList.map((f) => [f.id, f]));

export function getFacultyById(id) {
  return facultyById[id];
}

// 三大研究方向
export const directions = [
  {
    id: 'general_ai',
    name: '通用智能技术',
    summary: '面向通用人工智能的知识表示、知识推理与大模型对齐。',
    color: '#0ea5e9',
    icon: '🧠',
    facultyIds: ['zhangny', 'zhangwen', 'dengsm'],
  },
  {
    id: 'ai4s',
    name: 'AI 4 Science',
    summary: '人工智能驱动的科学发现：科学知识图谱、智能科研助手与产业落地。',
    color: '#8b5cf6',
    icon: '🔬',
    facultyIds: ['zhangq', 'dingky', 'wangym'],
  },
  {
    id: 'ocean',
    name: 'AI 海洋',
    summary: '面向智慧海洋的多模态感知、知识工程与系统集成。',
    color: '#14b8a6',
    icon: '🌊',
    facultyIds: ['zhenggz', 'lick'],
  },
];

// 平台 / 二级单位
export const platforms = [
  {
    id: 'cs',
    name: '计算机科学与技术学院',
    short: '计算机学院',
    color: '#0ea5e9',
    icon: '🖥️',
    facultyIds: ['chen'],
  },
  {
    id: 'software',
    name: '软件学院',
    short: '软件学院',
    color: '#6366f1',
    icon: '💾',
    facultyIds: ['zhangny', 'zhangwen'],
  },
  {
    id: 'ai',
    name: '人工智能学院',
    short: '人工智能学院',
    color: '#8b5cf6',
    icon: '🤖',
    facultyIds: ['dengsm'],
  },
  {
    id: 'innovation',
    name: '杭州国际科创中心',
    short: '杭州国际科创中心',
    color: '#f59e0b',
    icon: '🚀',
    facultyIds: ['dingky', 'wangym'],
  },
  {
    id: 'ocean',
    name: '舟山海洋研究中心',
    short: '舟山海洋研究中心',
    color: '#14b8a6',
    icon: '🌊',
    facultyIds: ['zhenggz', 'lick'],
  },
  {
    id: 'engineer',
    name: '工程师学院',
    short: '工程师学院',
    color: '#10b981',
    icon: '⚙️',
    facultyIds: ['zhangq'],
  },
];

// 智科慧创公司（与平台依托并列展示）
export const company = {
  id: 'zhike',
  name: '智科慧创',
  tagline: '依托实验室孵化的产业化平台',
  color: '#ef4444',
  icon: '🏢',
  members: [
    { name: '王一珉', role: 'CEO', advisorRefId: 'wangym' },
    { name: '丁科炎', role: 'CTO', advisorRefId: 'dingky' },
    { name: '张强', role: '首席科学家', advisorRefId: 'zhangq' },
    { name: '杨宇晨', role: '工程师', advisorRefId: 'wangym' },
  ],
};

// 学生 / 成员类型
export const memberTypeLabels = {
  phd: '博士研究生',
  master: '硕士研究生',
  ug: '本科生',
  engineer: '工程师',
};

export const memberTypeOrder = ['phd', 'master', 'ug', 'engineer'];

// 工具函数：按导师分组学生
export function membersByAdvisor(advisorId) {
  return memberList.filter((m) => m.advisorId === advisorId);
}

// 工具函数：按平台 + 类型 + 入学年级组织成员
export function organizeByPlatform(platformShortName) {
  const result = {
    faculty: facultyList.filter((f) => f.platform === platformShortName),
    members: {},
  };
  memberTypeOrder.forEach((t) => {
    const grouped = {};
    memberList
      .filter((m) => m.platform === platformShortName && m.type === t)
      .forEach((m) => {
        const y = String(m.year);
        if (!grouped[y]) grouped[y] = [];
        grouped[y].push(m);
      });
    if (Object.keys(grouped).length) result.members[t] = grouped;
  });
  return result;
}
