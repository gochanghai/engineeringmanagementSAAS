<template>
  <div id="e_emergencyedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="20%" :before-close="handleClose">
      <el-form label-width="110px" :model="emergencyeditForm" ref="emergencyeditForm" :rules="rules" size="small">
        <el-form-item label="专业分工" prop="division">
          <el-input v-model="emergencyeditForm.division" clearable></el-input>
        </el-form-item>
        <el-form-item label="应急指挥职务" prop="command">
          <el-select v-model="emergencyeditForm.command" placeholder="请选择" style="width: 100%">
            <el-option v-for="(item,index) in commandList" :value="item" :key="index" :label="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="emergencyeditForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="行政职务" prop="position">
          <el-select v-model="emergencyeditForm.position" placeholder="请选择" style="width: 100%">
            <el-option v-for="(item,index) in positionList" :value="item" :key="index" :label="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="emergencyeditForm.phone" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

const emergencyManagerService = require('../../../service/emergencyManagerService.js');
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('联系方式不能为空'));
      } else {
        // 正则表达式校验
        var reg=/^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }
        callback();
      }
    };
    return {
      commandList: ["总经理","企业主任","安全员","员工"],
      positionList: ["总指挥","副总指挥","安全管理员","主要负责人","安全员组长","组员"],
      emergencyeditForm: {
        division: '',
        command: '',
        name: '',
        position: '',
        phone: '',
        id: ''
      },

      rules: {
        division: [
          { required: true, message: '专业分工不能为空', trigger: 'blur' }
        ],
        command: [
          { required: true, message: '应急指挥职务不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '行政职务不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    updateId: {
      type: Number,
      default: null
    }
  },

  watch: {
    isVisible: function(value){      
      if(value){
        console.log(value)
        this.getEmergencyInfo();
      }else{
        this.resetForm();
      }
      console.log("qwwee");
    }
  },

  methods: {
    /**
     * 表单重置
     */
    resetForm() {
        this.$refs['emergencyeditForm'].resetFields();
    },

    handleClose() {
      this.$emit('close', false);
    },

    /**
     * 获取数据
     */
    getEmergencyInfo(){
      let _this = this;
      if("修改应急救援人员" === this.title && null != this.updateId){
        let id = this.updateId;
        emergencyManagerService.getById(id, res => {
            console.log(res.emergency);
            _this.emergencyeditForm = res.emergency
        });
      }      
      
    },

    save() {
      let _this = this;
      this.$refs['emergencyeditForm'].validate((valid) => {
        if (!valid) {
            return;
        }

        let emergency = {
        id: this.emergencyeditForm.id,
        phone: this.emergencyeditForm.phone,
        position: this.emergencyeditForm.position,
        division: this.emergencyeditForm.division,
        name: this.emergencyeditForm.name,
        command: this.emergencyeditForm.command,
        }

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 判断添加还是更新
          if("添加应急救援人员" === this.title){
            emergencyManagerService.add(emergency, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
            });
          }

          if("修改应急救援人员" === this.title){
            emergencyManagerService.updateById(emergency, res =>{
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
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
<style>
#e_emergencyedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
