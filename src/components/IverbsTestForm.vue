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
  <h2 class="iv-test-form__rus">
    {{getCorrectVerb.rus}}
  </h2>

  <div class="iv-test-form__control" v-bind:class="{'is-error': toGetErrorClass(verbFormItem.var)}" v-for="verbFormItem in getVerbForms" v-bind:key="verbFormItem.var">
    <label for="" class="iv-test-form__label">{{verbFormItem.name}}</label>
    <div type="text" class="iv-test-form__input-wrap">
      <FormInput v-bind:disabled="getFormInputDisabled" v-bind:obj="verbFormItem" v-bind:placeholder="verbFormItem.name" v-bind:resetInput="resetInput" v-on:on-change-input-val="toUpdateAnswerObj">
      </FormInput>
    </div>
    <div class="iv-test-form__input-btn-wrap">
      <button type="button" class="btn">click</button>
    </div>

  </div>
  <div class="iv-test-form__bottom">
    <button v-if="getAnswerBtnShow" type="button" class="btn" v-on:click="toAnswer" v-bind:disabled="getAnswerBtnDisabled">Ответить</button>
    <button v-if="getNextBtnShow" type="button" class="btn" v-on:click="toNext">К следующему глаголу</button>
    <button v-if="getResultBtnShow" type="button" class="btn" v-on:click="toResult">Посмотреть результат</button>
  </div>
</div>
</template>

<script>
import global from './../global.js'
import FormInput from './FormInput.vue'

export default {
  name: 'IverbsTestForm',
  props: {

  },
  data: function () {
    return {
      testItemIndex: 0,
      answerObj: {},
      answerObjectsArray: [],
      resetInput: false,

    }
  },
  components: {
    FormInput,
  },

  mounted: function () {

  },

  methods: {
    toUpdateAnswerObj(answerObjItem) {
      this.$set(this.answerObj, answerObjItem.var, answerObjItem.val);
    },

    toAnswer() {
      let correctAnswerObj = this.getIvWorksArray[this.testItemIndex];
      let comparisonObj = global.toCompareTwoObjects(this.answerObj, correctAnswerObj);
      this.answerObjectsArray.push(comparisonObj);

      // console.log(this.testItemIndex + '///' + this.answerObjectsArray.length);
      console.log(this.$store.getters.ivWorkArray);

    },

    toResetPrev() {
      this.resetInput = !this.resetInput;
      this.answerObj = {};

    },

    toResetTestForm() {
      this.testItemIndex = 0;
      this.resetInput = !this.resetInput;
      this.answerObj = {};
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

    toGetErrorClass(curVar) {
      let empty = (Object.keys(this.answerObj).length < 1);
      if (empty) {
        return false
      }
      if (!this.answerObj.curVar) {
        return true
      }

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
      };
    },

    getFormInputDisabled() {
      if (this.testItemIndex < this.answerObjectsArray.length && this.$store.state.ivTestStatus !== 'start') {
        return true;
      };

      return false;
    },

    getCorrectVerb() {
      //return this.$store.getters.ivWorkArray[this.testItemIndex];
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
      };
    },

    getAnswerBtnShow() {
      if (this.testItemIndex >= this.answerObjectsArray.length) {
        return true;
      } else {
        return false;
      };

    },
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
      color: $color-orange;
    }
  }

  &__input-wrap {
    width: vh(350);
  }

  &__input-btn-wrap {
    margin-left: vh(-6);
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
}
</style>
