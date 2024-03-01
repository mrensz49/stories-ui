import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { utilsMixin } from './services/utilsMixin.js';

import axios from "axios";
import VueAxios from "vue-axios";
import VueSocialauth from "vue-social-auth";

import moment from "moment";
import VueSocialSharing from "vue-social-sharing";
import VueMeta from "vue-meta";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  // You can set your default options here
};

import { registerSW } from "virtual:pwa-register";
registerSW({ immediate: true });

Vue.use(VueAxios, axios);

const googleClientIdDev =
  "142165108690-u3h2boviv0ai3bnihued399b9epid2pd.apps.googleusercontent.com";
const googleClientIdProd =
  "1066231581334-afe1q2sq5834jbf8ddj2h42ksggke8ad.apps.googleusercontent.com";
const googleRedirectUriDev = "http://localhost:5173/auth/google/callback";
const googleRedirectUriProd = import.meta.env.VITE_CALLBACK_GOOGLE_PROD;

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId:
        import.meta.env.VITE_NODE_ENV === "development"
          ? googleClientIdDev
          : googleClientIdProd,
      redirectUri:
        import.meta.env.VITE_NODE_ENV === "development"
          ? googleRedirectUriDev
          : googleRedirectUriProd,
    },
    facebook: {
      clientId: "763496285649763",
      redirectUri: "https://storiesforyou.net/auth/facebook/callback",
    },
  },
});

import skeletonLoader from "./components/loader/Skeleton";
import skeletonLoaderCard from "./components/loader/SkeletonCard";
import skeletonArticle from "./components/loader/SkeletonArticle";
import progressCircular from "./components/loader/ProgressCircular";
import topScroll from "./components/helpers/ScrollTop";

Vue.config.productionTip = false;

Vue.use(PiniaVuePlugin);
Vue.component("skeletonLoader", skeletonLoader);
Vue.component("skeletonLoaderCard", skeletonLoaderCard);
Vue.component("skeletonArticle", skeletonArticle);
Vue.component("progressCircular", progressCircular);
Vue.component("topScroll", topScroll);
Vue.use(VueSocialSharing);
Vue.use(VueMeta);
Vue.use(Toast, options);
Vue.mixin(utilsMixin);

Vue.filter('formatText', function(value) {
  // Replace triple asterisks with bold and italic tags
  value = value.replace(/\*{3}(.*?)\*{3}/g, '<b><i>$1</i></b>');

  // Replace double asterisks with bold tags
  value = value.replace(/\*{2}(.*?)\*{2}/g, '<b>$1</b>');

  // Replace single asterisks with italic tags
  value = value.replace(/\*(.*?)\*/g, '<i>$1</i>');

  // Replace hashtags with header tags
  value = value.replace(/#{1,6}\s(.*?)\n/g, function(match, p1) {
    var level = match.split(" ")[0].length;
    return '<h' + level + '>' + p1 + '</h' + level + '>';
  });

  // Replace backticks with code blocks
  value = value.replace(/`(.*?)`/g, '<code>$1</code>');

  // Replace new lines with <br> tags
  value = value.replace(/\n/g, '<br>');

  return value;
});

const pinia = createPinia();
Vue.use(pinia);

new Vue({
  pinia,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
