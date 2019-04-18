<template>
  <div id="e_enterpriseinfo">
    <div class="aside">
      <router-link v-for="(item,index) in navList" :key="index" :to="item.link" tag="span">{{item.name}}</router-link>
    </div>
    <router-view class="pages"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [{
        name: "企业信息",
        link: "/e_enterpriseinfo/e_info"
      }, {
        name: "组织架构",
        link: "/e_enterpriseinfo/e_user"
      }, {
        name: "风险识别",
        link: "/e_enterpriseinfo/e_risk"
      }, {
        name: "器材配备",
        link: "/e_enterpriseinfo/e_material"
      }, {
        name: "应急管理",
        link: "/e_enterpriseinfo/e_emergency"
      }]
    }
  }
}

</script>
<style scoped>
#e_enterpriseinfo {
  position: absolute;
  width: calc(100% - 260px);
  height: calc(100% - 50px);
  left: 260px;
  top: 50px;
  display: flex;
}

.aside {
  z-index: 99;
  position: fixed;
  left: 0;
  height: 100%;
  padding-top: 15px;
  width: 260px;
  text-align: center;
  background-color: #fff;
}

.aside span {
  display: block;
  line-height: 38px;
  font-size: 15px;
  cursor: pointer;
  color: #555;
  border-right: 3px solid #fff;
}

.aside span.router-link-active {
  background-color: #D4E9FF;
  color: #1B88F5;
  border-right: 3px solid #56A5F4;
}

.pages {
  flex: 1;
  margin: 15px;
}

</style>
