<template>
<div class="sort-phrases-page">
  <SortPhrasesStart v-if="getStartScreenShow" v-on:on-start-sort-test="toStartSortTest"></SortPhrasesStart>
  <SortPhrasesControl v-if="getControlScreenShow" v-on:on-answer-arr-completed="toResult"></SortPhrasesControl>
  <SortPhrasesResult v-bind:answersArr="answersArr" v-if="getResultScreenShow"></SortPhrasesResult>
  
</div>
</template>

<script>
import SortPhrasesStart from './SortPhrasesStart'
import SortPhrasesControl from './SortPhrasesControl'
import SortPhrasesResult from './SortPhrasesResult'

export default {
  name: 'SortPhrasesPage',

  props: {

  },

  data: function () {
    return {
      status: 'start',
      answersArr: [],

    }
  },

  components: {
    SortPhrasesStart,
    SortPhrasesControl,
    SortPhrasesResult
  },

  methods: {

    toStartSortTest(obj) {
      this.phrasesObjArr = obj.selectedPhrasesByLevel;
      this.status = 'control'; 
    },

    toResult(answersArr) {
      
      this.status = 'result';
      this.answersArr = answersArr;
      console.log(this.answersArr);
    }
   
  },
  computed: {
    getStartScreenShow() {
      return (this.status === 'start')     
    },
    getControlScreenShow() {
      return (this.status === 'control')     
    },
    getResultScreenShow() {
      return (this.status === 'result')     
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

@import '../../scss/_functions.scss';

.sort-phrases-page {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

</style>
