export default [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    icon: '',
    disabled: false,
    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        title: '工作台'
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        title: '分析页'
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
        title: '监控页'
      }
    ]
  },
  {
    name: 'form',
    title: '表单页',
    icon: '',
    disabled: false,
    children: [
      {}
    ]
  },
  {
    name: 'list',
    title: '列表页',
    icon: '',
    disabled: false,
    children: [
      {}
    ]
  },
  {
    name: 'profile',
    title: '详情页',
    icon: '',
    disabled: false,
    children: [
      {}
    ]
  },
  {
    name: 'result',
    title: '结果页',
    icon: '',
    disabled: false,
    children: [
      {}
    ]
  },
  {
    name: 'exception',
    title: '异常页',
    icon: '',
    disabled: false,
    children: [
      {}
    ]
  },
  {
    name: 'account',
    title: '个人页',
    icon: '',
    disabled: false,
    children: [
      {}
    ]
  }
]

/**
基础资料 (basic)
  项目管理 (basic_project)
  客商管理 (basic_trader)
  物料管理 (basic_material)
  车辆管理 (basic_vehicle)
企业管理 (company)
  组织架构 (company_organization)
  用户管理 (company_user)
  角色管理 (company_role)
  企业信息 (company_info)
设备管理 (device)
  设备列表 (device_list)
  运行数据 (device_data)
  视频监控 (device_monitor)
劳务管理 (labor)
  人员管理 (labor_user)
  考勤管理 (labor_attendance)
    考勤记录 (labor_attendance_log)
    考勤设置 (labor_attendance_set)
    排班表 (labor_attendance_duty)
安全管理 (safe)
  安全巡检 (safe_patrol)
    巡检计划 (safe_patrol_plan)
    巡检记录 (safe_patrol_log)
    隐患整改 (safe_patrol_risk)
      隐患记录 (safe_patrol_risk_log)
      隐患检查 (safe_patrol_risk_check)
  安监抽查 (safe_inspect)
    抽查记录 (safe_inspect_log)
    隐患整改 (safe_inspect_risk)
系统管理 (system)
  服务配置 (system_service)
  预警配置 (system_warning)
  系统配置 (system_set)
*/
