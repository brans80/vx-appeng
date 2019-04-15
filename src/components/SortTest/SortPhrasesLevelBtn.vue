<template>
<div class="sort-phrases-start__level-btn-wrap" v-bind:class="{'is-active' : getActiveClass}">
  <div class="sort-phrases-start__level-btn" v-on:click="toChangeLevel()">{{getLevel}}</div>
  <h3 class="sort-phrases-start__level-btn-name">{{getLevelName}}</h3>
</div>
</template>

<script>

export default {
  name: 'SortPhrasesLevelBtn',

  props: {
    levelObj: Object,
    curLevel: Number
  },

  data: function () {
    return {

    }
  },

  mounted() {

  },

  components: {

  },

  methods: {
    toChangeLevel() {
      this.$emit('on-change-level', this.getLevel);
    }
  },
  computed: {
    getLevel() {
      return this.levelObj.level
    },
    getLevelName() {
      return this.levelObj.name
    },
    getActiveClass() {
      return (+this.levelObj.level === +this.curLevel);
    }
  },
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

@import '../../scss/_functions.scss';

.sort-phrases-start {

  &__level-btn {
    background: rgba($color-white, 0.6);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: vh(100);
    height: vh(100);
    border-radius: 50%;
    font-size: vh(54);
    font-weight: 600;
    margin: 0 vh(15);
    cursor: pointer;

    &:hover {
      background: rgba($color-white, 0.6);
    }

    .sort-phrases-start__level-btn-wrap.is-active & {
      background: rgba($color-white, 0.8);
      border: 3px solid $color-yellow;
    }
  }

  &__level-btn-name {
    font-size: vh(18);
    text-align: center;
    margin: vh(12) 0 vh(3);
    font-weight: 600;
    color: rgba($color-white,0.9);
  }
}
</style>
