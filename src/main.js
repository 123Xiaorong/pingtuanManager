import Vue from "vue";
//注意引入在vue的下面
// ElementUI组件库
import ElementUI from 'element-ui'; //组件库
import 'element-ui/lib/theme-chalk/index.css'; //样式
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import Vuex from 'vuex'
//使用ElementUI
Vue.use(ElementUI);
axios.defaults.headers.post['Content-Type']="application/json"
Vue.prototype.$axios=axios;

// Vue.prototype.$host="http://localhost:8080";
// Vue.prototype.$host="http://172.16.14.94:8080";
Vue.prototype.$host="http://172.17.2.237:8080";

import VueSession from 'vue-session'
Vue.use(VueSession);

// Vue.config.productionTip = false;

// 消息提示的环境配置，是否为生产环境： 
// false 开发环境：Vue会提供很多警告来方便调试代码。 
// true 生产环境：警告却没有用，反而会增加应用的体积

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    biaohao:''
  },
  mutations: {
    increment (state,biaohao) {
      state.biaohao=biaohao;
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
