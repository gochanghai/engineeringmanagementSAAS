<template>
  <div id="modifypwd">
    <el-dialog title="修改密码" :visible.sync="isVisible" width="22%" :before-close="handleClose">
      <el-form label-width="85px" size="small" ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" placeholder="请输入原密码" clearable type="password"/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入6-20个字母、数字、下划线" clearable type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="form.password2" placeholder="请输入6-20个字母、数字、下划线" clearable type="password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

const userService = require('../../service/userService.js');
export default {
  data() {
    var checkOldPassword = (rule, value, callback) => {
      if (value != this.form.password) {        
        userService.checkOldPassword(value, res => {
          if(res.code === 2){
            callback();
          }else{
            callback(new Error('原始密码不正确'));
          }
        });
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
    var checkPassword2 = (rule, value, callback) => {
      var reg = /^(\w){6,20}$/; 
      if (!reg.test(value)) {
        callback(new Error('请输入6-20个字母、数字、下划线'));
      }else{        
        if (value != this.form.password) {
          callback(new Error('确认密码和登录密码不一致'));
        } else {        
          callback();
        }
      }      
    };
    return {
      form: {
        oldPassword: "",
        password: "",
        password2: ""
      },
      rules: {
          oldPassword: [
            { required: true, message: '原密码不能为空', trigger: 'blur' },
            { validator: checkOldPassword, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { validator: checkPassword, trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: checkPassword2, trigger: 'blur' }
          ],          
      },
    }
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    isVisible: function(value){
      // this.resetForm();
      if(value){
      }else{
        // 表单重置
        this.$refs['form'].resetFields();
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('close');
    },

    save() {
      let _this = this;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
            return;
        }

        let oldPassword = this.form.oldPassword;
        let password = this.form.password;

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userService.changepassword(oldPassword, password, res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.handleClose();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          this.handleClose();
        });        
      });        
    },
  }
}

</script>
<style scoped>
</style>
<style>
#modifypwd /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
