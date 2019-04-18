<template>
  <div id="e_specialinfo">
    <div class="aside">
      <router-link v-for="(item,index) in navList" :key="index" :to="item.link" tag="span">{{item.name}}</router-link>
    </div>
    <router-view class="pages"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [{
        link: '/e_specialinfo/e_space',
        name: '有限空间',
      }, {
        link: '/e_specialinfo/e_dust',
        name: '粉尘爆炸',
      }, {
        link: '/e_specialinfo/e_chemistry',
        name: '危险化学品',
      }, {
        link: '/e_specialinfo/e_ammonia',
        name: '涉氢',
      }, {
        link: '/e_specialinfo/e_lithium',
        name: '锂电池',
      }, {
        link: '/e_specialinfo/e_dev',
        name: '特种设备',
      }, {
        link: '/e_specialinfo/e_other',
        name: '其他',
      }]
    }
  }
}

</script>
<style scoped>
#e_specialinfo {
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

.aside span {
  display: block;
  line-height: 38px;
  font-size: 15px;
  cursor: pointer;
  color: #555;
  border-right: 3px solid #fff;
}

.aside span.router-link-active {
  background-color: #D4E9FF;
  color: #1B88F5;
  border-right: 3px solid #56A5F4;
}

.pages {
  flex: 1;
  margin: 15px;
}

</style>
