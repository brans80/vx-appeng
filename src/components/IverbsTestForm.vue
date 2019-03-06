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
    <IverbsTestTimer v-bind:time="getTime" v-bind:startTime="getStartTimer" v-on:on-timer-finish="toForceAnswer">
    </IverbsTestTimer>
  </div>
  <h2 class="iv-test-form__rus">
    {{getCorrectVerb.rus}}
  </h2>

  <div class="iv-test-form__control" v-bind:class="[comparisonObj, verbFormItem]|getInputClass" v-for="verbFormItem in getVerbForms" v-bind:key="verbFormItem.var">
    <label for="" class="iv-test-form__label">{{verbFormItem.name}}</label>
    <div type="text" class="iv-test-form__input-wrap">
      <FormInput v-bind:disabled="getFormInputDisabled" v-bind:obj="verbFormItem" v-bind:placeholder="verbFormItem.name" v-bind:resetInput="resetInput" v-on:on-change-input-val="toUpdateAnswerObj">
      </FormInput>
      <span class="iv-test-form__input-hint" v-if="showHintesObject[verbFormItem.var]">
        <b>{{getCorrectVerb[verbFormItem.var]}}</b>
      </span>
    </div>
    <div class="iv-test-form__input-btn-wrap">
      <button type="button" class="btn btn--for-input" v-on:click="toShowHint(verbFormItem.var)"></button>
    </div>
  </div>
  <div class="iv-test-form__bottom">
    <button v-if="getAnswerBtnShow" type="button" class="btn" v-on:click="toAnswer" v-bind:disabled="getAnswerBtnDisabled">Ответить</button>
    <button v-if="getNextBtnShow" type="button" class="btn" v-on:click="toNext">К следующему глаголу</button>
    <button v-if="getResultBtnShow" type="button" class="btn" v-on:click="toResult">Посмотреть результат</button>
    <div class="alert" v-bind:class="getAlertClass" v-show="getShowAlert">{{getAlertText}}</div>
  </div>
</div>
</template>

<script>
import global from './../global.js'
import FormInput from './FormInput.vue'
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
      resetInput: false,
      showHintesObject: {},
    }
  },

  components: {
    FormInput,
    IverbsTestTimer
  },

  mounted: function () {

    this.toCreateShowHintesObject();
  },

  methods: {
    toCreateShowHintesObject() {
      for (let item of global.verbForms) {
        let itemVar = item.var;

        this.$set(this.showHintesObject, itemVar, false)
      }
    },
    toUpdateAnswerObj(answerObjItem) {
      this.$set(this.answerObj, answerObjItem.var, answerObjItem.val);
    },

    toForceCreateAnswerObj() {
      for (let k in global.verbForms) {
        global.verbForms[k].var
        this.$set(this.answerObj, global.verbForms[k].var, 'time is over');
      }
    },

    toAnswer() {
      let correctAnswerObj = this.getIvWorksArray[this.testItemIndex];
      this.comparisonObj = global.toCompareTwoObjects(this.answerObj, correctAnswerObj);
      this.answerObjectsArray.push(this.comparisonObj);
    },

    toForceAnswer() {
      this.toForceCreateAnswerObj();
      this.toAnswer();
    },

    toResetPrev() {
      this.resetInput = !this.resetInput;
      this.answerObj = {};
      this.comparisonObj = {};
      this.toCreateShowHintesObject();
    },

    toResetTestForm() {
      this.testItemIndex = 0;
      this.resetInput = !this.resetInput;
      this.answerObj = {};
      this.comparisonObj = {};
      this.answerObjectsArray = [];
    },

    toNext() {
      this.toResetPrev();
      this.testItemIndex++;
    },

    toResult() {
      this.$store.commit('changeIvTestStatus', 'result');
      this.$store.commit('changeAnswerObjectsArray', this.answerObjectsArray);
    },

    toShowHint(verbFormItemVar) {
      if (Object.keys(this.comparisonObj).length !== 3) {
        return false;
      }

      let curComparRes = this.comparisonObj[verbFormItemVar];

      if (curComparRes) {
        return true;
      }

      this.showHintesObject[verbFormItemVar] = !this.showHintesObject[verbFormItemVar];
    },
  },

  filters: {
    getInputClass(arr) {
      let comparisonObj = arr[0];
      let verbForm = arr[1].var;

      if (Object.keys(comparisonObj).length !== 3) {
        return 'is-default';
      }

      if (comparisonObj[verbForm]) {
        return 'is-success';
      }

      if (!comparisonObj[verbForm]) {
        return 'is-error';
      }

      return 'is-default';
    },

    getHintShow(verbForm) {
      return this.showHintesObject[verbForm];
    },
  },

  computed: {
    getIvWorksArray() {
      return this.$store.getters.ivWorkArray;
    },

    getVerbForms() {
      return global.verbForms;
    },

    getAnswerBtnDisabled() {
      return (Object.keys(this.answerObj).length < 3 || this.testItemIndex < this.answerObjectsArray.length);
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
      return this.$store.state.ivWorkArray[this.testItemIndex]
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

    getShowAlert() {
      if (Object.keys(this.comparisonObj).length < 3) {
        return false;
      }
      if (Object.keys(this.comparisonObj).length === 3 && this.testItemIndex < this.answerObjectsArray.length) {
        return true;
      }
      return false;
    },

    getAlertText() {
      for (let k in this.answerObj) {
        if (this.comparisonObj[k] === false) {
          return 'Вы ошиблись. для просмотра верного ответа кликните по красной кнопке с крестиком, справа от поля ввода. После этого в поле появится верный ответ.';
        }
      }
      return 'Отлично! Ответ верный! Можете перейти к следующему глаголу';
    },

    getAlertClass() {
      for (let k in this.answerObj) {
        if (this.comparisonObj[k] === false) {
          return 'is-error';
        }
      }
      return 'is-success';
    },

    getTime() {
      let timerVal = this.$store.getters.timerVal;
      return timerVal;
    },

    getStartTimer() {
      return this.$store.getters.timerStart;
    }
  },

  watch: {
    answerObj: function (newVal, oldVal) {
      ///////////////
    }
  }
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
    margin: 0 auto vh(22);
    font-size: vh(24);
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: vh(15);
    width: 100%;
  }

  &__label {
    display: block;
    padding-right: vh(16);
    width: vh(180);
    text-align: right;
    font-size: vh(16);
    font-weight: 600;

    .iv-test-form__control.is-error & {
      color: darken($color-error, 10%);
      font-weight: 600;
    }

    .iv-test-form__control.is-success & {
      color: darken($color-success, 10%);
      font-weight: 600;
    }
  }

  &__input-wrap {
    position: relative;
    width: vh(350);
    overflow: hidden;
    border-top-left-radius: vh(5);
    border-bottom-left-radius: vh(5);
    z-index: 10;
  }

  &__input-hint {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: vh(16);
    background-color: $color-white;
  }

  &__input-btn-wrap {
    margin-left: vh(-6);
    z-index: 11;
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

.alert {
  width: 80%;
  margin: vh(35) auto 0;
  font-size: vh(14);
  font-weight: 600;
  background: rgba($color-white, 0.7);
  border-radius: vh(6);
  padding: vh(5) vh(18);

  &.is-error {
    color: $color-error;
  }

  &.is-success {
    color: darken($color-success, 9%)
  }
}
</style>
