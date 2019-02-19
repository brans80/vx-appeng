<template>
<div class="iv-test">
  <div class="iv-test__container">
    <section class="iv-test__start" v-if="testStatusStart">
      <IverbsTestStart>
      </IverbsTestStart>
    </section>

    <section class="iv-test__form" v-if="testStatusForm">
      <div class="iv-test__form-counter">
        <span class="cur-count">
          {{getCurCount}}
        </span>
        <span> / </span>
        <span class="total-count">
          {{getTotalCount}}
        </span>
      </div>
      <h2 class="iv-test__form-rus">
        {{getCorrectVerb.rus}}
      </h2>
      <div class="iv-test__form-control" v-for="verbFormItem in verbForms" v-bind:key="verbFormItem.var">
        <label for="" class="iv-test__form-label">{{verbFormItem.name}}</label>
        <div type="text" class="iv-test__form-input-wrap">
          <FormInput v-bind:resetInput="resetInput" v-bind:disabled="getFormInputDisabled" v-bind:obj="verbFormItem" v-bind:placeholder="verbFormItem.name" v-on:on-change-input-val="toUpdateAnswerObj">
          </FormInput>
        </div>
        <div class="iv-test__form-input-btn-wrap">
          <button type="button" class="btn">click</button>
        </div>
      </div>
      <div class="iv-test__form-bottom">
        <button v-if="getAnswerBtnShow" type="button" class="btn" v-on:click="toAnswer" v-bind:disabled="getAnswerBtnDisabled">Ответить</button>
        <button v-if="getNextBtnShow" type="button" class="btn" v-on:click="toNext">К следующему глаголу</button>
        <button v-if="getResultBtnShow" type="button" class="btn" v-on:click="toResult">Посмотреть результат</button>
      </div>
    </section>

    <section class="iv-test__result-block" v-if="testStatusResult">
      <IverbsTestResult v-bind:resultArray="answerObjectsArray" v-on:on-restart-test="toRestartTest">
      </IverbsTestResult>
    </section>

  </div>
</div>
</template>

<script>
import global from './../global.js'
import IverbsTestStart from './IverbsTestStart.vue'
import FormInput from './FormInput.vue'
import IverbsTestResult from './IverbsTestResult.vue'

export default {
  name: 'IverbsTest',
  props: {

  },
  data: function () {
    return {
      testStatus: 'start',
      answerObj: {},
      answerObjectsArray: [],
      testItemIndex: 0,
      formInputDisabled: false,
      resetInput: false,
    }
  },
  components: {
    IverbsTestStart,
    FormInput,
    IverbsTestResult,
  },
  methods: {
    toUpdateAnswerObj(answerObjItem) {
      this.$set(this.answerObj, answerObjItem.var, answerObjItem.val);
    },

    toAnswer() {
      // console.log(this.answerObj);
      // console.log(this.$store.getters.ivWorkArray);

      let correctAnswerObj = this.$store.getters.ivWorkArray[this.testItemIndex];
      let comparisonObj = global.toCompareTwoObjects(this.answerObj, correctAnswerObj);
      this.answerObjectsArray.push(comparisonObj);

      // console.log(this.answerObjectsArray);
      // console.log(this.testItemIndex + '///' + this.answerObjectsArray.length);

    },

    toResetPrev() {
      this.resetInput = !this.resetInput;
      this.answerObj = {};
    },

    toNext() {
      this.toResetPrev();

      this.testItemIndex++
    },

    toResult() {
     this.$store.commit('changeIvTestStatus', 'result');
    },

    toRestartTest() {
      this.testItemIndex = 0;
       this.resetInput = !this.resetInput;
       this.answerObj = {};
       this.answerObjectsArray = [];
    }

  },
  computed: {
    testStatusForm() {
      return (this.$store.state.ivTestStatus === "test");
    },
    testStatusStart() {
      return (this.$store.state.ivTestStatus === "start");
    },
    testStatusResult() {
      return (this.$store.state.ivTestStatus === "result");
    },
    verbForms() {
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
      if (this.testItemIndex < this.answerObjectsArray.length && this.$store.state.ivTestStatus!=='start') {
        return true;
      };

      return false;
    },

    getCorrectVerb() {
      return this.$store.getters.ivWorkArray[this.testItemIndex]
    },

    getCurCount() {
      return  this.testItemIndex + 1;
    },

    getTotalCount() {
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

.iv-test {
  background-size: vh(318) vh(285);
  background-position: vh(10) vh(10);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../assets/img/bg-test-2.svg');

  &__container {
    position: relative;
    display: block;
    margin: 0 auto;
    margin: 0 auto 0;
    border-radius: vh(10);
    padding: vh(26) vh(28);
    width: 100%;
    width: vh(800);
    height: auto;
    background: rgba($color-white, 0.55);
  }

  &__form {
    position: relative;
    display: block;
    width: 100%;
  }

  &__form-rus {
    display: block;
    margin: 0 auto vh(20);
  }

  &__form-control {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: vh(15);
    width: 100%;
  }

  &__form-label {
    display: block;
    padding-right: vh(16);
    width: vh(180);
    text-align: right;
  }

  &__form-input-wrap {
    width: vh(350);
  }

  &__form-input-btn-wrap {
    margin-left: vh(-6);
  }

  &__form-bottom {
    margin: vh(40) auto vh(20);
  }

  &__form-counter {
    position: absolute;
    left: 0;
    top: 0;
    font-size: vh(16);
    font-weight: 700;
  }
}
</style>
