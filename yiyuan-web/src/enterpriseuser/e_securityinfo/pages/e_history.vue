<template>
  <div id="e_history">
    <div class="list">
      <div class="title">
        <span>我收到的安全信息</span>
        <el-button
          size="small"
          style="background-color:#007ED7;color:#fff"
          class="release"
          @click="isVisible=true"
        >发布</el-button>
      </div>
      <div class="data-list">
        <div class="for-item" v-for="(item,index) in listInfo" :key="index" @click="enterDetail(item.rel_no)">
          <div class="title-item">
            {{item.title}}
            <span>深圳市龙岗区 &nbsp;{{item.create_time}}</span>
          </div>
          <div class="context">{{item.content}}</div>
        </div>
      </div>
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

    <release-edit :isVisible="isVisible" @close="isVisible=false"></release-edit>
  </div>
</template>
<script>
import releaseEdit from "../pages/e_releaseedit";

const securityInfoService = require('../../../service/securityInfoService.js');
export default {
  data() {
    return {
      isVisible: false,
      listInfo: [],
      pageTotal: 0,
    };
  },
  created(){
    this.getListData();
  },
  components: {
    releaseEdit
  },
  methods: {
    enterDetail(id) {
      this.$router.push("/e_securityinfo/e_releasedetail?rel_no="+ id);
    },

    /**
     * 获取列表数据
     */
    getListData() {
      let _this = this;
      securityInfoService.listHistory(res => {
        console.log(res);
        if (1 == res.code) {
          _this.listInfo = res.list;
          _this.pageTotal = res.list.length;
        }
        console.log(_this.list);
      });      
    },
  }
};
</script>
<style scoped>
#e_history {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.list {
  padding: 0 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  padding-bottom: 10px;
  position: relative;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}

.title span {
  display: block;
  margin-top: 40px;
  font-size: 18px;
  color: #555;
}

.data-list {
  flex: 1;
  overflow: auto;
}

.for-item {
  padding-bottom: 14px;
  border-bottom: 1px solid #ccc;
}

.for-item div.title-item {
  padding-top: 10px;
  color: #202020;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  line-height: 28px;
}

.for-item div.context {
  color: #555;
  font-size: 14px;
  cursor: pointer;
}

.for-item div.context:hover {
  color: #000;
}

.release {
  margin-top: -46px;
  margin-right: 90px;
  float: right;
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