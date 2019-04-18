<template>
  <div id="e_workmanager">
    <div class="aside">
      <div class="work-list">
        <label v-for="(item, index) in workType" :key="index" @click="getListData(item)" :class="[workIndex==item?'active':'']">
          {{item}}</label>
      </div>
    </div>
    <div class="content">
      <div class="search-top operation-top">
        <div class="search">
          <el-input size="small" placeholder="企业名称" v-model="searchForm" clearable class="search-input" clearable></el-input>
          <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
        </div>
        <div class="operation">
          <el-button type="text" icon="el-icon-refresh" @click="getListData('全部')">刷新</el-button>
        </div>
      </div>
      <div class="tabelData">
        <el-table :data="workList" height="100%" style="flex: 1;">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" label="序号">
          </el-table-column>
          <el-table-column prop="status" label="状态">
          </el-table-column>
          <el-table-column prop="name" label="危险源">
          </el-table-column>
          <el-table-column prop="name" label="作业名称">
          </el-table-column>
          <el-table-column prop="work_date" label="作业时间">
          </el-table-column>
          <el-table-column prop="work_place_text" label="作业地点">
          </el-table-column>
          <el-table-column prop="operator_names" label="现场工作人员">
          </el-table-column>
          <el-table-column prop="supervisor" label="现场监护人">
          </el-table-column>
          <el-table-column prop="supervisor" label="告警措施">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="findWorkDeatils(scope.row.workid)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination background :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" class="paging-detail">
        </el-pagination>
      </div>
    </div>
    <work-detail @close="isVisible=false" :isVisible="isVisible" :detailId="detailId"></work-detail>
  </div>
</template>
<script>
import workDetail from '../e_workmanager/module/e_workdetail.vue'

const workService = require('../../service/workService.js');
export default {
  data() {
    return {
      isVisible: false,
      workIndex: '全部',
      searchForm: '',
      workType: ["全部", "待审批", "审批不通过", "审批通过", "待作业", "作业中", "已完成"],
      pageTotal: 0,
      workList: [],
      detailId: null,
    }
  },
  created() {
    this.getListData("全部");
  },
  components: {
    workDetail
  },
  methods: {

    /**
     * 获取历史作业列表数据
     */
    getListData(status) {
      this.workIndex = status;
      let _this = this;
      if ("全部" == status) {
        workService.list(res => {
          console.log(res);
          _this.workList = res.list;
          _this.pageTotal = res.list.length;
        });
      } else {
        workService.listByStatus(status, res => {
          console.log(res);
          _this.workList = res.list;
          _this.pageTotal = res.list.length;
        });
      }

    },
    /**
     * 详情按钮
     */
    findWorkDeatils(id) {
      this.isVisible = true;
      this.detailId = id;
    },
    /**
     * 删除
     */
    del(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        workService.deleteById(id, res => {
          if (1 == res.code) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getListData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
  }
}

</script>
<style scoped>
#e_workmanager {
  position: absolute;
  width: calc(100% - 260px);
  height: calc(100% - 50px);
  left: 260px;
  top: 50px;
  display: flex;
}

.aside {
  z-index: 99;
  position: fixed;
  left: 0;
  height: 100%;
  padding-top: 15px;
  width: 260px;
  text-align: center;
  background-color: #fff;
}

.work-list label {
  display: block;
  line-height: 38px;
  color: #555;
  font-size: 15px;
  cursor: pointer;
  border-right: 3px solid #fff;
}

.work-list label.active {
  background-color: #D4E9FF;
  color: #1B88F5;
  border-right: 3px solid #56A5F4;
}

.content {
  margin: 15px;
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.operation {
  position: relative;
  width: 55px;
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
#e_workmanager .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_workmanager .search /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-radius: 0;
}

</style>
