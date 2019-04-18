<template>
  <div id="enterpriseinfo">
    <div class="top-nav">
      <div>
        <router-link :to="nav.link" v-for="(nav,index) in navList" tag="span" :key="index">
          {{nav.name}}
          <label class="active"></label>
        </router-link>
      </div>
      <div class="search" v-show="routeFun">
        <el-input size="small" placeholder="企业名称" v-model="searchForm" clearable class="search-input" clearable></el-input>
        <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
      </div>
    </div>
    <router-view :companyId="companyId"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: "",
      navList: [{
          name: "企业信息",
          link: "/enterpriseInfo/info"
        },
        {
          name: "组织架构",
          link: "/enterpriseInfo/user"
        },
        {
          name: "风险识别",
          link: "/enterpriseInfo/risk"
        }, {
          name: "专项信息",
          link: "/enterpriseInfo/special"
        }, {
          name: "安全信息",
          link: "/enterpriseInfo/security"
        }, {
          name: "器材配备",
          link: "/enterpriseInfo/material"
        }, {
          name: "应急管理",
          link: "/enterpriseInfo/emergency"
        }
      ]
    }
  },
  props: {
    // 获取值
    companyId: {
      type: String,
      default: null
    }
  },
  computed: {
    routeFun() {
      let routeName = this.$route.name;
      if (routeName == '风险识别' || routeName == '专项信息') {
        return true
      } else {
        return false
      }
    }
  }
}

</script>
<style scoped>
.top-nav {
  margin-bottom: 10px;
}

span {
  margin-left: 6px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  color: #202020;
}

span.router-link-active label.active {
  margin: 2px auto;
  display: block;
  width: 42px;
  height: 2px;
  background-color: #007ED7;
  border-radius: 6px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
}

.search {
  align-items: center;
  display: flex;
}

.search-input {
  width: 210px;
}

.search-btn {
  background-color: #007ED7;
  color: #fff;
}

</style>
