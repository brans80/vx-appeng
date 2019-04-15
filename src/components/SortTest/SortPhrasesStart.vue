<template>
<div class="sort-phrases-start">
  <div class="sort-phrases-start__in">
    <h1 class="sort-phrases-start__title">Start</h1>
    <div class="sort-phrases-start__level-buttons">
      <div class="sort-phrases-start__level-buttons__in">
        <SortPhrasesLevelBtn v-bind:levelObj="levelObj" v-bind:curLevel="curLevel" v-for="levelObj in getLevelObjsArr" v-bind:key="levelObj.level" v-on:on-change-level="toChangeLevel"></SortPhrasesLevelBtn>
      </div>
    </div>
    <div class="sort-phrases-start__level-descr">{{getLevelDescr}}</div>
    <div class="sort-phrases-start__start-btn-wrap">
      <button class="btn btn--white-mod" v-on:click="toStartTest">
        to test
      </button>
    </div>

  </div>
</div>
</template>

<script>
import SortPhrasesLevelBtn from './SortPhrasesLevelBtn'

export default {
  name: 'SortPhrasesStart',

  props: {},

  components: {
    SortPhrasesLevelBtn,
  },

  data: function () {
    return {
      curLevel: 1,
    }
  },

  mounted() {
    let arr = [{
        id: 1,
        level: 5,
      },
      {
        id: 2,
        level: 5,
      },
      {
        id: 3,
        level: 75,
      },
      {
        id: 4,
        level: 8,
      },
    ]
  },

  methods: {
    toChangeLevel(newLevel) {
      this.curLevel = newLevel;
    },

    toStartTest() {
      let obj = {
        selectedPhrasesByLevel: this.getSelectedPhrasesByLevel,
        curLevel: this.curLevel,

      }
      this.$emit('on-start-sort-test', obj);
    }
  },

  computed: {

    getLevelObjsArr() {
      return this.$GV.phrasesSortLevels;
    },
    getCurLevelObj() {
      let filteredLevelObjsArr = this.$GF.toFilterArrByObjParam(this.getLevelObjsArr, 'level', this.curLevel);
      if (filteredLevelObjsArr.length === 1) {
        return filteredLevelObjsArr[0];
      } else {
        return false;
      }

    },
    getLevelDescr() {
      return this.getCurLevelObj.descr;
    },
    getPhrasesArr() {
      return this.$GV.phrases;
    },

    getActualLevels() {
      let curComp = this;
      let arr = this.getLevelObjsArr.map(function (obj) {
        if (+obj.level <= curComp.curLevel) {
          return obj.level;
        };
      });

      return arr.filter(function (item) {
        if (+item >= 0) {
          return item;
        }
      });
    },

    getSelectedPhrasesByLevel() {
      let curComp = this;
      return this.$GF.toFilterArrByObjParam(this.getPhrasesArr, 'level', curComp.getActualLevels);
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

@import '../../scss/_functions.scss';

.sort-phrases-start {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;

  &__title {
    position: relative;
    font-size: vh(60);
    width: 100%;
    margin: 0 auto vh(20);
  }

  &__level-buttons {
    margin: vh(35);

    &__in {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

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
  }

  &__level-descr {
    font-size: vh(24);
    line-height: 1.2;
    margin: 0 auto vh(40);
    width: 75%;
  }
}
</style>
