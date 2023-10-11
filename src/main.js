import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import skeletonLoader from './components/loader/Skeleton'
import skeletonLoaderCard from './components/loader/SkeletonCard'
import skeletonArticle from './components/loader/SkeletonArticle'

Vue.config.productionTip = false
Vue.use(PiniaVuePlugin)
Vue.component('skeletonLoader', skeletonLoader)
Vue.component('skeletonLoaderCard', skeletonLoaderCard)
Vue.component('skeletonArticle', skeletonArticle)

const pinia = createPinia()

new Vue({
  pinia,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
