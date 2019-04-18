<template>
  <div class="forgetpwd">
    <div class="container">
      <div class="title">
        <label>忘记密码</label>
        <el-button type="text" @click="backLogin">返回登录</el-button>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="65px">
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone" type="tel" size="small"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display:flex;">
            <el-input placeholder="请输入验证码" v-model="form.code" type="tel" size="small"></el-input>
            <el-button
              type="primary"
              size="mini"
              style="height:30px;margin-top:6px;margin-left:10px;"
              @click="sendMessage"
              :disabled="btnDisabled"
            >{{btnText}}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请输入新密码" v-model="form.password" type="password" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-top: 30px;">
        <el-button type="primary" size="small" style="width: 70px;" @click="submit">提 交</el-button>
      </div>
    </div>
  </div>
</template>
<script>

const userService = require('../../service/userService.js');
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('手机号不能为空'));
      } else {
        // 正则表达式校验
        var reg=/^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }
        this.btnDisabled = false;
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value != this.code) {
        callback(new Error('验证码不正确'));
      } else {        
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      var reg = /^(\w){6,20}$/; 
      if (!reg.test(value)) {
        callback(new Error('请输入6-20个字母、数字、下划线'));
      } else {        
        callback();
      }
    };
    return {
      form:{
        phone: "",
        code: "",
        password: ""
      },
      rules:{
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          // { validator: checkCode, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
      },
      btnDisabled: true,
      btnText:"获取验证码",
      username: null, 
    }
  },

  methods: {
    backLogin() {
      this.$router.back(-1);      
    },

    /**
     * 获取手机验证码
     */
    getValiCode(){
      userService.getPhoneValiCode(this.form.phone, res => {
        this.username = res;
      })
    },

    // 获取验证码
    sendMessage(){
        if(this.btnDisabled){

            return;
        }
        this.getValiCode();
        this.getSecond(60);
    },
    //发送验证码
    getSecond(wait){
        let _this=this;
        let _wait = wait;
        if(wait == 0) {
            this.btnDisabled=false;
            this.btnText="获取验证码";                    
            wait = _wait;
        } else {
            this.btnDisabled=true;
            this.btnText="验证码(" + wait + "s)"
            wait--;
            setTimeout(function() {
                _this.getSecond(wait);
            },
            1000);
        }
    },

    /**
     * 提交按钮
     */
    submit(){
      let data = {
        phone: this.form.phone,
        code: this.form.code,
        password: this.form.password,
        username: this.username,
      };
      userService.settingNewPassword(data, res => {
        if(res.code === 1){
          this.$success("设置成功！");
          this.backLogin();
        }
      })
    }
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -165px;
  margin-top: -200px;
  width: 330px;
  height: 400px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title label {
  padding-left: 6px;
  border-left: 3px solid #409eff;
  color: #409eff;
}
</style>
