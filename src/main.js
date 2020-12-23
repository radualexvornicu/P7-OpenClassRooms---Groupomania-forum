import Vue from 'vue';
import VSwitch from 'v-switch-case'
import App from './App.vue';
import { router } from './router';
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import VueMoment from 'vue-moment'; 
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.use(VueMoment);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VSwitch);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');