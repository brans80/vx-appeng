<template>
<div class="iv-test-start">
  <h2 class="iv-test-start__title">
    Выбери уровень сложности:
  </h2>
  <div class="iv-test-start__selectors">
    <div class="iv-test-start__selector-wrap" v-for="levelItem in levels" v-bind:key="levelItem.level">
      <levelBtn v-bind:levelItem="levelItem">
      </levelBtn>
    </div>
  </div>
  <div class="iv-test-start__level-descr">
    {{levelDescr}}
  </div>
  <div class="iv-test-start__start-btn-wrap">
    <button class="btn btn--big" type="button" v-on:click = "toTestForm">
      Пройти тест
    </button>
  </div>
</div>
</template>

<script>
import global from './../global.js'
import LevelBtn from './LevelBtn.vue'

export default {
  name: 'IverbsTestStart',
  props: {

  },
  data: function () {
    return {

    }
  },

  components: {
    LevelBtn,
  },

  methods: {
    toTestForm() {
      this.$store.commit('changeIvWorkArray');
      this.$store.commit('changeIvTestStatus', 'test');

      //this.$emit('on-restart-test');
    }
  },
  computed: {
    levels() {
      return global.levels;
    },

    levelDescr() {
      return this.$store.getters.levelObj.descr;
    },
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.iv-test-start {
  display: block;

  &__title {
    display: block;
    margin: 0 auto vh(20);
    line-height: 1.05;
    font-size: vh(22);
    font-weight: 600;
    text-transform: uppercase;
  }

  &__selectors {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: vh(20);
  }

  &__selector-wrap {
    margin-bottom: vh(12);
    padding: 0 vh(5);
    width: 50%;
  }

  &__level-descr {
    display: block;
    border-radius: vh(5);
    padding: vh(15);
    font-weight: 400;
    font-size: vh(16);
    line-height: 1.5;
    background-color: rgba($color-white, 0.6);
  }

  &__start-btn-wrap {
    display: block;
    margin-top: vh(25);
  }
}
</style>
