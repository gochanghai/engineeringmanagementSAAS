<template>
  <div id="regionedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="20%" :before-close="handleClose">
      <el-form label-width="76px" label-position="left" size="small" :model="form" style="flex: 1">
        <el-form-item label="所属区域" prop="ascription">
          <el-input v-model="form.ascription" clearable placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" prop="name">
          <el-input type="password" v-model="form.name" clearable placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="medium" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        ascription: "",
        name: "",
      }
    }
  },

  props: {
    title: {
      type: String,
      default: ""
    },

    isVisible: {
      typeL: Boolean,
      default: false
    }
  },

  methods: {
    handleClose() {
      this.$emit('close', false);
    },

    confirm() {
      this.$confirm('确认提交信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.handleClose();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
        this.handleClose();
      });
    }
  }
}

</script>
<style scoped>
</style>
<style>
#regionedit /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #CCC !important;
  border-radius: 0;
}

</style>
