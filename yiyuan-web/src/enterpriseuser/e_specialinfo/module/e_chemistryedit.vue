<template>
  <div id="e_chemistryedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="22%" :before-close="handleClose">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form" size="small">
        <el-form-item label="类别" prop="type">
          <el-input v-model="form.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="危险化学名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="危险性分类" prop="classify">
          <el-input v-model="form.classify" clearable></el-input>
        </el-form-item>
        <el-form-item label="储存数量" prop="number">
          <el-input v-model="form.number" clearable></el-input>
        </el-form-item>
        <el-form-item label="存放位置" prop="location">
          <el-input v-model="form.location" clearable></el-input>
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
        classify: '',
        number: '',
        location: '',
        id: ''
      },
      rules: {
        type: [
          { required: true, message: '类别不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '危险化学名称不能为空', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '危险性分类不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '储存数量不能为空', trigger: 'blur' },
          // { validator: checkPhone, trigger: 'blur' }
        ],
        location: [
          { required: true, message: '存放位置不能为空', trigger: 'blur' },
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
      if("修改危险化学品基本信息" === this.title && null != this.updateId){
        let id = this.updateId;
        specialInfoService.getChemicalById(id, res => {
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

        let chemistry = {
          type: this.form.type,
          number: this.form.number,
          name: this.form.name,
          location: this.form.location,
          classify: this.form.classify,
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          if("添加危险化学品基本信息" === _this.title){
            specialInfoService.addChemical(chemistry, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
            });
          }
          if("修改危险化学品基本信息" === _this.title){
            chemistry.id = this.form.id;
            specialInfoService.updateChemicalById(chemistry, res => {
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
#e_chemistryedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
