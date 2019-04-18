<template>
  <div id="e_upload">
    <el-dialog title="上传视频" :visible.sync="isVisible" width="20%" :before-close="handleClose">
      <el-form
        label-width="78px"
        label-position="left"
        size="small"
        style="flex: 1"
      >
        <el-form-item label="上传" prop="upload">
          <div class="file">
            <el-upload ref="upload" :auto-upload="false" :action="uploadAction" :data="uploadFileData" :limit="1" :on-success="uploadRes" :before-upload="beforeUpload">
              <i class="el-icon-plus upload-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="修改名称" prop="name">
          <el-input v-model="uploadFileData.newname" clearable placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const securitytrainingService = require('../../../service/securitytrainingService.js');
const util = require('../../../service/utils/util.js');
export default {
  data() {
    return {
      uploadAction: "/api/file/upload/security_train_file/200/",
      fileType: "video/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "security_train_file",
        belongidlist: "video",
        workid: localStorage.getItem("groupid"),
        filebelong: "安全培训",
        platform: "PCW",
        newname: "",
      }
    };
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      this.$emit("close", false);
    },

    /**
     * 文件上传前处理函数
     */
    beforeUpload(file){
      let type = util.fileMatchType(file.name)
      this.uploadFileData.filebelong = "安全培训_" + type;
      this.uploadFileData.newname = file.name;
      console.log(file);
      console.log(file.name);
      console.log(type);      
    },

    /**
     * 上传结果
     */
    uploadRes(res, file, fileList){
      let _this = this;
      console.log(res);
      if(res.code == 1 && "上传成功" == res.reason){
        this.$notify.success({ title: '提示', message: '上传成功', duration: 2000 });
        setTimeout(function(){
          _this.handleClose();
          _this.$emit('clickName', true);
        },1000);
      }else {
        this.$notify.error({ title: '上传失败', message: '错误', duration: 2000 });
      }
    },

    save(){
      this.$refs.upload.submit();
    }
  }
};
</script>
<style scoped>
.file {
  border: 1px solid #ccc;
  height: 120px;
  line-height: 130px;
  text-align: center;
}
.upload-icon {
  font-size: 44px;
  color: #666;
}
</style>
<style>
#e_upload /deep/ .el-input__inner {
  border: none !important;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0;
}
</style>
