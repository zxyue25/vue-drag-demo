// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import FinD from '@weus/fuc-design';
import '@weus/fuc-design/lib/theme-default/index.css'; // 默认主题

Vue.config.productionTip = false

Vue.use(FinD);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
