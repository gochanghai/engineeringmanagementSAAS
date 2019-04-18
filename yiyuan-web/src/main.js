// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { get, post } from '@/common/js/http.js';
import preview from "@/common/components/preview.vue"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.use(ElementUI)
Vue.component('preview', preview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ElementUI,
  components: { App },
  template: '<App/>'
})
