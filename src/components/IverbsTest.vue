<template>
<div class="iv-test">
  <div class="iv-test__container">

    <section class="iv-test__start" v-if="testStatusStart">
      <IverbsTestStart>
      </IverbsTestStart>
    </section>

    <section class="iv-test__form" v-if="testStatusForm">
      <IverbsTestForm></IverbsTestForm>
    </section>

    <section class="iv-test__result-block" v-if="testStatusResult">
      <IverbsTestResult>
      </IverbsTestResult>
    </section>

  </div>
  <PopUp v-show="getIvRulesTestPopupShow" ref='ivRulesTest' v-bind:target="'ivRulesTest'">

  </PopUp>
</div>
</template>

<script>
import global from './../global.js'
import IverbsTestStart from './IverbsTestStart.vue'
import IverbsTestForm from './IverbsTestForm.vue'
import IverbsTestResult from './IverbsTestResult.vue'
import PopUp from './PopUp.vue'

export default {
  name: 'IverbsTest',
  props: {
  },

  data: function () {
    return {
      testStatus: 'start',
    }
  },

  components: {
    IverbsTestStart,
    IverbsTestForm,
    IverbsTestResult,
    PopUp,
  },

  methods: {

  },
  computed: {
    testStatusForm() {
      return (this.$store.state.ivTestStatus === "test");
    },
    testStatusStart() {
      return (this.$store.state.ivTestStatus === "start");
    },
    testStatusResult() {
      return (this.$store.state.ivTestStatus === "result");
    },
    getIvRulesTestPopupShow() {
      return this.$store.getters.popupsShow['ivRulesTest'];
    }

  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.iv-test {
  background-size: vh(318) vh(285);
  background-position: vh(10) vh(10);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../assets/img/bg-test-2.svg');

  &__container {
    position: relative;
    display: block;
    margin: 0 auto;
    margin: 0 auto 0;
    border-radius: vh(10);
    padding: vh(26) vh(28);
    width: 100%;
    width: vh(800);
    height: auto;
    background: rgba($color-white, 0.55);
  }
}
</style>
