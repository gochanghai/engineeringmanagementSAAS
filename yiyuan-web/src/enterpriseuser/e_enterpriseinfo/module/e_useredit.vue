<template>
  <div id="e_useredit">
    <el-dialog :title="title" :visible.sync="isVisible" width="20%" :before-close="handleClose">
      <el-form label-width="66px" label-position="left" size="small" ref="userForm" :model="userForm" :rules="rules" status-icon style="flex: 1">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" clearable placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="position">
          <el-select v-model="userForm.position" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in dutyType" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="职责" prop="duty">
          <el-input v-model="userForm.duty" clearable placeholder="总经理/主任/安全员"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="userForm.idcard" clearable :disabled="this.updateId != null" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input v-model="userForm.cellphone" clearable :disabled="this.updateId != null" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="medium" @click="save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

const workerService = require('../../../service/workerService.js');
export default {
  data() {
    var checkidcard = (rule, value, callback) => {
      if(this.updateId != null){
        callback();
      }
      if (value === null) {
        callback(new Error('身份证号不能为空'));
      } else {
        // 正则表达式校验
        var reg=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
         callback(new Error('身份证号不正确'));
        }else{
          workerService.checkIdCard(value, res => {
            if(2 == res.code){
              callback(new Error('此身份证号已被注册'));
            }else{
              callback();
            }
          });
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      if(this.updateId != null){
        callback();
      }
      if (value === null) {
        callback(new Error('联系方式不能为空'));
      } else {
        // 正则表达式校验
        var reg=/^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }else{
          workerService.checkPhone(value, res => {
            if(2 == res.code){
              callback(new Error('此手机号已被注册'));
            }else{
              callback();
            }
          });
        }
      }
    };
    return {
      dutyType: [{
        id: '0',
        name: '主要负责人'
      }, {
        id: '1',
        name: '安全管理员'
      }, {
        id: '2',
        name: '安全员'
      }],
      userForm: {
        id: '',
        name: '',
        duty: '',
        position: '',
        idcard: '',
        cellphone: '',
        id: '',
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        duty: [
          { required: true, message: '职责不能为空', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '职务不能为空', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '身份证不能为空', trigger: 'blur' },
          { validator: checkidcard, trigger: 'blur' }
        ],
        cellphone: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },

  props: {
    title: {
      type: String,
      default: "添加"
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    updateId: {
      type: Number,
      default: null
    }
  },
  watch: {
    isVisible: function(value){
      // this.resetForm();
      if(value){
        console.log(value)
        this.getUserInfo();
      }else{
        this.resetForm();
      }
      console.log("useree");
    },
    title: function(value){
      if(value === "修改企业人员名单"){
        this.isEdit = true;
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close', false);
    },

    /**
     * 表单重置
     */
    resetForm() {
        this.$refs['userForm'].resetFields();
    },

    /**
     * 获取数据
     */
    getUserInfo(){
      let _this = this;
      console.log(this.updateId);
      if("修改企业人员名单" === this.title && null != this.updateId){
        let id = this.updateId;
        workerService.getUserById(id, res => {
            console.log(res);
            _this.userForm = res.user;
        });
      }   
    },

    save() {
      let _this = this;
      this.$refs['userForm'].validate((valid) => {
        if (!valid) {
            return;
        }

        let userInfo = {
          id: _this.userForm.id,
          name: _this.userForm.name,
          duty: _this.userForm.duty,
          position: _this.userForm.position,
          idcard: _this.userForm.idcard,
          cellphone: this.userForm.cellphone,
          phone: _this.userForm.cellphone,
        }

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          if("添加企业人员名单" === _this.title){
            workerService.addUser2(userInfo, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
              // _this.resetForm();
            });
          }
          if("修改企业人员名单" === _this.title){
            workerService.updateUserById(userInfo, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
              // _this.resetForm();
            });
          }      
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          // this.resetForm();
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
#e_useredit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
