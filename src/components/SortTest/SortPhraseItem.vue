<template>
<div class="phrase-block">
  <h2 class="phrase-block__rus">
    {{getCurPhraseRus}}
  </h2>
  <Draggable class="phrase-block__eng-wrap" tag="div" v-model="phraseEngSplit" v-bind="dragOptions" v-on:start="isDragging = true" v-on:end="isDragging = false">
    <transition-group name="flip-list" tag="ul" class="phrase-block__eng">
      <li class="phrase-block__eng__word" v-for="element in phraseEngSplit" v-bind:key="element.order">{{ element.val}}
      </li>
    </transition-group>
  </Draggable>

  <button class="btn" v-on:click="toAnswer">
      Ответить
  </button>

</div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
  name: "SortPhraseItem",

  order: 6,
  components: {
    Draggable
  },
  props: {
    phraseObj: Object,

  },
  data() {
    return {
      phraseEngSplit: this.phraseObj.mixedWordsObjArr,
      curPhraseObj: this.phraseObj,
    };
  },

  methods: {

    toAnswer() {
      let comparis;
      if(this.getEmptyCurPhraseObj) {
        comparis = null;
      } else {
        comparis = this.getResultComparison;
      }

      this.$emit('on-answer-phrase', comparis);
      return true;
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },

    getEmptyCurPhraseObj() {
      
     return this.$GF.toCheckEmptyObj(this.getCurPhraseObj)
    },

    getCurPhraseObj() {
      return this.curPhraseObj;
    },

    getCurPhraseRus() {
      return this.getCurPhraseObj.rus;
    },

    getOriginEngWordsArr() {
      return this.getCurPhraseObj.originWordsArr;
    },

    getMixedEngWordsArr() {
      var mixedEngWordsArr = this.phraseEngSplit.map(function (word) {
        return word.val;
      });

      return mixedEngWordsArr;
    },

    getResultComparison() {
      let origArr = this.getOriginEngWordsArr;
      let answerArr = this.getMixedEngWordsArr;
      let comparis = this.$GF.toEqualTwoArrs(origArr, answerArr);
      if(comparis) {
        return 'success';
      }
      return 'error';
    }
  },

  watch: {
    phraseObj: function (newO, oldO) {
      console.log(newO);
      this.phraseEngSplit = newO.mixedWordsObjArr;
      this.curPhraseObj = newO;
    }
  },
};
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

@import '../../scss/_functions.scss';

.phrase-block {
  position: relative;
  display: block;

  .white {
    color: cornsilk;
  }

  &__rus {
    color: $color-white;
    font-size: vh(22);
  }

  &__eng-wrap {
    overflow: hidden;
    background: rgba($color-white, 0.5);
    margin-bottom: vh(20);
  }

  &__eng {
    display: flex;
    justify-content: center;
    align-items: center;

    &__word {
      display: block;
      cursor: move;
      color: white;
      list-style: none;
      padding: vh(3);
      font-size: vh(20);
      font-weight: 700;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
  color: white;
  display: inline-block;
  list-style: none;
  padding: 3px 5px;
}

.list-group-item i {
  cursor: pointer;
}
</style>
