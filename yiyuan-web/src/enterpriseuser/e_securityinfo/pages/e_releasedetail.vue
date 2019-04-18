<template>
  <div id="e_releasedetail">
    <div class="title">
      <span>{{info.title}}</span>
      <span>{{info.create_time}}</span>
    </div>
    <div class="detail">{{info.content}}</div>
    <div class="file">
      <label>附件</label>
      <div>
        <!-- <a href="#" @click.prevent>565464643.pdf</a> -->
        <img v-for="(item, index) in fileList" :key="index" :src="item.thumb" height="100px" width="200px" />
      </div>
    </div>
    <div class="delete" v-show="info.delete_flag === 0">
      <el-button type="danger" plain size="small" @click="deleteItem">删 除</el-button>
    </div>
  </div>
</template>
<script>

const securityInfoService = require('../../../service/securityInfoService.js');
export default {
  data() {
    return {
      info: {
        rel_no:"",
        title: "",
        content: "",
        create_time: "" ,
        delete_flag: 1,       
      },
      fileList: [],
    };
  },
  created(){
    this.getListData();
  },
  methods: {
    goback() {
      this.$router.back(-1);      
    },
    /**
     * 获取数据
     */
    getListData() {
      let _this = this;
      let rel_no = this.$route.query.rel_no;
      securityInfoService.getInfoById(rel_no,res => {
        console.log(res);
        if (1 == res.code) {
          _this.info = res.data;
        }
        console.log(res);        
      });
      securityInfoService.listFileByRel_no(rel_no, res => {
        console.log(res);
        if (1 == res.code) {
          _this.fileList = res.list;
        }
        console.log(res);
      });
    },

    deleteItem() {
      let _this = this;
      let rel_no = this.info.rel_no;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        securityInfoService.deleteByRel_no(rel_no, res => {
          console.log(res);
          if (1 == res.code) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            _this.goback();
          }
          console.log(res);
        });          
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    }
  }
};
</script>
<style scoped>
#e_releasedetail {
  position: relative;
  padding: 0 50px;
  background-color: #fff;
}

.title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  position: relative;
  width: 70%;
  overflow: hidden;
}

.title span {
  display: block;
  margin-top: 40px;
  font-size: 15px;
  color: #555;
}

.detail {
  padding: 15px;
  width: calc(70% - 30px);
  background-color: #f2f4f6;
}

.file {
  margin-top: 13px;
}

.file label {
  font-size: 15px;
  color: #555;
}

.file div {
  margin-top: 6px;
}

.file div a {
  display: block;
  font-size: 14px;
  color: #1b88f5;
  line-height: 28px;
}

.delete {
  position: absolute;
  bottom: 50px;
}
</style>


