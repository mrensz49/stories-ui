import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import skeletonLoader from './components/loader/Skeleton'
import skeletonLoaderCard from './components/loader/SkeletonCard'
import skeletonArticle from './components/loader/SkeletonArticle'
import progressCircular from './components/loader/ProgressCircular'
import topScroll from './components/helpers/ScrollTop'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)
Vue.component('skeletonLoader', skeletonLoader)
Vue.component('skeletonLoaderCard', skeletonLoaderCard)
Vue.component('skeletonArticle', skeletonArticle)
Vue.component('progressCircular', progressCircular)
Vue.component('topScroll', topScroll)
Vue.mixin({
  methods: {
    getImageUrl(name) {
      return new URL(`/images/bg/${name}`, import.meta.url).href
    },
    getPublicImage(name) {

      if (!name) {
        name = 'no-image.jpg';
      }
      var baseURL = import.meta.env.VITE_NODE_ENV == 'development' ? import.meta.env.VITE_APP_URL : import.meta.env.VITE_APP_URL_PROD;

      return `${baseURL}images/${name}`
    },
  },
});

const pinia = createPinia()

new Vue({
  pinia,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
