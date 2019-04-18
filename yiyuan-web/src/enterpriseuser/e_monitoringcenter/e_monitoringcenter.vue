<template>
  <div id="e_monitoringcenter">
    <div class="aside">
      <div class="work-name">作业空间列表</div>
      <div class="work-list">
        <label
          v-for="(item, index) in workingList"
          :key="index"
          @click="select(index)"
          :class="[workIndex==index?'active':'']"
        >{{item.name}}</label>
      </div>
    </div>
    <div class="videotape">
      <video src="#" controls="controls" width="100%" height="100%">您的浏览器不支持 video 标签。</video>
      <span class="txt">
        <img src="../../common/images/videotape.png">
        实时作业
      </span>
    </div>
    <div class="data">
      <div class="real-data">
        <label class="online">
          数据采集器
          <span>在线</span>
        </label>
        <div class="data-list">
          <div class="for-item">
            <label>人体感应器</label>
            {{0}}
          </div>
          <div class="for-item">
            <label>一氧化碳</label>
            {{carbon_monoxide||0}}%
          </div>
          <div class="for-item">
            <label>氧气浓度</label>
            {{oxygen||0}}mg/m
          </div>
          <div class="for-item">
            <label>二氧化碳</label>
            {{0}}%
          </div>
          <div class="for-item">
            <label>硫化氢</label>
            {{hydrothion||0}}mg/m
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const mqttService = require("../../service/mqttService");
const workService = require("../../service/workService.js");
var mqtt = require("mqtt");
export default {
  data() {
    return {
      workIndex: 0,
      workingList: [],

      data: [
        {
          name: "",
          val: "9.00"
        }
      ],
      carbon_monoxide: "",
      hydrothion: "",
      oxygen: ""
    };
  },
  async created() {
    this.getWorkingListData();
    await this.onScene();
  },
  methods: {
    select(index) {
      this.workIndex = index;
    },
    async onScene() {
      var _this = this;
      let mqttLogin = await mqttService.doMQTTLogin._post();
      // var p1 = new Promise(function(resolve, reject) {
      //   var clientId = mqttLogin.data.clientId;
      //   var client1 = mqtt.connect(mqttLogin.data.brokerUrl, {
      //     clientId
      //   });
      //   console.log("p1");
      //   setTimeout(resolve, 500, client1);
      // });
      // var p2 = new Promise(function(resolve, reject) {
      //   var clientId = mqttLogin.data.clientId;
      //   var client2 = mqtt.connect(mqttLogin.data.brokerUrl, {
      //     clientId
      //   });
      //   console.log("p2");
      //   setTimeout(resolve, 500, client2);
      // });
      // // 同时执行p1和p2，并在它们都完成后执行then:
      // Promise.all([p1, p2]).then(function(results) {
      //   results[0].on("connect", async function() {
      //     console.log("subscribe topic:/UL/A10SXQ1811090537/hydrothion");
      //     results[0].subscribe("/UL/A10SXQ1811090537/hydrothion");
      //   });
      //   results[0].on("message", function(topic, message) {
      //     let nowtime = new Date();
      //     let nowdatetime = nowtime.toLocaleString();
      //     let result = JSON.parse(message.toString());
      //     _this.hydrothion = result.hydrothion;
      //   });

      //   results[1].on("connect", async function() {
      //     console.log("subscribe topic:/UL/A10SXQ1811090521/carbon_monoxide");
      //     results[1].subscribe("/UL/A10SXQ1811090521/carbon_monoxide");
      //   });
      //   results[1].on("message", function(topic, message) {
      //     let nowtime = new Date();
      //     let nowdatetime = nowtime.toLocaleString();
      //     let result = JSON.parse(message.toString());
      //     _this.carbon_monoxide = result.carbon_monoxide;
      //   });
      // });

      var clientId = mqttLogin.data.clientId;
      var client = mqtt.connect(mqttLogin.data.brokerUrl, {
        clientId
      });

      client.on("connect", async function() {
        client.subscribe("/UL/A10SXQ1811090537/hydrothion");
        // client.subscribe("/UL/A10SXQ1811090521/carbon_monoxide");
        // client.subscribe("/UL/A10SXQ1811090521/oxygen");
        // client.subscribe("/UL/6820X01903071042/active");
        // client.subscribe("/UL/A10SXQ1811090537/sulfur_dioxide");
      });

      client.on("message", function(topic, message) {
        let nowtime = new Date();
        let nowdatetime = nowtime.toLocaleString();
        let result = JSON.parse(message.toString());
        console.log("result=======================");
        console.log(result);
        console.log("result=======================");
        _this.oxygen = result.oxygen;
        _this.hydrothion = result.hydrothion;
        _this.carbon_monoxide = result.carbon_monoxide;
      });
    },
    /**
     * 获取作业列表数据
     */
    getWorkingListData() {
      // this.reload();
      let _this = this;
      workService.listWorking(res => {
        console.log("获取作业列表数据");
        console.log(res.list);
        if (-1 == res.code) {
        } else {
          _this.workingList = res.list;
        }
      });
    }
  }
};
</script>
<style scoped>
#e_monitoringcenter {
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  left: 0;
  top: 50px;
  display: flex;
}

.aside {
  padding-top: 15px;
  margin-right: 15px;
  width: 260px;
  background-color: #fff;
}

.work-name {
  text-align: center;
  color: #555;
  font-size: 16px;
  line-height: 38px;
  background-color: #d4e9ff;
}

.work-list label {
  padding-left: 82px;
  display: block;
  line-height: 42px;
  color: #555;
  font-size: 15px;
}

.work-list label:hover {
  cursor: pointer;
  background-color: #e4e4e4;
}

.work-list label.active {
  color: #1b88f5;
}

.videotape {
  position: relative;
  flex: 1;
  margin: 15px 0;
  background-color: rgba(0, 0, 0.6);
}

.videotape span.txt {
  position: absolute;
  top: 15px;
  left: 15px;
  display: block;
  cursor: pointer;
  font-size: 11px;
  color: #de2727;
  width: 77px;
  line-height: 21px;
  text-align: center;
  border-radius: 16px;
  background-color: #ccc;
}

.data {
  width: 372px;
}

.real-data {
  padding: 0 20px;
  padding-bottom: 45px;
  margin: 15px auto;
  width: 302px;
  background-color: #fff;
}

.real-data label.online {
  display: block;
  padding-top: 45px;
  font-size: 17px;
  display: flex;
  align-items: center;
  color: #555;
}

.real-data label.online span {
  display: block;
  margin-left: 10px;
  padding: 0 6px;
  line-height: 19px;
  font-size: 13px;
  color: #fff;
  background-color: #0bb71f;
}

.for-item {
  margin-top: 22px;
  font-size: 15px;
  color: #202020;
}

.for-item label {
  display: inline-block;
  width: 90px;
  font-size: 14px;
  color: #555;
}
</style>
<style>
#e_monitoringcenter .search /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 0;
  border-right: none;
}

#e_monitoringcenter .search /deep/.el-button {
  border: 1px solid #007ed7 !important;
  border-radius: 0;
}
</style>

