// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import navbar from './components/navigation/navbar.vue'
import toolbar from './components/navigation/toolbar.vue'
import convert from './components/videoConverter/convert.vue'
import converted from './components/videoConverter/converted.vue'
import videos from './components/videoConverter/videos.vue'
import Root from './components/vc_Root.vue'
import Home from './components/vc_Home.vue'
Vue.config.productionTip = false
Vue.use(vuetify)
Vue.component('my-nav', navbar)
Vue.component('my-tbar', toolbar)
Vue.component('my-convert', convert)
Vue.component('my-converted', converted)
Vue.component('my-root',Root)
Vue.component('my-home',Home)
Vue.component('my-vdos',videos)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
