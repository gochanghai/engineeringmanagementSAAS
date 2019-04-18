<template>
  <div id="system">
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
        name: "用户管理",
        link: '/system/usersystem'
      }, {
        name: "区域管理",
        link: '/system/regionsystem'
      }]
    }
  },

  methods: {
    select(index) {
      this.navIndex = index;
    }
  }
}

</script>
<style scoped>
#system {
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

/*.operation {
  position: relative;
  width: 115px;
  display: flex;
  justify-content: space-between;
}

.operation span {
  color: #1B88F5;
  font-size: 14px;
}

.operation img {
  width: 17px;
  height: 17px;
  margin-right: 5px;
}

.search-top {
  height: 70px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #CCC;
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

.tabelData {
  width: 100%;
  display: flex;
  flex: 1;
}

.paging {
  text-align: center;
  display: flex;
  align-items: center;
  height: 80px;
}

.paging-detail {
  width: 100%;
}*/

</style>
<style>
#system .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#system .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
</style>
