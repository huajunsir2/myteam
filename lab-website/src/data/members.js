// 实验室成员数据

export const director = {
  name: '陈华钧',
  title: '教授',
  role: '实验室负责人',
  position: '浙江大学计算机学院求是特聘教授',
  unit: '计算机学院',
  type: 'director',
  avatar: '陈',
}

export const secretary = {
  name: '余静',
  title: '实验室秘书',
  role: '秘书',
  unit: '计算机学院',
  type: 'secretary',
  avatar: '余',
}

export const pis = [
  {
    id: 'zhang_ningyu',
    name: '张宁豫',
    title: '副教授',
    role: '学术PI',
    type: 'academic_pi',
    position: '浙江大学软件学院副教授',
    unit: '软件学院',
    avatar: '张',
    researchDirections: ['通用智能技术'],
  },
  {
    id: 'zhang_wen',
    name: '张文',
    title: '副教授',
    role: '学术PI',
    type: 'academic_pi',
    position: '浙江大学软件学院副教授',
    unit: '软件学院',
    avatar: '张',
    researchDirections: ['通用智能技术'],
  },
  {
    id: 'deng_shumin',
    name: '邓淑敏',
    title: '百人研究员',
    role: '学术PI',
    type: 'academic_pi',
    position: '浙江大学人工智能学院百人研究员',
    unit: '人工智能学院',
    avatar: '邓',
    researchDirections: ['通用智能技术'],
  },
  {
    id: 'zhang_qiang',
    name: '张强',
    title: '百人研究员',
    role: '学术PI',
    type: 'academic_pi',
    position: '浙江大学海宁国际校区百人研究员',
    unit: '工程师学院',
    avatar: '张',
    researchDirections: ['AI4S'],
  },
  {
    id: 'ding_keyan',
    name: '丁科炎',
    title: '百人研究员',
    role: '产业PI',
    type: 'industry_pi',
    position: '浙江大学杭州国际科创中心百人研究员',
    unit: '杭州国际科创中心',
    avatar: '丁',
    researchDirections: ['AI4S'],
  },
  {
    id: 'zheng_guozhou',
    name: '郑国轴',
    title: '副所长',
    role: '工程PI',
    type: 'engineering_pi',
    position: '浙江大学舟山海洋研究中心信息所副所长',
    unit: '舟山海洋研究中心',
    avatar: '郑',
    researchDirections: ['AI海洋'],
  },
  {
    id: 'wang_yimin',
    name: '王一民',
    title: '科创合伙人',
    role: '产业PI',
    type: 'industry_pi',
    position: '浙江大学杭州国际科创中心科创合伙人',
    unit: '杭州国际科创中心',
    avatar: '王',
    researchDirections: ['AI4S'],
  },
  {
    id: 'li_chuankun',
    name: '李传昆',
    title: '研究员',
    role: '工程PI',
    type: 'engineering_pi',
    position: '浙江大学舟山海洋研究中心',
    unit: '舟山海洋研究中心',
    avatar: '李',
    researchDirections: ['AI海洋'],
  },
]

export const students = [
  // 张宁豫组
  { id: 's001', name: '李明远', piId: 'zhang_ningyu', grade: 2021, degree: 'phd', unit: '软件学院', avatar: '李' },
  { id: 's002', name: '王思琦', piId: 'zhang_ningyu', grade: 2022, degree: 'phd', unit: '软件学院', avatar: '王' },
  { id: 's003', name: '赵欣然', piId: 'zhang_ningyu', grade: 2022, degree: 'master', unit: '软件学院', avatar: '赵' },
  { id: 's004', name: '刘晨阳', piId: 'zhang_ningyu', grade: 2023, degree: 'master', unit: '软件学院', avatar: '刘' },
  { id: 's005', name: '陈雨涵', piId: 'zhang_ningyu', grade: 2023, degree: 'master', unit: '软件学院', avatar: '陈' },
  { id: 's006', name: '杨昊天', piId: 'zhang_ningyu', grade: 2024, degree: 'master', unit: '软件学院', avatar: '杨' },
  { id: 's007', name: '吴悦冰', piId: 'zhang_ningyu', grade: 2020, degree: 'undergrad', unit: '软件学院', avatar: '吴' },

  // 张文组
  { id: 's008', name: '孙浩宇', piId: 'zhang_wen', grade: 2021, degree: 'phd', unit: '软件学院', avatar: '孙' },
  { id: 's009', name: '周梦娜', piId: 'zhang_wen', grade: 2022, degree: 'phd', unit: '软件学院', avatar: '周' },
  { id: 's010', name: '钱宇翔', piId: 'zhang_wen', grade: 2022, degree: 'master', unit: '软件学院', avatar: '钱' },
  { id: 's011', name: '林晓峰', piId: 'zhang_wen', grade: 2023, degree: 'master', unit: '软件学院', avatar: '林' },
  { id: 's012', name: '何依婷', piId: 'zhang_wen', grade: 2024, degree: 'master', unit: '软件学院', avatar: '何' },

  // 邓淑敏组
  { id: 's013', name: '徐子涵', piId: 'deng_shumin', grade: 2021, degree: 'phd', unit: '人工智能学院', avatar: '徐' },
  { id: 's014', name: '高天宇', piId: 'deng_shumin', grade: 2022, degree: 'phd', unit: '人工智能学院', avatar: '高' },
  { id: 's015', name: '谢雨桐', piId: 'deng_shumin', grade: 2023, degree: 'master', unit: '人工智能学院', avatar: '谢' },
  { id: 's016', name: '郭建波', piId: 'deng_shumin', grade: 2023, degree: 'master', unit: '人工智能学院', avatar: '郭' },
  { id: 's017', name: '罗嘉怡', piId: 'deng_shumin', grade: 2024, degree: 'master', unit: '人工智能学院', avatar: '罗' },

  // 张强组
  { id: 's018', name: '蒋天翼', piId: 'zhang_qiang', grade: 2021, degree: 'phd', unit: '工程师学院', avatar: '蒋' },
  { id: 's019', name: '龚子悦', piId: 'zhang_qiang', grade: 2022, degree: 'phd', unit: '工程师学院', avatar: '龚' },
  { id: 's020', name: '冯宇航', piId: 'zhang_qiang', grade: 2022, degree: 'master', unit: '工程师学院', avatar: '冯' },
  { id: 's021', name: '韩思远', piId: 'zhang_qiang', grade: 2023, degree: 'master', unit: '工程师学院', avatar: '韩' },
  { id: 's022', name: '卢晓涵', piId: 'zhang_qiang', grade: 2024, degree: 'master', unit: '工程师学院', avatar: '卢' },

  // 丁科炎组
  { id: 's023', name: '曹明轩', piId: 'ding_keyan', grade: 2022, degree: 'phd', unit: '杭州国际科创中心', avatar: '曹' },
  { id: 's024', name: '彭宇昊', piId: 'ding_keyan', grade: 2023, degree: 'master', unit: '杭州国际科创中心', avatar: '彭' },
  { id: 's025', name: '杨宇晨', piId: 'ding_keyan', grade: 2023, degree: 'engineer', unit: '杭州国际科创中心', avatar: '杨' },

  // 郑国轴组
  { id: 's026', name: '叶海峰', piId: 'zheng_guozhou', grade: 2021, degree: 'phd', unit: '舟山海洋研究中心', avatar: '叶' },
  { id: 's027', name: '魏子涵', piId: 'zheng_guozhou', grade: 2022, degree: 'phd', unit: '舟山海洋研究中心', avatar: '魏' },
  { id: 's028', name: '朱婷婷', piId: 'zheng_guozhou', grade: 2022, degree: 'master', unit: '舟山海洋研究中心', avatar: '朱' },
  { id: 's029', name: '沈浩然', piId: 'zheng_guozhou', grade: 2023, degree: 'master', unit: '舟山海洋研究中心', avatar: '沈' },

  // 王一民组
  { id: 's030', name: '唐雨晴', piId: 'wang_yimin', grade: 2022, degree: 'phd', unit: '杭州国际科创中心', avatar: '唐' },
  { id: 's031', name: '熊志远', piId: 'wang_yimin', grade: 2023, degree: 'master', unit: '杭州国际科创中心', avatar: '熊' },
  { id: 's032', name: '袁浩然', piId: 'wang_yimin', grade: 2024, degree: 'master', unit: '杭州国际科创中心', avatar: '袁' },

  // 李传昆组
  { id: 's033', name: '田宇轩', piId: 'li_chuankun', grade: 2022, degree: 'master', unit: '舟山海洋研究中心', avatar: '田' },
  { id: 's034', name: '方晓璇', piId: 'li_chuankun', grade: 2023, degree: 'master', unit: '舟山海洋研究中心', avatar: '方' },

  // 计算机学院（陈华钧直属）
  { id: 's035', name: '宋子杰', piId: 'chen_huajun', grade: 2020, degree: 'phd', unit: '计算机学院', avatar: '宋' },
  { id: 's036', name: '邱清语', piId: 'chen_huajun', grade: 2021, degree: 'phd', unit: '计算机学院', avatar: '邱' },
  { id: 's037', name: '范梦瑶', piId: 'chen_huajun', grade: 2022, degree: 'phd', unit: '计算机学院', avatar: '范' },
  { id: 's038', name: '曾宇晨', piId: 'chen_huajun', grade: 2022, degree: 'master', unit: '计算机学院', avatar: '曾' },
  { id: 's039', name: '薛子涵', piId: 'chen_huajun', grade: 2023, degree: 'master', unit: '计算机学院', avatar: '薛' },
  { id: 's040', name: '江雨薇', piId: 'chen_huajun', grade: 2023, degree: 'undergrad', unit: '计算机学院', avatar: '江' },
]

export const researchDirections = [
  {
    id: 'general_ai',
    name: '通用智能技术',
    icon: '🧠',
    color: '#4F8EF7',
    description: '面向大模型、知识图谱与自然语言处理的通用人工智能技术研究',
    piIds: ['zhang_ningyu', 'zhang_wen', 'deng_shumin'],
  },
  {
    id: 'ai4s',
    name: 'AI4S',
    icon: '🔬',
    color: '#36CFC9',
    description: '人工智能赋能科学发现，涵盖分子设计、材料科学等领域的AI应用',
    piIds: ['zhang_qiang', 'ding_keyan', 'wang_yimin'],
  },
  {
    id: 'ai_ocean',
    name: 'AI海洋',
    icon: '🌊',
    color: '#1890FF',
    description: '面向海洋科学的智能感知、数据分析与决策支持系统研究',
    piIds: ['zheng_guozhou', 'li_chuankun'],
  },
]

export const units = [
  { id: 'cs', name: '计算机学院', shortName: '计算机学院' },
  { id: 'software', name: '软件学院', shortName: '软件学院' },
  { id: 'ai', name: '人工智能学院', shortName: '人工智能学院' },
  { id: 'hiic', name: '杭州国际科创中心', shortName: '科创中心' },
  { id: 'ocean', name: '舟山海洋研究中心', shortName: '海洋中心' },
  { id: 'engineer', name: '工程师学院', shortName: '工程师学院' },
]

export const zhikehuichuang = {
  name: '智科慧创',
  ceo: { name: '王一民', piId: 'wang_yimin' },
  cto: { name: '丁科炎', piId: 'ding_keyan' },
  chiefScientist: { name: '张强', piId: 'zhang_qiang' },
  employees: [
    { id: 'e001', name: '杨宇晨', role: '员工', avatar: '杨' },
  ],
}

export const degreeLabels = {
  phd: '博士研究生',
  master: '硕士研究生',
  undergrad: '本科生',
  engineer: '工程师',
}

export const degreeOrder = ['phd', 'master', 'undergrad', 'engineer']
