<template>
<div class="sort-phrase-control">
  <div class="sort-phrase-control__bg"></div>
  <div class="sort-phrase-control__container">
    <SortPhraseItem v-bind:phraseObj="getExtendCurPhraseObj" v-on:on-answer-phrase="toHandleAnswer">
    </SortPhraseItem>

  </div>

</div>
</template>

<script>
import SortPhraseItem from './SortPhraseItem'

export default {
  name: 'SortPhraseControl',

  props: {},

  data: function () {
    return {
      curIndex: 0,
      answerAnswersArr: [],
    }
  },

  components: {
    SortPhraseItem,
  },

  methods: {
    toPlusIndex() {
      if (this.getLockPlusIndex) {
        return false;
      } else {
        this.curIndex++;
      }

    },
    toHandleAnswer(answer) {
      if (!this.getLockPlusIndex) {
        this.answerAnswersArr.push(answer);
        this.toPlusIndex();
        return true;
      }

      this.toSendAnswersArr();
    },

    toSendAnswersArr() {
      this.$emit('on-answer-arr-completed', this.answerAnswersArr)
    },
  },

  computed: {
    getPhraseObjArr() {
      return this.$store.getters.phraseObjArr;
    },
    getCurPhraseObj() {
      if (!this.getLockPlusIndex) {
        return this.getPhraseObjArr[this.curIndex];
      }

      return false;

    },
    getLockPlusIndex() {
      let compare = (this.getPhraseObjArr.length === this.curIndex);
      return compare;
    },
    getSplitEngPhrase() {
      let eng = this.getCurPhraseObj.eng;
      return eng.split(' ');
    },
    getExtendCurPhraseObj() {
      let obj = this.getCurPhraseObj;

      if (obj === false) {
        return {};
      }

      let mixedSplitArr = this.$GF.toMixArray([...this.getSplitEngPhrase]);
      let mixedSplitObjArr = mixedSplitArr.map((val, i) => {
        return {
          val,
          order: i
        }
      })

      this.$set(obj, 'originWordsArr', this.getSplitEngPhrase);
      this.$set(obj, 'mixedWordsObjArr', mixedSplitObjArr);
      return obj;
    },
  },

    watch: {
      curIndex: function (oldIdex, newIndex) {

        if(this.getPhraseObjArr.length === this.curIndex) {
          this.$emit('on-answer-arr-completed', this.answerAnswersArr)
        }
      }
    },
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

@import '../../scss/_functions.scss';

.sort-phrase-control {
  position: relative;
  display: block;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    background-image: url('../../assets/img/oxford.jpg');

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba($color-black, 0.23);
    }
  }

  &__container {
    position: relative;
    display: block;
    z-index: 9999;
  }

  &__rus {
    color: $color-white;
    font-weight: 600;
    font-size: vh(28);
  }

  &__eng {
    display: block;
    color: $color-white;

    &__word {
      position: relative;
      display: inline-block;
      padding: vh(2) vh(3);
      // border: 1px solid $color-white;
      line-height: 1;
      border-radius: vh(3);
      color: $color-white;
      cursor: pointer;
      font-weight: 600;
      letter-spacing: 0.05em;
      font-size: vh(25);
    }
  }
}

.flip-list-move {
  transition: all 0.5s;
}

.no-move {
  transition: all 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
