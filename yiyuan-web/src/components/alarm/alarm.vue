<template>
  <div id="alarm">
    <div class="top-nav">
      <router-link :to="nav.link" tag="span" v-for="(nav,index) in navList" :key="index">
        {{nav.name}}
        <label class="active"></label>
      </router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navIndex: 0,
      searchForm: "",
      List: [],
      navList: [{
        name: "实时警告",
        link: "/alarm/monitor"
      }, {
        name: "历史警告",
        link: "/alarm/history"
      }, {
        name: "告警配置",
        link: "/alarm/configure"
      }]
    }
  },

  methods: {}
}

</script>
<style scoped>
#alarm {
  padding: 0 0px;
  display: flex;
  flex-direction: column;

}

.top-nav {
  margin-bottom: 15px;
}

.main {
  padding: 0 20px;
  background-color: #fff;
}

.top-nav span {
  margin-left: 6px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  color: #202020;
}

.top-nav span.router-link-active label.active {
  margin: 2px auto;
  display: block;
  width: 42px;
  height: 2px;
  background-color: #007ED7;
  border-radius: 6px;
}

</style>
<style>
#alarm .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#alarm .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
