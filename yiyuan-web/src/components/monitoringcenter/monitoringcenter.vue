<template>
  <div id="monitoringcenter">
    <div class="map" id="amapcontainer">
      <div class="filter-map" :style="{width:optionsWidth}">
        <div>
          <span v-for="(item,index) in areaList" :key="index" @click="select(index,item.id)" :style="{borderBottom:addressIndex==index?'2px solid #007ED7': ''}">
          {{item.region_name}}
        </span>
        </div>
        <div class="result">
          <el-input v-model="companyName" size="small" placeholder="公司名称" class="companyInput"></el-input>
          <el-button icon="el-icon-search" size="small" class="btn"></el-button>
        </div>
      </div>
    </div>
    <div class="real-time">
      <video src="#" controls="controls" width="100%" height="270">
        您的浏览器不支持 video 标签。
      </video>
      <span class="txt">
       <img src="../../common/images/videotape.png">
       实时作业</span>
      <div class="real-data">
        <label class="online">数据采集器
          <span>在线</span>
        </label>
        <div class="data-list">
          <div class="for-item" v-for="(item,index) in data" :key="index">
            <label>{{item.name}}</label>
            {{item.val}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AMap from 'AMap'

const areaService = require('../../service/areaService.js');
export default {
  data() {
    return {
      addressIndex: 0,
      companyName: "",
      optionsWidth: 'calc(100% - 722px)',
      areaList: [], // 区域
      areaId: null, // 区域ID
      data: [{
          name: "人体感应器",
          val: "2",
        },
        {
          name: "一氧化碳",
          val: "19.00%",
        },
        {
          name: "氧气浓度",
          val: "21.00mg/m",
        },
        {
          name: "二氧化碳",
          val: "29.00%",
        },
        {
          name: "硫化氢",
          val: "9.00mg/m",
        }
      ]
    }
  },

  props: {
    cueerntId: {
      type: Number,
      default: null
    }
  },

  watch: {
    cueerntId(val) {
      console.log(val);
    }
  },

  created() {
    let _this = this;
    // this.getWorkingListData();
    setTimeout(function() {
      //初始化地图
      // _this.getWorkingListData();
      _this.initAMap();
      _this.optionsWidth = 'calc(100% - 780px)';
    }, 1000);
    this.getAreaist();
  },
  methods: {
    /**
     * 初始化地图
     */
    initAMap() {
      var amap = new AMap.Map('amapcontainer', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        // mapStyle: "amap://styles/whitesmoke",
        zoom: 11,
        // center: [114.31, 30.52],
      });
      amap.setMapStyle("amap://styles/dark");
      amap.plugin(["AMap.ToolBar"], function() {
        amap.addControl(new AMap.ToolBar());
      });

      // 当前位置定位
      var options = {
        'showButton': true, //是否显示定位按钮
        'buttonPosition': 'LB', //定位按钮的位置
        /* LT LB RT RB */
        'buttonOffset': new AMap.Pixel(10, 20), //定位按钮距离对应角落的距离
        'showMarker': true, //是否显示定位点
        'markerOptions': { //自定义定位点样式，同Marker的Options
          'offset': new AMap.Pixel(-18, -36),
          'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
        },
        'showCircle': true, //是否显示定位精度圈
        'circleOptions': { //定位精度圈的样式
          'strokeColor': '#0093FF',
          'noSelect': true,
          'strokeOpacity': 0.5,
          'strokeWeight': 1,
          'fillColor': '#02B0FF',
          'fillOpacity': 0.25
        }
      }

      AMap.plugin(["AMap.Geolocation"], function() {
        var geolocation = new AMap.Geolocation(options);
        amap.addControl(geolocation);
        geolocation.getCurrentPosition()
      });

    },


    select(index, id) {
      console.log(this.areaList[index]);
      this.addressIndex = index;
      this.areaId = id;
    },

    /**
     * 获取省份信息
     */
    getAreaist() {
      areaService.getChildAreasList(localStorage.getItem("areaid"), res => {
        console.log(res)
        // if(-1 === res.code){
        //   this.$router.go(0);
        // }
        this.areaList = res.list;
      });

    },

  }
}

</script>
<style scoped>
#monitoringcenter {
  display: flex;
  height: calc(100% - 0px);
}

.map {
  position: relative;
  flex: 1;
  z-index: 101;
  margin-right: 15px;
  background-color: rgba(0, 0, 0, 0.8);
}

.real-time {
  position: relative;
  width: 372px;
}

.filter-map {
  z-index: 200;
  position: fixed;
  right: 417px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  line-height: 44px;
  height: 44px;
  font-size: 15px;
  background-color: #fff;
  color: #555;
  transition: all .65s ease;
}

.filter-map div span {
  margin-left: 20px;
  padding: 0 5px;
  display: inline-block;
  line-height: 26px;
}

.filter-map div span:hover {
  cursor: pointer;
}

.companyInput {
  width: 244px;
}

.result {
  display: flex;
  height: 44px;
  align-items: center;
}

.btn {
  margin-top: 1px;
  height: 32px;
  background-color: #007ED7;
  color: #fff;
}

.txt {
  position: absolute;
  top: 15px;
  left: 15px;
  display: block;
  cursor: pointer;
  font-size: 11px;
  color: #DE2727;
  width: 77px;
  line-height: 21px;
  text-align: center;
  border-radius: 16px;
  background-color: #CCC;
}

.real-data {
  padding: 0 20px;
  margin: 15px auto;
  width: calc(100% - 40px);
  height: calc(100% - 291px);
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
  background-color: #0BB71F;
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
#monitoringcenter /deep/.el-input__inner {
  border: 1px solid #ccc !important;
  border-radius: 18px 0 0 18px;
  border-right: none;
}

#monitoringcenter /deep/.el-button {
  border: 1px solid #007ED7 !important;
  border-left: none;
  border-radius: 0;
  border-radius: 0 18px 18px 0;
}

</style>
