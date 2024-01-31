import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'

import moment from 'moment'
import VueSocialSharing from 'vue-social-sharing'
import VueMeta from 'vue-meta'

import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {

  providers: {
    google: {
      clientId: import.meta.env.VITE_NODE_ENV == 'development' 
      ? '142165108690-u3h2boviv0ai3bnihued399b9epid2pd.apps.googleusercontent.com' : '1066231581334-afe1q2sq5834jbf8ddj2h42ksggke8ad.apps.googleusercontent.com',
      redirectUri: import.meta.env.VITE_NODE_ENV == 'development'
      ? 'http://localhost:5173/auth/google/callback' : import.meta.env.VITE_CALLBACK_GOOGLE_PROD // Your client app URL
    },
    facebook: {
      clientId: '763496285649763',
      redirectUri: 'https://storiesforyou.net/auth/facebook/callback' // Your client app URL
    },    
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
Vue.use(VueSocialSharing);
Vue.use(VueMeta)

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
    getPublicImageThumbnail(name) {
      if (!name) {
        name = '../no-image.jpg';
      }
      var baseURL = import.meta.env.VITE_NODE_ENV == 'development' ? import.meta.env.VITE_APP_URL : import.meta.env.VITE_APP_URL_PROD;
      return `${baseURL}images/thumbnails/${name}`
    },
    getHumanDateDay(date) {
      if (date) {
          return moment(date, 'YYYY-MM-DD H:m').format('MMM. DD, YYYY - h:mma');
      }
    },    

  },
});

const pinia = createPinia()
Vue.use(pinia)

new Vue({
  pinia,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
