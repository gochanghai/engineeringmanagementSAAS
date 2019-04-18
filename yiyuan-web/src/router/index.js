import Vue from 'vue'
import Router from 'vue-router'
import container from '../common/components/container.vue'
import login from '../components/login/login.vue'
import monitoringCenter from '../components/monitoringcenter/monitoringcenter.vue' //监控中心
import enterpriseInfo from '../components/enterpriseinfo/enterpriseinfo.vue' //企业信息
import info from '../components/enterpriseinfo/pages/info.vue' //企业信息
import user from '../components/enterpriseinfo/pages/user.vue' //组织架构
import risk from '../components/enterpriseinfo/pages/risk.vue' //风险识别
import special from '../components/enterpriseinfo/pages/special.vue' //专项信息
import security from '../components/enterpriseinfo/pages/security.vue' //安全信息
import material from '../components/enterpriseinfo/pages/material.vue' //器材配备
import emergency from '../components/enterpriseinfo/pages/emergency.vue' //应急管理 
import train from '../components/train/train.vue' //安全培训
import workManager from '../components/workmanager/workmanager.vue' //作业管理
import alarm from '../components/alarm/alarm.vue' //告警管理
import monitor from '../components/alarm/pages/monitor.vue' //实时警告
import history from '../components/alarm/pages/history.vue' //历史警告
import configure from '../components/alarm/pages/configure.vue' //告警配置
import system from '../components/system/system.vue' //系统管理
import userSystem from '../components/system/pages/user.vue' //用户管理
import regionSystem from '../components/system/pages/region.vue' //区域管理
import registration from '../components/registration/registration.vue' //企业注册


// 企业用户
import e_monitoringCenter from '../enterpriseuser/e_monitoringcenter/e_monitoringcenter.vue' //监控中心
import e_enterpriseinfo from '../enterpriseuser/e_enterpriseinfo/e_enterpriseinfo.vue' //企业信息
import e_info from '../enterpriseuser/e_enterpriseinfo/pages/e_info.vue' //企业信息
import e_user from '../enterpriseuser/e_enterpriseinfo/pages/e_user.vue' //组织架构
import e_risk from '../enterpriseuser/e_enterpriseinfo/pages/e_risk.vue' //风险识别
import e_material from '../enterpriseuser/e_enterpriseinfo/pages/e_material.vue' //器材配备
import e_emergency from '../enterpriseuser/e_enterpriseinfo/pages/e_emergency.vue' //应急管理
import e_specialinfo from '../enterpriseuser/e_specialinfo/e_specialinfo.vue' //专项信息

import e_space from '../enterpriseuser/e_specialinfo/pages/e_space.vue' //有限空间
import e_dust from '../enterpriseuser/e_specialinfo/pages/e_dust.vue' //粉尘爆炸
import e_chemistry from '../enterpriseuser/e_specialinfo/pages/e_chemistry.vue' //危险化学品
import e_ammonia from '../enterpriseuser/e_specialinfo/pages/e_ammonia.vue' //涉氢
import e_lithium from '../enterpriseuser/e_specialinfo/pages/e_lithium.vue' //锂电池
import e_dev from '../enterpriseuser/e_specialinfo/pages/e_dev.vue' //特种设备
import e_other from '../enterpriseuser/e_specialinfo/pages/e_other.vue' //其他

import e_train from '../enterpriseuser/e_train/e_train.vue' //安全培训
import e_workManager from '../enterpriseuser/e_workmanager/e_workmanager.vue' //作业管理
import e_alarm from '../enterpriseuser/e_alarm/e_alarm.vue' // 告警管理
import e_monitor from '../enterpriseuser/e_alarm/pages/e_monitor.vue' //实时警告
import e_history from '../enterpriseuser/e_alarm/pages/e_history.vue' //实时警告
import e_securityinfo from '../enterpriseuser/e_securityinfo/e_securityinfo.vue' //安全消息
import e_creditScoring from '../enterpriseuser/e_creditscoring/e_creditscoring.vue' //信用评分
import e_releaseinfo from '../enterpriseuser/e_securityinfo/pages/e_release.vue' //发布消息
import e_historyinfo from '../enterpriseuser/e_securityinfo/pages/e_history.vue' //历史消息
import e_releasedetail from '../enterpriseuser/e_securityinfo/pages/e_releasedetail.vue' //历史消息详情信息

import forgetPwd from '../components/forgetpwd/forgetpwd.vue' //忘记密码

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '登录',
    component: login
  }, {
    path: '/registration',
    name: '企业注册',
    component: registration
  }, {
    path: '/container',
    name: 'container',
    component: container,
    redirect: '/monitoringcenter',
    children: [{
        path: '/monitoringcenter',
        name: '监控中心',
        component: monitoringCenter,
      }, {
        path: '/enterpriseInfo',
        name: '企业信息',
        component: enterpriseInfo,
        redirect: '/enterpriseInfo/info',
        children: [{
          path: '/enterpriseInfo/info',
          name: '企业信息',
          component: info,
        }, {
          path: '/enterpriseInfo/user',
          name: '组织架构',
          component: user,
        }, {
          path: '/enterpriseInfo/risk',
          name: '风险识别',
          component: risk,
        }, {
          path: '/enterpriseInfo/special',
          name: '专项信息',
          component: special,
        }, {
          path: '/enterpriseInfo/security',
          name: '安全信息',
          component: security,
        }, {
          path: '/enterpriseInfo/material',
          name: '器材配备',
          component: material,
        }, {
          path: '/enterpriseInfo/emergency',
          name: '应急管理',
          component: emergency,
        }]
      }, {
        path: '/train',
        name: '安全培训',
        component: train,
      }, {
        path: '/workmanager',
        name: '作业管理',
        component: workManager
      }, {
        path: '/alarm',
        name: '告警管理',
        component: alarm,
        redirect: '/alarm/monitor',
        children: [{
          path: '/alarm/monitor',
          name: '实时警告',
          component: monitor
        }, {
          path: '/alarm/history',
          name: '历史警告',
          component: history
        }, {
          path: '/alarm/configure',
          name: '告警配置',
          component: configure
        }]
      }, {
        path: '/system',
        name: '系统管理',
        component: system,
        redirect: '/system/usersystem',
        children: [{
          path: '/system/usersystem',
          name: '用户管理',
          component: userSystem
        }, {
          path: '/system/regionsystem',
          name: '区域管理',
          component: regionSystem
        }]
      },
      // 企业用户
      {
        path: '/e_monitoringcenter',
        name: '企业-监控中心',
        component: e_monitoringCenter,
      }, {
        path: '/e_enterpriseinfo',
        name: '企业-企业信息',
        component: e_enterpriseinfo,
        redirect: '/e_enterpriseinfo/e_info',
        children: [{
          path: '/e_enterpriseinfo/e_info',
          name: '企业-企业信息',
          component: e_info,
        }, {
          path: '/e_enterpriseinfo/e_user',
          name: '企业-组织架构',
          component: e_user,
        }, {
          path: '/e_enterpriseinfo/e_risk',
          name: '企业-风险识别',
          component: e_risk,
        }, {
          path: '/e_enterpriseinfo/e_material',
          name: '企业-器材配备',
          component: e_material,
        }, {
          path: '/e_enterpriseinfo/e_emergency',
          name: '企业-应急管理',
          component: e_emergency,
        }]
      }, {
        path: '/e_specialinfo',
        name: '企业-专项信息',
        component: e_specialinfo,
        redirect: '/e_specialinfo/e_space',
        children: [{
          path: '/e_specialinfo/e_space',
          name: '企业-专项信息-有限空间',
          component: e_space,
        }, {
          path: '/e_specialinfo/e_dust',
          name: '企业-专项信息-粉尘爆炸',
          component: e_dust,
        }, {
          path: '/e_specialinfo/e_chemistry',
          name: '企业-专项信息-危险化学品',
          component: e_chemistry,
        }, {
          path: '/e_specialinfo/e_ammonia',
          name: '企业-专项信息-涉氢',
          component: e_ammonia,
        }, {
          path: '/e_specialinfo/e_lithium',
          name: '企业-专项信息-锂电池',
          component: e_lithium,
        }, {
          path: '/e_specialinfo/e_dev',
          name: '企业-专项信息-特种设备',
          component: e_dev,
        }, {
          path: '/e_specialinfo/e_other',
          name: '企业-专项信息-其他',
          component: e_other,
        }]
      }, {
        path: '/e_train',
        name: '企业-安全培训',
        component: e_train,
      }, {
        path: '/e_workmanager',
        name: '企业-作业管理',
        component: e_workManager,
      }, {
        path: '/e_alarm',
        name: '企业-告警管理',
        component: e_alarm,
        redirect: '/e_alarm/e_monitor',
        children: [{
          path: '/e_alarm/e_monitor',
          name: '企业-实时警告',
          component: e_monitor,
        }, {
          path: '/e_alarm/e_history',
          name: '企业-历史警告',
          component: e_history,
        }]
      }, {
        path: '/e_securityinfo',
        name: '企业-安全消息',
        component: e_securityinfo,
        redirect: '/e_securityinfo/e_releaseinfo',
        children: [{
          path: '/e_securityinfo/e_releaseinfo',
          name: '企业-发布消息',
          component: e_releaseinfo
        }, {
          path: '/e_securityinfo/e_historyinfo',
          name: '企业-历史消息',
          component: e_historyinfo
        },{
          path: '/e_securityinfo/e_releasedetail',
          name: '企业-历史消息详情',
          component: e_releasedetail
        }]
      }, {
        path: '/e_creditscoring',
        name: '企业-信用评分',
        component: e_creditScoring
      }
    ]
  },{
    path: '/forgetpwd',
    name: 'forgetpwd',
    component: forgetPwd
  }]
})
