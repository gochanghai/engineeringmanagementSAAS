<template>
  <div id="navigation">
    <!-- 管理部门区域导航 -->
    <div class="nav-content" v-if="accountType=='manager'">
      <div v-if="roleType=='manager'">
        <router-link :to="nav.link" v-for="(nav,index) in navList0" tag="span" :key="index">
          {{nav.name}}
        </router-link>
      </div>
      <div v-else>
        <router-link :to="nav.link" v-for="(nav,index) in navList0" tag="span" :key="index">
          {{nav.name}}
        </router-link>
      </div>
    </div>
    <!-- 企业用户页面导航 -->
    <div class="nav-content" v-else>
      <router-link :to="nav.link" v-for="(nav,index) in navList2" tag="span" :key="index">
        {{nav.name}}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    accountType: {
      type: String,
      default: null
    },
    roleType:{
      type:String,
      default: null
    }
  },

  data() {
    return {
      navList0: [{
          name: "监控中心",
          link: "/monitoringcenter"
        },
        {
          name: "企业信息",
          link: "/enterpriseInfo"
        },
        {
          name: "安全培训",
          link: "/train"
        }, {
          name: "作业管理",
          link: "/workmanager"
        }, {
          name: "告警管理",
          link: "/alarm"
        }, {
          name: "系统管理",
          link: "/system"
        }
      ],

      navList1: [{
          name: "监控中心",
          link: "/monitoringcenter"
        },
        {
          name: "企业信息",
          link: "/enterpriseInfo"
        },
        {
          name: "安全培训",
          link: "/train"
        }, {
          name: "作业管理",
          link: "/workmanager"
        }, {
          name: "告警管理",
          link: "/alarm"
        }
      ],

      navList2: [{
        name: "监控中心",
        link: "/e_monitoringcenter"
      }, {
        name: "企业信息",
        link: "/e_enterpriseinfo"
      }, {
        name: "专项信息",
        link: "/e_specialinfo"
      }, {
        name: "安全培训",
        link: "/e_train"
      }, {
        name: "作业管理",
        link: "/e_workmanager"
      }, {
        name: "告警管理",
        link: "/e_alarm"
      }, {
        name: "安全信息",
        link: "/e_securityinfo"
      }, {
        name: "信用评分",
        link: "/e_creditscoring"
      }]
    }
  }
}

</script>
<style scoped>
.nav-content {
  position: absolute;
  display: flex;
  left: 260px;
}

span {
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
}

span.router-link-active {
  background-color: #F2F4F6;
  color: #007ED7;
  transition: all .2s ease;
}

span:last-child {
  margin-left: 0;
}

</style>
