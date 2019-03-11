<template>
<div class="alert" v-bind:class="getAlertClass" v-show="getShowAlert">{{getAlertText}}</div>
</template>

<script>
import global from './../global.js'

export default {
  name: 'IverbsTestFormAlert',
  props: {
    testItemIndex: Number,
    comparisonObj: Object,
    answerObj: Object,
    answerObjectsArray: Array,
  },

  computed: {
   getVerbForms() {
      return global.verbForms;
    },

    getVerbFormsAmount() {
      return this.getVerbForms.length;
    },

    getShowAlert() {
      if (Object.keys(this.comparisonObj).length < this.getVerbFormsAmount) {
        return false;
      }
      if (Object.keys(this.comparisonObj).length === this.getVerbFormsAmount && this.testItemIndex < this.answerObjectsArray.length) {
        return true;
      }
      return false;
    },

    getAlertText() {
      for (let k in this.comparisonObj) {
        if (this.answerObj[k] === 'timeisup' && this.comparisonObj[k] === 'error') {
          return 'Время истекло. Для просмотра верного ответа кликните по красной кнопке с крестиком, справа от поля ввода. После этого в поле появится верный ответ.';
        }

        if (this.comparisonObj[k] === 'error') {
          return 'Вы ошиблись. Для просмотра верного ответа кликните по красной кнопке с крестиком, справа от поля ввода. После этого в поле появится верный ответ.';
        }
      }
      return 'Отлично! Ответ верный! Можете перейти к следующему глаголу';
    },

    getAlertClass() {
      for (let k in this.comparisonObj) {
        if (this.comparisonObj[k] === 'error') {
          return 'is-error';
        }
      }
      return 'is-success';
    },
  },

  watch: {

  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

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
