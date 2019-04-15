<template>
<div class="test-timer" v-bind:class="getWarningClass">
  <div class="test-timer__val">{{resTime}}</div>
</div>
</template>


<script>
import global from './../global.js'

export default {
  name: 'IverbsTestTimer',
  props: {
    time: Number,
    timerStatus: Boolean,
  },
  data: function () {
    return {
      resTime: this.time,
    }
  },
  components: {
    // SomeComp,
  },

  mounted: function() {
    this.timeInterval = false;
    if(this.timerStatus) {
       this.toStartTime();
    }
  },

  methods: {
    toResetTime() {
      this.resTime = this.time;
      this.timerStatus = false;
    },

    toStartTime() {
      this.timeInterval = setInterval(() => {
        if(+this.resTime === 0) {
          this.toProcessTimeEnd();
          clearInterval(this.timeInterval);
          return false;
        }
        this.resTime --;
      }, 1000);
    },

    toStopTime() {
      clearInterval(this.timeInterval);
    },

    toProcessTimeEnd() {
      this.$emit('on-timer-finish');
    }

  },

  computed: {
    getTime() {
      return +this.resTime;
    },

    getVerbForms() {
      return global.verbForms;
    },

    getWarningClass() {
      let k = this.resTime / this.time;
      if(k <= 0.5 && k > 0.25) {
        return 'is-danger-1'
      }

      if(k <= 0.25) {
        return 'is-danger-2'
      }

      return 'is-default'
    },
  },

  watch: {
    timerStatus: function (newVal, oldVal) {
      this.toStopTime();
    }
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.test-timer {
  position: relative;
  padding: vh(2);
  background-color: $color-white;
  border-radius: 50%;

  &__val {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0.2;
    font-size: vh(18);
    font-weight: 700;
    border: 2px solid $color-green;
    width: vh(40);
    height: vh(40);
    border-radius: 50%;
    color: $color-green;
    transition: all 0.2s linear;

    .is-danger-1 & {
        border: 2px solid $color-yellow;
        color: $color-yellow;
    }

    .is-danger-2 & {
        border: 2px solid $color-error;
        color: $color-error;
    }
  }
}
</style>
