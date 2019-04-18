<template>
  <div id="e_releaseedit">
    <el-dialog :title="title" :visible.sync="isVisible" width="22%" :before-close="handleClose">
      <el-form label-width="55px" :model="form" :rules="rules" ref="form" status-icon size="small">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" clearable type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="上传">
          <!-- <div class="upload-file">
            <el-upload class="avatar-uploader" :action="uploadAction" :data="uploadFileData" list-type="picture-card" :limit="4" accept="image/gif, image/jpeg, image/png">
              <div class="item" v-for="(item, index) in form.file" :key="index">
                <i class="el-icon-upload"></i>
                <img src alt>
              </div>
            </el-upload>
          </div> -->
          <div class="upload-file" v-if="form.file.length ==4?false:true">
            <el-upload class="avatar-uploader" ref="upload" :action="uploadAction" :data="uploadFileData" :auto-upload="false" :limit="4" accept="image/gif, image/jpeg, image/png">
              <div class="item">
                <i class="el-icon-upload"></i>
                <img src alt>
              </div>
            </el-upload>
          </div>
          
        </el-form-item>
        <div class="tips">最多上传四张</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="save">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>


const securityInfoService = require('../../../service/securityInfoService.js');
export default {
  data() {
    return {
      form: {
        rel_no:"",
        title: "",
        content: "",
        file: []
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },

      uploadAction: "/api/file/upload/security_info/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "special_info",
        workid: localStorage.getItem("groupid"),
        filebelong: "安全信息发布",
        platform: "PCW",
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "发布安全信息"
    },

    isVisible: {
      type: Boolean,
      default: false
    }
  },

  watch:{
    isVisible: function(value){
      if(value){
        let no = new Date().getTime();
        this.form.rel_no = no;
        this.uploadAction = "/api/file/upload/security_info/" + no + "/";
      }else{
        this.$refs['form'].resetFields();
        this.form.rel_no = "";
      }
    },
  },

  methods: {
    handleClose() {
      this.$emit("close");
    },

    save() {
      let _this = this;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
            return;
        }

        let info = {
          title: this.form.title,
          content: this.form.content,
          rel_no: this.form.rel_no,
        };

        this.$confirm('确认提交信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 判断添加还是更新
          this.$refs.upload.submit();
          if(this.title === "发布安全信息"){
            securityInfoService.add(info, res => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '发布成功!'
              });
              this.handleClose();
              _this.$emit('clickName', true);
              this.$refs.upload.clearFiles();
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
};
</script>

<style scoped>
.upload-file {
}

.upload-file div.item {
  text-align: center;
  width: 68px;
  height: 68px;
  line-height: 68px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.avatar-uploader {
  float: left;
  margin-right: 10px;
}

.avatar-uploader:first-child{
  margin-right: 0;
}

.upload-file div.item i {
  font-size: 20px;
}

.tips{
  margin-top: -10px;
  margin-left: 40px;
  font-size: 13px;
  color: #AAA;
}

</style>
<style>
#e_releaseedit /deep/ .el-input__inner {
  border: none !important;
  border: 1px solid #ccc !important;
  border-radius: 0;
}

#e_releaseedit /deep/ .el-textarea__inner {
  border: none !important;
  border: 1px solid #ccc !important;
  border-radius: 0;
}
</style>

