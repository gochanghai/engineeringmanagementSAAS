<template>
  <div id="e_devedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="22%" :before-close="handleClose">
      <el-form label-width="85px" :model="form" :rules="rules" ref="form" size="small">
        <el-form-item label="设备种类" prop="type">
          <el-input v-model="form.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="code">
          <el-input v-model="form.code" clearable></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" clearable></el-input>
        </el-form-item>
        <el-form-item label="场所" prop="place">
          <el-input v-model="form.place" clearable></el-input>
        </el-form-item>
        <el-form-item label="作业人数" prop="worker_num">
          <el-input v-model="form.worker_num" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

const specialInfoService = require('../../../service/specialInfoService.js');
export default {
  data() {
    return {
      form: {
        type: '',
        name: '',
        code: '',
        number: '',
        place: '',
        worker_num: ''
      },

      rules: {
        type: [
          { required: true, message: '粉尘类型不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '车间名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '车间面积不能为空', trigger: 'blur' }
        ],
        worker_num: [
          { required: true, message: '作业人数不能为空', trigger: 'blur' },
          // { validator: checkPhone, trigger: 'blur' }
        ],
        place: [
          { required: true, message: '车间名称不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '车间面积不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  props: {
    title: {
      type: String,
      default: ""
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
      // this.resetForm();
      if(value){
        console.log(value)
        this.getData();
      }else{
        // 表单重置
        this.$refs['form'].resetFields();
      }
      console.log("form");
    }
  },

  methods: {
    handleClose() {
      this.$emit('close', false);
    },

    /**
     * 获取数据
     */
    getData(){
      let _this = this;
      console.log(this.updateId);
      if("修改特种设备基本信息" === this.title && null != this.updateId){
        let id = this.updateId;
        specialInfoService.getEquipmentById(id, res => {
            console.log(res);
            _this.form = res.data;
        });
      }   
    },

    save() {
      let _this = this;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
            return;
        }

        let equipment = {
          type: this.form.type,
          number: this.form.number,
          name: this.form.name,
          worker_num: this.form.worker_num,
          code: this.form.code,
          place: this.form.place,
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          if("添加特种设备基本信息" === _this.title){
            specialInfoService.addEquipment(equipment, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
            });
          }
          if("修改特种设备基本信息" === _this.title){
            equipment.id = this.form.id;
            specialInfoService.updateEquipmentById(equipment, res => {
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
#e_devedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
