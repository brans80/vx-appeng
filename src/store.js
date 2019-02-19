import Vue from 'vue'
import Vuex from 'vuex'

import global from './global.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: global.levels[0],
    ivTestStatus: 'start',
    ivWorkArray: false,
  },

  mutations: {
    changeLevel(state, newLevel) {
      state.level = newLevel;
    },
    changeIvTestStatus(state, newStatus) {
      state.ivTestStatus = newStatus;
    },
    changeIvWorkArray(state, newArr) {
      state.ivWorkArray = newArr;
    }
  },

  actions: {

  },

  getters: {
    // ivCounter(state) {
    //   let total = state.level.amount;
    //   let cur = +state.ivTestItemIndex+1;
    //   return (cur+'/'+total);
    // },
    ivWorkArray(state) {

      let amount = state.level.amount;
      let workArr = [];
      workArr = [...global.toMixArray(global.verbsList)].splice(0, amount);

      return workArr;
    },

    totalAmount(state) {
      return state.level.amount;
    }
  },
 
  strict: process.env.NODE_ENV !== 'production', // строгий режим - позволяет изменять хранилище только через мутации
})