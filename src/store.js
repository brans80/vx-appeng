import Vue from 'vue'
import Vuex from 'vuex'

import global from './global.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: 1,
    ivTestStatus: 'start',
    answerObjectsArray: [],
    popupsShow: {
      'ivRulesTest': false
    },

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
      state.ivWorkArray = workArr;
    },
    changeShowPopup(state, obj) {
      let target = obj['target'];
      let show = obj['show'];
      state.popupsShow[target] = show;
    }
  },

  actions: {

  },

  getters: {

    popupsShow(state) {
      return state.popupsShow;
    },

    levels() {
      return global.levels;
    },

    basicVerbsList() {
      return global.verbsList;
    },

    filteredIvArrByGroup(state, getters) {
      let lv = getters.levelObj.level;
      let filteredArr = getters.basicVerbsList.filter(function (verbItem) {

        if (lv <= 1) {

          return verbItem.group === 1;
        }
        if (lv === 2 || lv === 3) {
          return verbItem.group === 1 || verbItem.group === 2;
        }
        if (lv === 4 || lv === 5) {
          return verbItem.group === 1 || verbItem.group === 2 || verbItem.group === 3;
        }
        if (lv === 6) {
          return verbItem.group === 1 || verbItem.group === 2 || verbItem.group === 3 || verbItem.group === 4;
        }
      });
      return filteredArr;
    },

    mixedIvArray(state, getters) {
      let mixedArr = global.toMixArray(getters.filteredIvArrByGroup);
      return mixedArr;
    },

    ivWorkArray(state, getters) {
      return getters.mixedIvArray;
    },

    levelObj(state) {
      return global.levels[state.level];
    },

    totalAmount(state, getters) {
      return getters.levelObj.amount;
    },

    testCorrectResult(state) {
      let correctAmount = 0;
      for (let item of global.toResultTest(state.answerObjectsArray)) {
        if (item) {
          correctAmount++;
        }
      }

      return correctAmount;
    },

    timerVal(state, getters) {
      let level = getters.levelObj.level;
      let k = ((level + 1) / getters.levels.length) * 100;
      if (k <= 30) {
        return 60;
      }
      if (k > 30 && k <= 75) {
        return 50;
      }
      if (k > 75 && k <= 100) {
        return 40;
      }
    },

    //sort phrase

    phraseObjArr(state) {
      return global.phrases;
    },


  },



  strict: process.env.NODE_ENV !== 'production', // строгий режим - позволяет изменять хранилище только через мутации
})