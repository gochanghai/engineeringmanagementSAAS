<template>
  <div id="workdetail">
    <el-dialog :title="title" :visible.sync="isVisible" width="34%" :before-close="handleClose">
      <div style="display: flex;">
        <div class="process" style="width: 18%">
          <div class="process-item" v-for="(item, index) in process" :key="index" :style="{color:isColor(item.status)}" @click="select(index)">
            <div class="line" :style="{backgroundColor:isColor(item.status)}"></div>
            <i class="el-icon-circle-check-outline" style="font-size: 16px;"></i>
            <span>{{item.label}}</span>
            <i class="el-icon-arrow-right" style="font-size: 16px;" v-show="selectIndex ==index"></i>
          </div>
        </div>
        <div class="view" style="width: 82%;height: 480px;overflow: auto;">
          <!-- 基本信息 -->
          <div class="right type-view" v-if="selectIndex == 0">
            <span class="span-title">基本信息</span>
            <div class="content">
              <div class="for-item data-item">
                <label>作业类型</label>
                {{workInfo.type}}
              </div>
              <div class="for-item data-item">
                <label>作业名称</label>
                {{workInfo.name}}
              </div>
              <div class="for-item data-item">
                <label>作业时间</label>
                {{workInfo.work_date}}
              </div>
              <div class="for-item data-item">
                <label>作业地址</label>
                {{workInfo.work_place_text}}
              </div>
              <div class="for-item data-item">
                <label>主要负责人</label>
                {{workapplyInfo.repname}}
              </div>
              <div class="for-item data-item">
                <label>安全管理人员</label>
                {{workapplyInfo.smname}}
              </div>
              <div class="for-item data-item">
                <label>现场监护人</label>
                {{workInfo.supervisor}}
              </div>
              <div class="for-item data-item">
                <label>作业人数(人)</label>
                {{workInfo.operator_names}}
              </div>
            </div>
            <span class="span-title" style="margin-top: 6px;">作业方案</span>
            <a href="#" class="file">{{file1.filename}}</a>
            <span class="span-title" style="margin-top: 16px;">应急方案</span>
            <a href="#" class="file">{{file2.filename}}</a>
          </div>
          <div class="right" v-else-if="selectIndex == 1">
            <span class="span-title">审批信息</span>
            <div class="for-item data-item">
              <label>审批人</label>
              {{approvalInfo.name}}
            </div>
            <div class="for-item data-item">
              <label>审批时间</label>
              {{approvalInfo.check_time}}
            </div>
            <div class="for-item data-item">
              <label>审批意见</label>
              {{approvalInfo.check_opinion}}
            </div>
          </div>
          <div class="right type-view3" v-else-if="selectIndex == 2">
            <div class="type-view3-item">
              <label>配置作业设置相关照片</label>
              <div>
                <img :src="item.thumb" v-for="(item, index) in applyFile.alist1" :key="index">
              </div>
                <!-- <a href="#" class="file" v-for="(item,index) in list1" :key="index">{{item.thumb}}</a> -->
              </div>
              <div class="type-view3-item">
                <label>作业劳动防护用品照片</label>
                <div>
                  <img :src="item.thumb" v-for="(item, index) in applyFile.alist4" :key="index">
                </div>
                  <!-- <a href="#" class="file" v-for="(item,index) in list2" :key="index">{{item.thumb}}</a> -->
                </div>
                <div class="type-view3-item">
                  <label>应急救援器材相关照片</label>
                  <div>
                    <img :src="item.thumb" v-for="(item, index) in applyFile.alist2" :key="index">
                  </div>
                    <!-- <a href="#" class="file" v-for="(item,index) in list3" :key="index">{{item.thumb}}</a> -->
                  </div>
                  <div class="type-view3-item">
                    <label>安全专项培训现场照片</label>
                    <div>
                      <img :src="item.thumb" v-for="(item, index) in applyFile.alist3" :key="index">
                    </div>
                      <!-- <a href="#" class="file" v-for="(item,index) in list4" :key="index">{{item.thumb}}</a> -->
                    </div>
                    <div class="type-view3-context">
                      <span class="span-title" style="margin-top: 6px;">专项培训文件</span>
                      <a href="#" class="file">{{applyFile.afile1.filename}}</a>
                      <span class="span-title" style="margin-top: 16px;">培训签到表</span>
                      <a href="#" class="file">{{applyFile.afile2.filename}}</a>
                    </div>
                  </div>
                  <div class="right type-view4" v-else-if="selectIndex == 3">
                    <span class="span-title">落实工作</span>
                    <div class="content">
                      <div class="row">
                        <div class="item">
                          <label>应急救援相关照片</label>
                          <div class="imgs">
                            <img :src="item.thumb" v-for="(item, index) in onFile.list4" :key="index">
                          </div>
                          </div>
                          <div class="item">
                            <label>作业劳动防护用品照片</label>
                            <div class="imgs">
                              <img :src="item.thumb" v-for="(item, index) in onFile.list3" :key="index">
                          </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="item">
                              <label>配置作业设备相关照片</label>
                              <div class="imgs">
                                <img :src="item.thumb" v-for="(item, index) in onFile.list2" :key="index">
                              </div>
                              </div>
                              <div class="item">
                                <label>安全专项培训现场照片</label>
                                <div class="imgs">
                                  <img :src="item.thumb" v-for="(item, index) in onFile.list1" :key="index">
                              </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="right type-view4" v-else-if="selectIndex == 4">
                          	<span class="span-title">落实工作</span>
                          	<div>确认现场已通风，并检测合格</div>
                          </div>
                        </div>
                      </div>
    </el-dialog>
  </div>
</template>
<script>
const workService = require("../../../service/workService.js");
export default {
  data() {
    return {
      process: [{
        label: "申请",
        status: "okey"
      }, {
        label: "申批",
        status: "okey"
      }, {
        label: "准备材料",
        status: "okey"
      }, {
        label: "落实工作",
        status: "okey"
      }, {
        label: "作业现场",
        status: "not"
      }],
      selectIndex: 0,

      workInfo: {
        name: "",
        work_datetime: "",
        operator_no: "",
        operator_names: "",
        safty_manager: "",
        work_place_text: "",
        onsite_over_datetime: "",
        onsite_over_datetime: "",
        representative: "",
        operator_names: '',
        safty_manager: '',               
      },
      workapplyInfo:{
        repname: '',
        smname: '',
      },
      file1: {thumb: ""},
      file2:{thumb: ""},

      approvalInfo:{
        reviewer: "",
        check_time: "",
        check_opinion: "",
      },
      applyFile:{
        alist1: [],
        alist2: [],
        alist3: [],
        alist4: [],
        afile1: {thumb: ''},
        afile2: {thumb: ''},
      },
      onFile:{
        list1: [],
        list2: [],
        list3: [],
        list4: [],
      }
    }
  },

  computed: {

  },

  props: {
    title: {
      type: String,
      default: null
    },
    isVisible: {
      type: Boolean,
      default: null
    },
    detailId: {
      type: Number,
      default: null
    }
  },

  watch: {
    isVisible: function(value){
      // this.resetForm();
      if(value){
        console.log(value)
        this.getWorkingDetails(this.detailId);
      }else{
        this.selectIndex = 0;
        this.applyFile = {
          alist1: [],
          alist2: [],
          alist3: [],
          alist4: [],
          afile1: {thumb: ''},
          afile2: {thumb: ''},
        }
      }
      console.log("form");
    }
  },

  methods: {
    handleClose() {
    	this.$emit('close');
    },

    isColor(val) {
      if (val == 'okey') {
        return '#1B88F5'
      } else {
        return '#aaaaaa'
      }
    },

    select(index) {
      this.selectIndex = index;
      if(index == 0){
        this.getWorkingDetails(this.detailId);
      }
      if(index == 1){
        this.getExamineApprove(this.detailId);
      }
      if(index == 2){
        this.getWorkingPrepareFile(this.detailId);
      }
      if(index == 3){
        this.getOnsiteFile(this.detailId);
      }
      if(index == 4){

      }
    },

    /**
     * 获取作业详情信息
     */
    getWorkingDetails(id) {
      let _this = this;
      workService.getById(id, res => {
        console.log(res);
        _this.workInfo = res.work;
        // _this.getWorkApply(id);
        // _this.getWorkingApplyFile(id);
      });

      this.getWorkingApplyFile(id);
      this.getWorkApply(id);
    },
    getWorkApply(id){
      let _this = this;
      workService.getWorkApplyById(id, res => {
        if(null != res.data){
          _this.workapplyInfo.repname = res.data.repname;
          _this.workapplyInfo.smname = res.data.smname;
        }        
      })
    },

    /**
     * 获取上传附件信息
     */
    getWorkingApplyFile(id) {
      this.file1 = {thumb: ""};
      this.file2 = {thumb: ""};
      workService.getWorkingApplyFileByWorkId(id, res => {
        console.log(res);
        if(null != res.file1){
          this.file1 = res.file1;
        }
        if(null != res.file2){
          this.file2 = res.file2;
        }
      });
    },

    /**
     * 获取作业审批信息
     */
    getExamineApprove(workid) {
      workService.examineApproveByapplyId(workid, res => {
          console.log(res)
          if(null != res.work_check){
            this.approvalInfo= res.work_check;
          }
      });
    },

    /**
     * 获取上传准备材料
     */
    getWorkingPrepareFile(workid) {
      this.applyFile = {
        alist1: [],
        alist2: [],
        alist3: [],
        alist4: [],
        afile1: {thumb: ''},
        afile2: {thumb: ''},
      };
      workService.getWorkingPrepareFileByWorkId(workid, res => {
        console.log(res);
        for(let item of res.list){
          if(item.filebelong === '设备'){
            this.applyFile.alist1.push(item);
          }
          if(item.filebelong === '器材'){
            this.applyFile.alist2.push(item);
          }
          if(item.filebelong === '培训照片'){
            this.applyFile.alist3.push(item);
          }
          if(item.filebelong === '用品'){
            this.applyFile.alist4.push(item);
          }
          if(item.filebelong === '培训文件'){
            this.applyFile.afile1 = item;
          }
          if(item.filebelong === '培训签到表'){
            this.applyFile.afile2 = item;
          }
        }
      });
    },

    /**
     * 获取现场落实文件
     */
    getOnsiteFile(workid) {
      this.onFile = {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
      };
      workService.getWorkingOnsiteFileByWorkId(workid, res => {
        console.log(res);
        for(let item of res.list){
          if(item.filebelong === '现场合影'){
            this.onFile.list1.push(item);
          }
          if(item.filebelong === '配备设备'){
            this.onFile.list2.push(item);
          }
          if(item.filebelong === '劳动防护用品'){
            this.onFile.list3.push(item);
          }
          if(item.filebelong === '通风检测'){
            this.onFile.list4.push(item);
          }
        }
      });
    },
  }
}

</script>
<style scoped>
.process {
  /*border: 1px solid;*/
}

.line {
  margin: 4px 0;
  margin-left: 7px;
  width: 1px;
  height: 30px;
  background-color: #aaa;
  border-radius: 6px;
}

.process-item:first-child div.line {
  width: 0;
  height: 0;
}

.process-item:hover {
  cursor: pointer;
}

.view {
  padding: 10px 20px;
  background-color: #F2F4F6;
}

.for-item {
  display: flex;
}

.for-item label {
  display: inline-block;
  width: 110px;
  color: #555555;
  line-height: 36px;
}

.for-item div {
  color: #202020;
  flex: 1;
  line-height: 36px;
}

.step {
  display: flex;
}

.file {
  display: block;
  color: #555555;
}

.span-title {
  display: block;
  line-height: 30px;
  color: #202020;
}

.type-list {
  width: 140px;
  line-height: 36px;
}

.type-list>label {
  width: 100%;
  display: inline-block;
}

.type-list>label:hover {
  cursor: pointer;
}

.data-item {
  line-height: 34px;
  color: #202020;
}

.data-item>label {
  width: 100px;
  line-height: 34px;
  color: #555555;
}

/*.type-view2,
.type-view4,
.type-view5 {
  padding: 6px 12px;
  margin-top: 10px;
  width: 540px;
  height: 420px;
  background-color: #eeeeee;
  overflow: hidden;
}*/

.type-view3 {
  border: 1px solid #f2f4f6;
}

.type-view3-item {
  margin-bottom: 10px;
  margin-left: 2px;
  width: 100%;
  overflow: hidden;
}

.type-view3-item label {
  font-size: 13px;
  color: #555;
  line-height: 31px;
}

.type-view3-item div {
  width: 100%;
  height: 50px;
  display: flex;
}

.type-view3-item div>img {
  margin-right: 20px;
  width: 20%;
}

.type-view4 div.content {
  display: flex;
  flex-direction: column;
}

.type-view4 div.content div.row {
  margin-bottom: 20px;
  display: flex;
  /*width: 50%;*/
  justify-content: space-between;
}

.type-view4 div.content div.row div.item {
  width: 49%;
}

.imgs {
  /*border: 1px solid;*/
  overflow: hidden;
  /*	display: flex;
	justify-content: space-between;*/
  flex-wrap: wrap;
}

.imgs>img {
  width: 43.5%;
  margin-bottom: 6px;
  margin-top: 10px;
  margin-right: 6%;
  float: left;
}

.type-view5-context {
  float: left;
  text-align: center;
  width: 90px;
}

.type-view5-context label {
  display: block;
  line-height: 30px;
}

.type-view5-context span {
  display: block;
  line-height: 27px;
}

</style>
