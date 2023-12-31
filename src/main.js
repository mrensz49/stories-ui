import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'

Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {

  providers: {
    google: {
      clientId: '142165108690-u3h2boviv0ai3bnihued399b9epid2pd.apps.googleusercontent.com',
      redirectUri: 'http://localhost/stories-v2/public/auth/google/callback' // Your client app URL
      // redirectUri: 'http://localhost/stories-v2/public/user/social-login/callback/google' // Your client app URL
      // redirectUri: '/auth/google/callback' // Your client app URL
    }
  }
})

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
