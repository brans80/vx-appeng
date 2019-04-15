import './scss/main.scss'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// use custom global variables
import GV from './globalVars'
Vue.prototype.$GV = GV;

// use custom global functions
import GF from './globalFunctions'
Vue.prototype.$GF = GF;


// js libs (not vue)
import Parallax from 'parallax-js'
Vue.prototype.$Parallax = Parallax;

import {TweenMax, Power2, TimelineMax} from "gsap/TweenMax";
Vue.prototype.$TweenMax = TweenMax;
Vue.prototype.$TimelineMax = TimelineMax;
Vue.prototype.$Power2 = Power2;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
