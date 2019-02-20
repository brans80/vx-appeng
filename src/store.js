import Vue from 'vue'
import Vuex from 'vuex'

import global from './global.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: global.levels[0],
    ivTestStatus: 'start',
    ivWorkArray: false,
    answerObjectsArray: [],
  },

  mutations: {
    changeLevel(state, newLevel) {
      state.level = newLevel;
    },
    changeIvTestStatus(state, newStatus) {
      state.ivTestStatus = newStatus;
    },
    changeAnswerObjectsArray(state, newAnswerObjectsArray) {
      state.answerObjectsArray = [...newAnswerObjectsArray];
    },
    changeIvWorkArray(state) {
      let amount = state.level.amount;
      let workArr = [];

      workArr = [...global.toMixArray(global.verbsList)].splice(0, amount);
      state.ivWorkArray =  workArr;
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

      // let amount = state.level.amount;
      // let workArr = [];
      // workArr = [...global.toMixArray(global.verbsList)].splice(0, amount);

      return state.ivWorkArray;
    },

    totalAmount(state) {
      return state.level.amount;
    },

    testCorrectResult(state) { 
      let correctAmount = 0;    
      for(let item of global.toResultTest(state.answerObjectsArray)) {
        if(item) {
          correctAmount ++;
        }
      }

      return correctAmount;
    }
  },
 
  strict: process.env.NODE_ENV !== 'production', // строгий режим - позволяет изменять хранилище только через мутации
})