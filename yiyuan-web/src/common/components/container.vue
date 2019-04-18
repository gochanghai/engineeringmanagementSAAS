<template>
  <div id="container">
    <div class="top">
      <div class="logo">
        <img src="../../common/images/logo.png">
        <label>一站式安全监控平台</label>
      </div>
      <div class="by-module">
        <div class="search">
          <el-input size="medium" v-model="search" placeholder="请输入内容" class="search-input" prefix-icon="el-icon-search"></el-input>
          <el-button size="medium" class="search-btn">搜索</el-button>
        </div>
        <div class="user">
          <span :class="[accountType=='user'?'mes-icon':'']" style="margin-right:5px;">
            <!-- 企业用户显示 -->
            <img :src="message" width="18" style="margin-top: 5px;" v-if="accountType=='user'">
          </span>
          <el-dropdown trigger="click" style="display: flex;align-items: center;" @command="handleCommand">
            <span class="el-dropdown-link user-manager">
              <img :src="account" width="21" style="margin-top: 5px;">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user">用户信息</el-dropdown-item>
              <el-dropdown-item command="modifypwd">密码修改</el-dropdown-item>
              <el-dropdown-item command="out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-left: 2px;">欢迎您！{{nickname}}</span>
        </div>
      </div>
    </div>
    <el-container class="center">
      <el-header style="height:50px;">
        <navigator :accountType="accountType" :roleType="roleType"></navigator>
      </el-header>
      <el-container class="container">
        <el-aside width="260px" v-if="accountType=='manager'">
          <!-- 组件值发生变化 -->
          <enterpriseList @on-change="getCurrentId"></enterpriseList>
        </el-aside>
        <el-main>
          <!-- 通过路由传值 -->
          <router-view :cueerntId="cueerntId" :companyId="companyId"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <modifypwd :isVisible="modifyVisible" @close="modifyVisible=false"></modifypwd>
  </div>
</template>
<script>
import navigator from "../../common/components/navigation.vue";
import enterpriseList from "../../common/components/enterpriselist.vue";
import modifypwd from "../../common/components/modifypwd.vue";

export default {
  data() {
    return {
      modifyVisible: false,
      accountType: "",
      roleType: "",
      search: "",
      nickname: localStorage.getItem("nickname"),
      account: require("../../common/images/account.png"),
      message: require("../../common/images/message.png"),
      cueerntId: null,
      companyId: null,
    };
  },

  methods: {
    handleCommand(command) {
      if (command == "modifypwd") {
        this.modifyVisible = true;
      } else if (command == "out") {
        this.logOutVisible = true;
        this.logout();
      }
    },

    /**
     * 传参调用方法
     */
    getCurrentId(val) {
      if("A" === val.substring(0,1)){
        this.cueerntId = val.substring(2,val.length);
      }else{
        this.companyId = val.substring(2,val.length);
      }
      console.log(val.substring(2,val.length));   
    },

    /**
     * 用户信息处理函数
     */
    userInfo() {},

    /**
     * 密码处理函数
     */
    modifyClose() {},

    /**
     * 退出登录处理函数
     */
    logout() {
      console.log("logout...");
      this.$confirm("您确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 清除缓存
        localStorage.clear();
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    }
  },

  components: {
    navigator,
    enterpriseList,
    modifypwd
  },

  created() {
    console.log(sessionStorage.getItem("account"));
    this.accountType = sessionStorage.getItem("account");
    this.roleType = localStorage.getItem("role");
  }
};

</script>
<style scoped>
#container {
  position: absolute;
  left: 0;
  right: 0;
  top: 96px;
  bottom: 0;
  width: 100%;
  height: calc(100% - 96px);
}

.top {
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  height: 96px;
  background-color: #fff;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  margin-top: 3px;
  height: 90px;
}

.logo label {
  letter-spacing: 1.5px;
  font-size: 18px;
  color: #aaa;
}

.by-module {
  display: flex;
  top: 0;
  right: 34px;
  position: absolute;
  height: 96px;
}

.search {
  margin-right: 20px;
  align-items: center;
  display: flex;
}

.search-input {
  width: 238px;
}

.search-btn {
  background-color: #007ed7;
  color: #fff;
}

.center {
  padding-top: 50px;
  position: absolute;
  width: 100%;
  height: calc(100% - 0px);
}

.el-header {
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  top: 96px;
  line-height: 50px;
  background-color: #007ed7;
  color: #fff;
}

.el-aside {
  /*border: 1px solid #e4e4e4;*/
}

.el-main {
  padding: 15px;
  background-color: #f2f4f6;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.mes-icon,
.user-manager {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
}

.mes-icon:hover,
.user-manager:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.15);
  transition: all 0.43s ease;
}

</style>
<style>
#container .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#container .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}

</style>
