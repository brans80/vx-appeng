<template>
<div class="test-timer" v-on:click="toStopTime">
  <div class="test-timer__val">{{resTime}}</div>
</div>
</template>


<script>
// import global from './../global.js'

export default {
  name: 'IverbsTestTimer',
  props: {
    time: Number,
    startTime: Boolean,
  },
  data: function () {
    return {
      resTime: this.time,
      startStatus: this.startTime,
    }
  },
  components: {
    // SomeComp,
  },

  mounted: function() {
    this.timeInterval = false;
    if(this.startStatus) {
       this.toStartTime();
    }
  },

  methods: {
    toResetTime() {
      this.resTime = this.time;
      this.startStatus = false;
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
      this.startStatus = false;
    },

    toProcessTimeEnd() {
      this.$emit('on-timer-finish');
    }

  },

  computed: {
    getTime() {
      return +this.resTime
    }
  },

  watch: {
    // эта функция запускается при любом изменении вопроса
    startTime: function (newVal, oldVal) {
      console.log('fasertty');
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
  }
}
</style>
