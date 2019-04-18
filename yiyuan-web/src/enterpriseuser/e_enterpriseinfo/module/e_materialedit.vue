<template>
  <div id="e_materialedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="20%" :before-close="handleClose">
      <el-form label-width="80px" :model="materialeditForm" :rules="rules" ref="materialeditForm" size="small">
        <el-form-item label="器材名称" prop="name">
          <el-input v-model="materialeditForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="型号规格" prop="model">
          <el-input v-model="materialeditForm.model" clearable></el-input>
        </el-form-item>
        <el-form-item label="存放位置" prop="location">
          <el-input v-model="materialeditForm.location" clearable></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="materialeditForm.number" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="materialeditForm.status" clearable></el-input>
        </el-form-item>
        <el-form-item label="责任人" prop="person">
          <el-input v-model="materialeditForm.person" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="materialeditForm.phone" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

const equipmentService = require('../../../service/equipmentService.js');
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
    var checknumber = (rule, value, callback) => {
      // 正则表达式校验
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
      if(!reg.test(value)){
        callback(new Error('只能是数字'));
      }
      if (value < 0) {
        callback(new Error('数量不能小于0'));
      }
      callback(); 
    }
    return {
      materialeditForm: {
        id: '',
        name: '',
        model: '',
        location: '',
        number: '',
        status: '',
        person: '',
        phone: ''
      },
      rules: {
        number: [
          { required: true, message: '数量不能为空', trigger: 'blur' },
          { validator: checknumber, trigger: 'blur' }
        ],
        model: [
          { required: true, message: '型号规格不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '器材名称不能为空', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '存放位置不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        person: [
          { required: true, message: '责任人不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' },
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
    },
  },
  watch: {
    isVisible: function(value){      
      if(value){
        console.log(value)
        this.getMaterialInfo();
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
        this.$refs['materialeditForm'].resetFields();
    },

    handleClose() {
      this.$emit('close', false);
    },

    /**
     * 编辑则获取数据
     */
    getMaterialInfo(){
      console.log(this.updateId);
      let _this = this;
      if("修改设备器材" === this.title &&  null != this.updateId){
        equipmentService.getById(this.updateId, res => {
          console.log(res.equipment);
          _this.materialeditForm = res.equipment;
        });
      }
    },


    /**
     * 保存数据
     */
    save() {
      let _this = this;
      this.$refs['materialeditForm'].validate((valid) => {
        if (!valid) {
            return;
        }

        let materialedit = {
        id: this.materialeditForm.id,
        name: this.materialeditForm.name,
        model: this.materialeditForm.model,
        location: this.materialeditForm.location,
        number: this.materialeditForm.number,
        status: this.materialeditForm.status,
        person: this.materialeditForm.person,
        phone: this.materialeditForm.phone,
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          if("添加设备器材" === this.title){
            equipmentService.add(materialedit, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
            });
          }
          if("修改设备器材" === this.title){
            equipmentService.updateById(materialedit, res => {
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
#e_materialedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>