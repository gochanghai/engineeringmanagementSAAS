<template>
  <div id="e_spaceedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="22%" :before-close="handleClose">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form" size="small">
        <el-form-item label="种类" prop="type">
          <el-input v-model="form.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" clearable></el-input>
        </el-form-item>
        <el-form-item label="具体位置" prop="location">
          <el-input v-model="form.location" clearable></el-input>
        </el-form-item>
        <el-form-item label="危险有害因素" prop="harmful">
          <el-input v-model="form.harmful" clearable></el-input>
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
        id: '',
        type: '',
        number: '',
        location: '',
        harmful: '',
        worker_num: ''
      },
      rules: {
        type: [
          { required: true, message: '种类不能为空', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ],
        harmful: [
          { required: true, message: '具体位置不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '危险有害因素不能为空', trigger: 'blur' },
          // { validator: checkidcard, trigger: 'blur' }
        ],
        worker_num: [
          { required: true, message: '作业人数不能为空', trigger: 'blur' },
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
      if("修改有限空间基本信息" === this.title && null != this.updateId){
        let id = this.updateId;
        specialInfoService.getLtdSpaceById(id, res => {
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

        let space = {
          type: this.form.type,
          number: this.form.number,
          location: this.form.location,
          harmful: this.form.harmful,
          worker_num: this.form.worker_num,
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          if("添加有限空间基本信息" === _this.title){
            specialInfoService.addLtdSpace(space, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
            });
          }
          if("修改有限空间基本信息" === _this.title){
            space.id = this.form.id;
            specialInfoService.updateLtdSpaceById(space, res => {
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
#e_spaceedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
