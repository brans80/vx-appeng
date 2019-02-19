<template>
<div class="iv-test-result">
  <h1 class="iv-test-result__title">
    Результаты теста:
  </h1>
  <div class="iv-test-result__content">
    <div class="iv-test-result__item">
      <span>Задано вопросов: </span>
      <b>{{resultArray.length}}</b>
    </div>
    <div class="iv-test-result__item">
      <span>Правильных ответов: </span>
      <b>{{getAmountCorrect}}</b>
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
      let cnt = 0;
      for (let item of global.toResultTest(this.resultArray)) {
        if (item) {
          cnt++;
        }
      }
      return cnt;
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

  &__item {
    display: block;
    margin-bottom: vh(15);
  }

  &__content {
    margin-bottom: vh(35);
  }
}
</style>
