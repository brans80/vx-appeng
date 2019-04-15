<template>
<div class="sort-phrases-result">
  <div class="sort-phrases-result__in">
    <h1 class="sort-phrases-result__title">Your result</h1>
    <div class="sort-phrases-result__output-wrap">
      <div class="sort-phrases-result__output-item">
        <b>Всего вопросов: </b><span>{{getTotalQuests}}</span>
      </div>
      <div class="sort-phrases-result__output-item">
        <b>Правильных ответов: </b><span>{{getAmountCorrectAnswers}}</span>
      </div>
    </div>


  </div>
</div>
</template>

<script>

export default {
  name: 'SortPhrasesStart',

  props: {
    answersArr: Array,
  },

  components: {
  },

  data: function () {
    return {
    }
  },

  mounted() {

  },

  methods: {
  
  },

  computed: {
    getTotalQuests() {
      return this.answersArr.length;
    },

    getAmountCorrectAnswers() {
      let count = 0;
      for(let answer of this.answersArr) {
        if(answer === 'success') {
          count ++;
        }
      }

      return count;
    }
  },
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

@import '../../scss/_functions.scss';

.sort-phrases-result {
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

}
</style>
