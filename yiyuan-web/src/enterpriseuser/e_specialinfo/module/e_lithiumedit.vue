<template>
  <div id="e_lithiumedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="22%" :before-close="handleClose">
      <el-form label-width="110px" :model="form" :rules="rules" ref="form" size="small">
        <el-form-item label="生产/存储场所" prop="place">
          <el-input v-model="form.place" clearable></el-input>
        </el-form-item>
        <el-form-item label="安全隐患描述" prop="danger">
          <el-input v-model="form.danger" clearable></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="property">
          <el-input v-model="form.property" clearable></el-input>
        </el-form-item>
        <el-form-item label="产生原因" prop="product_reason">
          <el-input v-model="form.product_reason" clearable></el-input>
        </el-form-item>
        <el-form-item label="历史记录" prop="history_record">
          <el-input v-model="form.history_record" clearable></el-input>
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
        place: '',
        danger: '',
        property: '',
        product_reason: '',
        history_record: ''
      },

      rules: {
        place: [
          { required: true, message: '生产/存储场所不能为空', trigger: 'blur' }
        ],
        danger: [
          { required: true, message: '安全隐患描述不能为空', trigger: 'blur' }
        ],
        property: [
          { required: true, message: '属性不能为空', trigger: 'blur' }
        ],
        product_reason: [
          { required: true, message: '产生原因不能为空', trigger: 'blur' }
        ],
        history_record: [
          { required: true, message: '历史记录不能为空', trigger: 'blur' },
          // { validator: checkPhone, trigger: 'blur' }
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
      if("修改添加锂电池生产/存储场所信息" === this.title && null != this.updateId){
        let id = this.updateId;
        specialInfoService.getBatteryById(id, res => {
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

        let battery = {
          place: this.form.place,
          property: this.form.property,
          product_reason: this.form.product_reason,
          danger: this.form.danger,
          history_record: this.form.history_record,
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          if("添加添加锂电池生产/存储场所信息" === _this.title){
            specialInfoService.addBattery(battery, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
            });
          }
          if("修改添加锂电池生产/存储场所信息" === _this.title){
            battery.id = this.form.id;
            specialInfoService.updateBatteryById(battery, res => {
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
#e_lithiumedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
