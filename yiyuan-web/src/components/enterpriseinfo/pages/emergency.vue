<template>
  <div id="emergency">
    <div class="search-top operation-top">
      <div class="search">
        <el-input size="small" placeholder="企业名称" v-model="searchForm" clearable class="search-input" clearable></el-input>
        <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
      </div>
      <div class="operation">
        <el-button type="text" icon="el-icon-refresh" @click="getListData">刷新</el-button>
        <el-button type="text" icon="el-icon-download" @click="download">应急预案</el-button>
      </div>
    </div>
    <div class="tabelData">
      <el-table :data="emergencyList">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="division" label="专业分工">
        </el-table-column>
        <el-table-column prop="command" label="应急指挥职务">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="position" label="行政职务">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" class="paging-detail">
      </el-pagination>
    </div>
  </div>
</template>
<script>

const emergencyManagementService = require('../../../service/emergencyManagerService.js');
const fileService = require('../../../service/fileService.js');
export default {
  data() {
    return {
      searchForm: "",
      pageTotal: 0,
      emergencyList: [],
      planFile: null,
    }
  },
  created() {
    this.getListData(this.companyId);
  },
  props: {
    // 获取值
    companyId: {
      type: String,
      default: null
    }
  },
  watch: {
    companyId(val) {
      this.getListData(val);
    }    
  },
  methods: {
    useredit() {

    },

    /**
     * 获取应急管理列表数据
     */
    getListData(id) {
      let _this = this;
      emergencyManagementService.listBycompanyId(id,res => {
        console.log(res);
        _this.emergencyList = res.list;
        _this.pageTotal = res.list.length;
      });
      this.getFile();
    },

    /**
     * 获取安全培训数据
     */
    getFile() {      
      let _this = this;
      fileService.getSingleFile("emergency_plan",100,res => {
        console.log(res);
        if(res.file != null){
          _this.planFile = res.file;
        }        
        console.log(res.file.filebelong);
      });
    },

    /**
     * 下载处理函数
     */
    download(){
      if(this.planFile === null){
        this.$message({
          type: "info",
          message: "文件不存在"
        });
        return ;
      }
      fileService.downloadFile(this.planFile, res => {
        console.log("fileDownload");
      })
    },
  }
}

</script>
<style scoped>
#emergency {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.select {
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.select:last-child {
  padding-right: 0;
}

.select:hover {
  cursor: pointer;
}

.operation {
  position: relative;
  width: 135px;
  display: flex;
  justify-content: space-between;
}

.operation span {
  color: #1B88F5;
  font-size: 14px;
}

.operation img {
  width: 17px;
  height: 17px;
  margin-right: 5px;
}

.search-top {
  height: 70px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #CCC;
}

.search {
  align-items: center;
  display: flex;
}

.search-input {
  width: 210px;
}

.search-btn {
  background-color: #007ED7;
  color: #fff;
}

.tabelData {
  width: 100%;
  display: flex;
  flex: 1;
}

.paging {
  text-align: center;
  display: flex;
  align-items: center;
  height: 80px;
}

.paging-detail {
  width: 100%;
}

</style>
<style>
#emergency .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#emergency .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
