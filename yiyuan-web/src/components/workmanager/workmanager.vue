<template>
  <div id="workmanager">
    <div class="top-nav">
      <span v-for="(nav,index) in navList" :key="index" @click="select(index,nav)">
        {{nav}}
        <label class="active" v-show="navIndex==index"></label>
      </span>
    </div>
    <div class="main">
      <div class="search-top operation-top">
        <div class="search">
          <el-input
            size="small"
            placeholder="企业名称"
            v-model="searchForm"
            clearable
            class="search-input"
          ></el-input>
          <el-button size="small" class="search-btn" icon="el-icon-search"></el-button>
        </div>
        <div class="operation">
          <el-button type="text" icon="el-icon-refresh" @click="getListData('全部')">刷新</el-button>
        </div>
      </div>
      <div class="tabelData">
        <el-table :data="workList">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="name" label="作业名称"></el-table-column>
          <el-table-column prop="work_date" label="作业时间"></el-table-column>
          <el-table-column prop="work_place_text" label="作业地点"></el-table-column>
          <el-table-column prop="operator_names" label="现场工作人员"></el-table-column>
          <el-table-column prop="supervisor" label="现场监护人"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="selDetail(scope.row.workid)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          background
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          class="paging-detail"
        ></el-pagination>
      </div>
    </div>
    <work-detail
      title="有限空间作业"
      :isVisible="isVisible"
      @close="isVisible=false"
      :detailId="detailId"
    />
  </div>
</template>
<script>
import workDetail from "../workmanager/module/workdetail.vue";

const workService = require("../../service/workService.js");
export default {
  data() {
    return {
      navIndex: 0,
      isVisible: false,
      searchForm: "",
      pageTotal: 0,
      workList: [],
      navList: ["全部", "进行中", "已完成"],
      detailId: null,
      status: "全部",
    };
  },
  created() {
    this.getListData(this.companyId, "全部");
  },
  components: {
    workDetail
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
      this.getListData(val, this.status);
    }    
  },
  methods: {
    /**
     * 获取历史作业列表数据
     */
    getListData(id, status) {      
      let _this = this;
      if ("全部" == status) {
        workService.listByCompanyId(id, res => {
          console.log(res);
          _this.workList = res.list;
        });
      } else {
        if ("进行中" === status) {
          status = "作业中";
        }
        workService.listByCompanyIdAndStatus(id, status, res => {
          console.log(res);
          _this.workList = res.list;
          _this.pageTotal = res.list.length;
        });
      }
    },

    deleteUser() {},

    select(index, item) {
      this.navIndex = index;
      this.status = item;
      this.getListData(this.companyId, item);
    },

    selDetail(id) {
      this.isVisible = true;
      this.detailId = id;
    }
  }
};
</script>
<style scoped>
#workmanager {
  padding: 0 0px;
  display: flex;
  flex-direction: column;
}

.top-nav {
  margin-bottom: 15px;
}

.main {
  padding: 0 20px;
  background-color: #fff;
}

.top-nav span {
  margin-left: 6px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  color: #202020;
}

.top-nav span label.active {
  margin: 2px auto;
  display: block;
  width: 100%;
  height: 2px;
  background-color: #007ed7;
  border-radius: 6px;
}

.operation {
  position: relative;
  width: 55px;
  display: flex;
  justify-content: space-between;
}

.operation span {
  color: #1b88f5;
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
  border-bottom: 1px solid #ccc;
}

.search {
  align-items: center;
  display: flex;
}

.search-input {
  width: 210px;
}

.search-btn {
  background-color: #007ed7;
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
#workmanager .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#workmanager .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>
