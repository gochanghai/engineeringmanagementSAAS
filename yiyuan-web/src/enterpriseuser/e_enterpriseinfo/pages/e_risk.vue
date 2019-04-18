<template>
  <div id="e_risk">
    <div class="top-nav">
      <div>
        <span v-for="(item, index) in filterList" :key="index" @click="select(index, item)">
          {{item.name}}
          <label :class="[filterIndex==index?'active':'']"></label>
        </span>
      </div>
      <div class="radio">
        <el-radio-group v-model="radioValue" size="mini">
          <el-radio-button label="open">展开</el-radio-button>
          <el-radio-button label="retract">收起</el-radio-button>
        </el-radio-group>
      </div>
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
          <el-button type="text" icon="el-icon-refresh" @click="getListData(riskType)">刷新</el-button>
          <el-upload :action="uploadAction" :data="uploadFileData" :show-file-list="false" :on-success="uploadRes">
            <el-button type="text" icon="el-icon-upload">上传</el-button>
          </el-upload>
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="edit('add')">添加</el-button>
          <el-button
            type="text"
            icon="el-icon-picture-outline"
            @mouseover.native="isPreview=true"
            @mouseout.native="isPreview=false"
          >{{riskType}}操作</el-button>
        </div>
      </div>
      <div class="tabelData">
        <el-table :data="riskList" height="100%" style="flex:1">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="level" label="风险等级">
            <template slot-scope="scope">
              <span :style="{backgroundColor:scope.row.color}" class="bg-color">{{scope.row.level}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="危险源"></el-table-column>
          <el-table-column prop="risk" label="安全风险"></el-table-column>
          <el-table-column prop="damage" label="可能造成伤害"></el-table-column>
          <el-table-column prop="l" label="L"></el-table-column>
          <el-table-column prop="e" label="E"></el-table-column>
          <el-table-column prop="c" label="C"></el-table-column>
          <el-table-column prop="d" label="D"></el-table-column>
          <el-table-column prop="plan" label="预防措施"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit('edit',scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="deleteRisks(scope.row.id)">删除</el-button>
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
    <!-- 详情信息弹框 -->
    <transition name="slide">
      <div v-show="radioValue=='open'" class="detail-dialog">
        <div class="row">
          <div class="row-item1 current-item">
            <label class="top-title">
              发生事故的可能性
              <span style="color: #E90404;">(L)</span>
            </label>
            <div class="content table">
              <div>
                <span class="title number">分数值</span>
                <label class="title values">事故发生的可能性</label>
              </div>
              <div>
                <span>10</span>
                <label>完全可以预料</label>
              </div>
              <div>
                <span>6</span>
                <label>相当可能</label>
              </div>
              <div>
                <span>3</span>
                <label>可能，但不经常</label>
              </div>
              <div>
                <span>1</span>
                <label>可能性小</label>
              </div>
              <div>
                <span>0.5</span>
                <label>很不可能</label>
              </div>
              <div>
                <span>0.1</span>
                <label>及不可能</label>
              </div>
            </div>
          </div>
          <div class="row-item2 current-item">
            <label class="top-title">
              人员暴露的频繁程度
              <span style="color: #E90404;">(E)</span>
            </label>
            <div class="content table">
              <div>
                <span class="title number">分数值</span>
                <label class="title values">事故发生的可能性</label>
              </div>
              <div>
                <span>10</span>
                <label>连续暴露</label>
              </div>
              <div>
                <span>6</span>
                <label>每天工作事件暴露</label>
              </div>
              <div>
                <span>3</span>
                <label>每月一次暴露</label>
              </div>
              <div>
                <span>1</span>
                <label>每年几次暴露</label>
              </div>
              <div>
                <span>0.5</span>
                <label>非常罕见暴露</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-item3 current-item" style="padding-top: 15px;">
            <label class="top-title">
              发生事故后果的严重性
              <span style="color: #E90404;">(C)</span>
            </label>
            <div class="content table">
              <div>
                <span class="title number">分数值</span>
                <label class="title values">事故发生的可能性</label>
              </div>
              <div>
                <span>100</span>
                <label>10人以上死亡</label>
              </div>
              <div>
                <span>40</span>
                <label>3~9人死亡</label>
              </div>
              <div>
                <span>15</span>
                <label>1~2人死亡</label>
              </div>
              <div>
                <span>7</span>
                <label>严重</label>
              </div>
              <div>
                <span>3</span>
                <label>重大，伤残</label>
              </div>
              <div>
                <span>1</span>
                <label>引起注意</label>
              </div>
            </div>
          </div>
          <div class="row-item4 current-item" style="padding-top: 15px;">
            <label class="top-title">
              风险等级判断表
              <span style="color: #E90404;">(D)</span>
            </label>
            <div class="content table">
              <div>
                <span class="title number" style="width: 140px;">分数值</span>
                <span class="title number" style="width: 140px;">风险程度</span>
                <label class="title values" style="width: 140px;">标志色</label>
              </div>
              <div>
                <span style="width: 170px;">>=720</span>
                <label>极高</label>
                <label>红色</label>
              </div>
              <div>
                <span style="width: 170px;">720>D>=240</span>
                <label>高</label>
                <label>橙色</label>
              </div>
              <div>
                <span style="width: 170px;">240>D>=150</span>
                <label>中等</label>
                <label>黄色</label>
              </div>
              <div>
                <span style="width: 170px;">70>D>=150</span>
                <label>低</label>
                <label>蓝色</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--     <risk-edit @close="isVisible=false" :title="titleEdit" :isVisible="isVisible" @clickName="getListData" :updateId="updateId" :riskType="riskType"></risk-edit>
    <risk-edit @close="isVisible=false" :title="titleEdit" :isVisible="isVisible" @clickName="getListData" :updateId="updateId" :riskType="riskType"></risk-edit>-->
    <risk-edit
      @close="isVisible=false"
      :title="titleEdit"
      :isVisible="isVisible"
      @clickName="getListDataByType"
      :updateId="updateId"
      :riskType="riskType"
    ></risk-edit>
    <!-- 架构图 -->
    <preview :see="isPreview" :top="128" :fileType="fileType"></preview>
  </div>
</template>
<script>
import riskEdit from "../module/e_riskedit.vue";
const riskIdentifyService = require("../../../service/riskIdentifyService.js");
export default {
  data() {
    return {
      titleEdit: "",
      isPreview: false,
      isVisible: false,
      radioValue: "retract",
      searchForm: "",
      filterIndex: 0,
      pageTotal: 400,
      riskList: [],
      filterList: [
        {name:"有限空间", id: 100},
        {name:"粉尘涉爆",id: 200},
        {name:"危险化学品",id: 300},
        {name:"其他",id: 400},
        {name:"涉氢",id: 500},
        {name:"锂电池",id: 600},
        {name:"特种设备",id: 700}
      ],
      riskType: "有限空间",      
      // 更新id
      updateId: null,
      fileType: "有限空间操作",
      uploadType: "100",
      uploadAction: "/api/file/upload/risk_identify_operate/100/",
      uploadFileData:{
        user: localStorage.getItem("username"),
        formname: "risk_identify_operate",
        workid: localStorage.getItem("groupid"),
        filebelong: "有限空间操作",
        platform: "PCW",
      }
    };
  },
  created() {
    this.getListData(this.riskType);
  },
  components: {
    riskEdit
  },
  methods: {
    /**
     * 分类获取数据
     */
    select(index, item) {
      [this.filterIndex, this.condition] = [index, item];
      this.riskType = item.name;
      this.uploadAction = "/api/file/upload/risk_identify_operate/"+ item.id + "/";
      this.fileType = item.name + "操作";
      this.uploadType = item.id;
      this.uploadFileData.filebelong = item.name + "操作";
      this.getListData(item.name);
    },

    edit(type, id) {
      if (type == "add") {
        this.titleEdit = "添加作业风险标识";
      } else {
        this.titleEdit = "修改作业风险标识";
      }
      this.updateId = id;
      this.isVisible = true;
    },

    getListDataByType() {
      this.getListData(this.riskType);
    },
    /**
     * 获取风险识别列表数据
     */
    getListData(type) {
      let _this = this;
      riskIdentifyService.list(type, res => {
        console.log(res);
        _this.riskList = res.list;
        _this.pageTotal = res.list.length;
      });
    },

    /**
     * 删除风险识别
     */
    deleteRisks(id) {
      let ids = id;
      let _this = this;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        riskIdentifyService.batchDeleteByIds(ids, res => {
          if (1 == res.code) {
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
            _this.getListData(this.riskType);
          } else {
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },

    /**
     * 上传结果
     */
    uploadRes(res, file, fileList){
      let _this = this;
      console.log(res);
      if(res.code == 1 && "上传成功" == res.reason){
        this.$notify.success({ title: '提示', message: '上传成功', duration: 2000 });
      }else {
        this.$notify.error({ title: '上传失败', message: '错误', duration: 2000 });
      }
    },
  }
};
</script>
<style scoped>
#e_risk {
  /*padding: 0 20px;*/
  display: flex;
  flex-direction: column;
  /*background-color: #fff;*/
}

.top-nav {
  margin-bottom: 10px;
}

.top-nav span {
  margin-left: 6px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  color: #202020;
}

.top-nav span label.active {
  margin: 2px auto;
  display: block;
  width: 42px;
  height: 2px;
  background-color: #007ed7;
  border-radius: 6px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
}

.main {
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

.operation {
  position: relative;
  width: 275px;
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

.detail-dialog {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
  top: 128px;
  right: 0;
  font-size: 14px;
  background-color: #fff;
  box-shadow: #c7c7c7 0px 0px 18px;
  z-index: 999;
}

.detail-dialog div.row:last-child {
  display: flex;
  justify-content: space-between;
  border-bottom: none;
}

.detail-dialog div.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.current-item {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  padding-bottom: 10px;
}

.current-item:last-child {
  margin-right: 0;
}

.row-item1,
.row-item3 {
  width: 290px;
  border-right: 1px solid #ccc;
}

.row-item2,
.row-item4 {
  width: 300px;
}

.current-item label.top-title {
  display: block;
  text-align: center;
  color: #555555;
  padding-bottom: 12px;
}

.current-item div.content div {
  width: 100%;
  line-height: 26px;
  display: flex;
  justify-content: space-around;
}

.current-item div.content div span {
  display: inline-block;
  text-align: center;
  width: 100px;
  color: #202020;
}

.current-item div.content div span.title,
.current-item div.content div label.title {
  color: #555555;
}

.current-item div.content div label {
  display: inline-block;
  text-align: center;
  width: 170px;
  color: #202020;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(15px);
  opacity: 0;
}

.bg-color {
  display: block;
  /* color:#fff; */
  width: 100%;
  text-align: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
<style>
#e_risk .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_risk .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}

.bg-color {
  display: block;
  /* color:#fff; */
  width: 100%;
  text-align: center;
}
</style>
