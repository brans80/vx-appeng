<template>
<div class="iv-test-result">
  <h1 class="iv-test-result__title">
    Результаты теста:
  </h1>
  <div class="iv-test-result__content">
    <div class="iv-test-result__item">
      <span>Задано вопросов: </span>
      <b>{{getTotalAmount}}</b>
    </div>
    <div class="iv-test-result__item">
      <span>Правильных ответов: </span>
      <b>{{getAmountCorrect}}</b>
    </div>
    <div class="iv-test-result__item">
      <span>Процент правильных ответов: </span>
      <b>{{getPercentCorrectAnswers + '%'}}</b>
    </div>
    <div class="iv-test-result__item.grade-mod">
      <b>{{getTestResultGrade}}</b>
    </div>
  </div>
  <div class="iv-test-result__restart-block">
    <button type="button" class="btn" v-on:click="toRestartTest">
        Рестарт теста
    </button>
  </div>
</div>
</template>

<script>
import global from './../global.js'

export default {
  name: 'IverbsTestResult',
  props: {
    resultArray: Array,
  },
  data: function () {
    return {

    }
  },
  components: {
    // SomeComp,
  },
  methods: {
    toRestartTest() {
      this.$store.commit('changeIvTestStatus', 'start');
      this.$store.commit('changeIvWorkArray', false);
      this.$emit('on-restart-test');
    }

  },
  computed: {
    getAmountCorrect() {
      return this.$store.getters.testCorrectResult;
    },

    getTotalAmount() {
      return this.$store.getters.totalAmount;
    },

    getPercentCorrectAnswers() {
      let correctPercent = (this.getAmountCorrect / this.getTotalAmount) * 100;
      return correctPercent.toFixed(1);
    },

    getTestResultGrade() {
      let grade = false;
      let percentCorrectAnswers = (this.getAmountCorrect / this.getTotalAmount) * 100;
      if (percentCorrectAnswers >= 97) {
        grade = 'Отлично!'
      };
      if (percentCorrectAnswers >= 92 && percentCorrectAnswers < 97) {
        grade = 'Очень хорошо!'
      };
      if (percentCorrectAnswers >= 87 && percentCorrectAnswers < 92) {
        grade = 'Хорошо!'
      };

      if (percentCorrectAnswers >= 81 && percentCorrectAnswers < 87) {
        grade = 'Так себе, можно и лучше!'
      };

      if (percentCorrectAnswers >= 71 && percentCorrectAnswers < 81) {
        grade = 'Плохо, нужно больше учиться!'
      };

      if (percentCorrectAnswers >= 61 && percentCorrectAnswers < 71) {
        grade = 'Очень плохо, нужно больше учиться!'
      };

      if (percentCorrectAnswers < 61) {
        grade = 'Отвратительно! Это никуда не годится! Учиться и еще раз учиться!'
      };
      return grade;
    }
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.iv-test-result {
  display: block;
  margin-bottom: vh(30);

  &__title {
    font-size: vh(24);
    margin-top: vh(20);
    margin-bottom: vh(32);
    line-height: 1.1;
  }

  &__item {
    display: block;
    margin-bottom: vh(15);
    font-size: vh(16);
  }

  &__content {
    margin-bottom: vh(35);
  }
}
</style>
