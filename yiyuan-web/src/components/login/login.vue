<template>
  <div id="login">
    <img src="../../common/images/login_bg.png" class="login-bj">
    <div class="infomation">
      <div class="form-infomation">
        <div class="yiyuan-title">
          <img src="../../common/images/logo-mini.png" alt class="logo-mini">
          <div class="yiyuan-detail">
            <h2>易元安全智能信息平台</h2>
            <label>有限空间作业在线监控平台一站式服务解决方案</label>
          </div>
        </div>
        <div class="select-type">
          <span @click="selectType(true)" :class="[flagType ? 'active-platform-type' : '']">企业用户</span>
          <span @click="selectType(false)" :class="[!flagType ? 'active-platform-type' : '']">应急管理部门</span>
        </div>
        <div class="form-center">
          <div class="form-item">
            <img src="../../common/images/username-icon.png">
            <el-input v-model="userName" autofocus placeholder="企业名称或统一信用代码" style="width: 330px;"></el-input>
          </div>
          <div class="form-item">
            <img src="../../common/images/userpwd-icon.png">
            <el-input
              v-model="userPassword"
              @keyup.enter.native="login"
              placeholder="请输入密码"
              style="width: 330px;"
              type="password"
            ></el-input>
          </div>
        </div>
        <div class="login-center">
          <span class="txt forget-pwd" @click="forgotPassword">忘记密码</span>
          <el-button class="sign" @click="login">马上登录</el-button>
          <span class="txt registration" @click="registration">企业注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const userService = require("../../service/userService.js");
export default {
  data() {
    return {
      userName: "",
      userPassword: "",
      flagType: true
    };
  },

  methods: {
    selectType(flag) {
      this.flagType = flag;
    },

    /**
     * 忘记密码处理函数
     */
    forgotPassword() {
      this.$router.push("/forgetpwd");
    },

    /**
     * 用户登录处理函数
     */
    login() {
      if ("" == this.userName) {
        this.$message.error("用户名不能为空");
        return;
      }
      if ("" == this.userPassword) {
        this.$message.error("密码不能为空");
        return;
      }
      userService.login(this.userName, this.userPassword, res => {
        console.log("res");
        console.log(res);
        if (-1 != res.code) {
          // 页面跳转
          if ("企业" != res.usertype && null != res.usertype) {
            sessionStorage.setItem("account", "manager");
            this.$router.push("/monitoringcenter"); // admin
            // 刷新缓存
            this.$router.go("/monitoringcenter");
          } else {
            sessionStorage.setItem("account", "user");
            this.$router.push("/e_monitoringcenter"); // 用户
            // 刷新缓存
            this.$router.go("/e_monitoringcenter");
          }
          this.$message({
            message: "欢迎您！登录成功",
            type: "success"
          });
        }
      });
      // this.$router.push('/container');
    },

    /**
     * 企业注册处理函数
     */
    registration() {
      this.$router.push("/registration");
    }
  }
};
</script>
<style scoped>
#login {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
}

#login img.login-bj {
  width: 100%;
  height: 100%;
}

.infomation {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -505px;
  margin-top: -340px;
  width: 1250px;
  height: 680px;
}

.infomation > img {
  width: 100%;
  height: 100%;
}

.form-infomation {
  position: absolute;
  top: 0;
  left: 572px;
  width: 678px;
  height: 680px;
  display: flex;
  flex-direction: column;
}

.yiyuan-title {
  display: flex;
  align-items: center;
  margin-left: 117px;
  margin-top: 120px;
}

.yiyuan-title img.logo-mini {
  margin-top: 5px;
  margin-right: 5px;
  display: inline-block;
  width: 29px;
  height: 40px;
  cursor: pointer;
}

.yiyuan-detail {
  display: flex;
  flex-direction: column;
}

.yiyuan-detail h2 {
  /* padding-top: 11px; */
  display: block;
  height: 35px;
  letter-spacing: 2px;
  /* line-height: 35px; */
  margin-left: 10px;
  font-size: 32px;
  color: #202020;
}

.yiyuan-detail label {
  margin-top: -14px;
  margin-left: 10px;
  color: #aaa;
  font-size: 15px;
}

.select-type {
  display: flex;
  width: 330px;
  height: 36px;
  margin: 0 auto;
  margin-top: 36px;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 4px;
}

.select-type > span {
  display: inline-block;
  width: 50%;
  line-height: 36px;
  font-size: 14px;
  text-align: center;
  color: #555;
  transition: all 0.2s ease;
}

.select-type > span:hover {
  cursor: pointer;
}

.select-type span.active-platform-type {
  background-color: #007ed7;
  border: 1px solid #007ed7;
  color: #fff;
  transition: all 0.3s ease;
}

.form-item {
  margin-top: 30px;
  padding-left: 142px;
  display: flex;
  align-items: center;
}

.form-item > img {
  margin-right: 10px;
  width: 22px;
  height: 26px;
}

.login-center {
  margin: 0 auto;
  width: 330px;
  display: flex;
  flex-direction: column;
}

.login-center > span.txt {
  padding-top: 7px;
  padding-bottom: 14px;
  font-size: 13px;
  text-align: right;
}

.login-center > span:hover {
  cursor: pointer;
}

.sign {
  margin: 0 auto;
  width: 280px;
  height: 42px;
  color: #fff;
  background: linear-gradient(to right, #007ed7, #1b88f5);
}

.forget-pwd {
  color: #555555;
}

.registration {
  color: #1b88f5;
}
</style>
