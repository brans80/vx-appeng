<template>
<div>
  <div class="iv-test-form__counter">
    <span class="cur-count">
        {{getCurNumber}}
    </span>
    <span>&nbsp;/&nbsp;</span>
    <span class="total-count">
      {{getTotalAmount}}
    </span>
  </div>
  <div class="iv-test-form__timer">
    <IverbsTestTimer v-bind:time="getTime" v-bind:timerStatus="getTimerStatus" v-on:on-timer-finish="toAnswer" v-bind:key="testItemIndex">
    </IverbsTestTimer>
  </div>
  <h2 class="iv-test-form__rus">
    {{getCorrectVerb.rus}}
  </h2>

  <div class="iv-test__controls-block">
    <IverbsTestFormControl v-for="verbFormItem in getVerbForms" v-bind:key="verbFormItem.var" v-bind:verbFormObj="verbFormItem" v-bind:comparisonObj="comparisonObj" v-bind:resetInput="getResetInput" v-bind:correctVerb="getCorrectVerb" v-on:on-change-input-val="toUpdateAnswerObj">
    </IverbsTestFormControl>
  </div>
  <div class="iv-test-form__bottom">
    <button v-if="getAnswerBtnShow" type="button" class="btn" v-on:click="toAnswer" v-bind:disabled="getAnswerBtnDisabled">Ответить</button>
    <button v-if="getNextBtnShow" type="button" class="btn" v-on:click="toNext">К следующему глаголу</button>
    <button v-if="getResultBtnShow" type="button" class="btn" v-on:click="toResult">Посмотреть результат</button>
    <IverbsTestFormAlert v-bind:comparisonObj=comparisonObj v-bind:testItemIndex=testItemIndex v-bind:answerObj=answerObj v-bind:answerObjectsArray=answerObjectsArray></IverbsTestFormAlert>
  </div>

</div>
</template>

<script>
import global from './../global.js'
import IverbsTestFormControl from './IverbsTestFormControl.vue'
import IverbsTestFormAlert from './IverbsTestFormAlert.vue'
import IverbsTestTimer from './IverbsTestTimer.vue'

export default {
  name: 'IverbsTestForm',
  props: {},

  data: function () {
    return {
      testItemIndex: 0,
      answerObj: {},
      comparisonObj: {},
      answerObjectsArray: [],
      showHintesObject: {},
    }
  },

  components: {
    IverbsTestFormControl,
    IverbsTestTimer,
    IverbsTestFormAlert,
  },

  mounted: function () {
    this.toCreateStartComparisonObj();
  },

  methods: {
    toCreateStartComparisonObj() {
      for (let k in global.verbForms) {
        this.$set(this.comparisonObj, global.verbForms[k]['var'], null)
      }
    },

    toUpdateAnswerObj(answerObjItem) {
      this.$set(this.answerObj, answerObjItem.var, answerObjItem.val);
    },

    toAnswer() {
      if (Object.keys(this.answerObj).length < this.getVerbFormsAmount) {
        for (let k in this.getVerbForms) {
          let answerItem = this.answerObj[this.getVerbForms[k].var];
          if (!answerItem) {
            this.$set(this.answerObj, this.getVerbForms[k].var, 'timeisup')
          }
        }
      };
      this.comparisonObj = global.toCompareTwoObjects(this.answerObj, this.getCorrectVerb);
      this.answerObjectsArray.push(this.comparisonObj);
    },

    toNext() {
      this.testItemIndex++;
    },

    toResult() {
      this.$store.commit('changeIvTestStatus', 'result');
      this.$store.commit('changeAnswerObjectsArray', this.answerObjectsArray);
    },
  },

  computed: {
    getResetInput() {
      return (+this.testItemIndex === +this.answerObjectsArray.length);
    },

    getAnswerObjectsArrayLength() {
      return this.answerObjectsArray.length;
    },

    getComarisonObj() {
      return this.comparisonObj;
    },

    getIvWorksArray() {
      return this.$store.getters.ivWorkArray;
    },

    getVerbForms() {
      return global.verbForms;
    },

    getVerbFormsAmount() {
      return this.getVerbForms.length;
    },

    getAnswerBtnDisabled() {
      let isEmptyInput = true;
      for (let k in this.answerObj) {
        if (!this.answerObj[k]) {
          isEmptyInput = true
          return true
        } else {
          isEmptyInput = false;
        };
      }
      return (Object.keys(this.answerObj).length < this.getVerbFormsAmount || this.testItemIndex < this.answerObjectsArray.length || isEmptyInput);
    },

    getNextBtnShow() {
      if (this.$store.getters.totalAmount - 1 > this.testItemIndex && this.testItemIndex < this.answerObjectsArray.length) {
        return true;
      } else {
        return false;
      }
    },

    getFormInputDisabled() {
      if (this.testItemIndex < this.answerObjectsArray.length && this.$store.state.ivTestStatus !== 'start') {
        return true;
      }
      return false;
    },

    getCorrectVerb() {
      return this.$store.getters.ivWorkArray[this.testItemIndex]
    },

    getCurNumber() {
      return this.testItemIndex + 1;
    },

    getTotalAmount() {
      return this.$store.getters.totalAmount;
    },

    getResultBtnShow() {
      if (this.testItemIndex === this.$store.getters.totalAmount - 1 && this.testItemIndex < this.answerObjectsArray.length) {
        return true;
      } else {
        return false;
      }
    },

    getAnswerBtnShow() {
      if (this.testItemIndex >= this.answerObjectsArray.length) {
        return true;
      } else {
        return false;
      }
    },

    getTime() {
      let timerVal = this.$store.getters.timerVal;
      return timerVal;
    },

    getTimerStatus() {
      let st = (this.getAnswerObjectsArrayLength === (this.testItemIndex + 1))
      return !st;
    }
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.iv-test-form {
  position: relative;
  display: block;
  width: 100%;

  &__rus {
    display: block;
    margin: 0 auto vh(25);
    font-size: vh(24);
    width: 60%;
    font-weight: 600;
  }

  &__bottom {
    margin: vh(40) auto vh(20);
  }

  &__counter {
    position: absolute;
    left: vh(25);
    top: vh(25);
    font-size: vh(18);
    font-weight: 700;
  }

  &__timer {
    position: absolute;
    display: block;
    right: vh(30);
    top: vh(20);
  }
}
</style>
