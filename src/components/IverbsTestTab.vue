<template>
<div class="iv-test-tab">
  <span class="iv-test-tab__close" v-on:click="toClose"><span>&times;</span></span>

  <div class="iv-test-tab__grid">
    <div class="iv-test-tab__grid-row top-mod">
      <div class="iv-test-tab__grid-col rus-mod">rus</div>
      <div class="iv-test-tab__grid-col infinitive-mod">infinitive</div>
      <div class="iv-test-tab__grid-col past-simple-mod">past simple</div>
      <div class="iv-test-tab__grid-col past-participle-mod">past participle</div>
    </div>
    <div class="iv-test-tab__grid-row" v-for="verb in getBasicVerbsList" v-bind:key="verb.id">
      <div class="iv-test-tab__grid-col rus-mod"><span>{{verb.rus}}</span></div>
      <div class="iv-test-tab__grid-col infinitive-mod"><span>{{verb.infinitive}}</span></div>
      <div class="iv-test-tab__grid-col past-simple-mod"><span>{{verb.pastSimple}}</span></div>
      <div class="iv-test-tab__grid-col past-participle-mod"><span>{{verb.pastParticiple}}</span></div>
    </div>

  </div>

</div>
</template>

<script>
import global from './../global.js'
// import LevelBtn from './LevelBtn.vue'

export default {
  name: 'IverbsTestTab',
  props: {

  },
  data: function () {
    return {

    }
  },

  components: {},

  methods: {
    toClose() {
      this.$store.commit('changeIvTestStatus', 'start');
    },
  },
  computed: {
    getBasicVerbsList() {
      return this.$store.getters.basicVerbsList;
    }

  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.iv-test-tab {
  display: block;
  margin: 0 auto vh(15);

  &__close {
    position: absolute;
    display: flex;
    font-size: vmin(19);
    line-height: 0.1;
    cursor: pointer;
    background-color: $color-error;
    justify-content: center;
    align-items: center;
    width: vh(36);
    height: vh(36);
    border-radius: 50%;
    color: $color-white;
    right: vh(-5);
    top: vh(-5);
  }

  &__grid {
    display: block;
    max-height: vh(425);
    overflow-y: auto;
    font-size: vh(16);
    line-height: 1.3;
  }

  &__grid-row {
    display: flex;
    border-bottom: 1px solid $color-gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &.top-mod {
      border-top: 1px solid $color-gray;
      font-weight: 600;
      background-color: $color-yellow;
    }
  }

  &__grid-col {
    padding: vh(8) vh(4);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-white, 0.5);

    span {
      display: block;
    }

    &.rus-mod {
      width: 37%;
      border-left: 1px solid $color-gray;
      border-right: 1px solid $color-gray;
    }

    &.infinitive-mod {
      width: 21%;
      border-right: 1px solid $color-gray;
    }

    &.past-simple-mod {
      width: 21%;
      border-right: 1px solid $color-gray;
    }

    &.past-participle-mod {
      width: 21%;
      border-right: 1px solid $color-gray;
    }
  }

}
</style>
