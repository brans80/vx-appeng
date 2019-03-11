<template>
<div class="iv-test-form-control" v-bind:class="controlAnswerClass">
  <label for="" class="iv-test-form-control__label">{{verbFormName}}</label>
  <div class="iv-test-form-control__input-wrap">
    <input type="text" class="form-input" v-model="val" v-bind:disabled="getDisabledInput">
    <span class="iv-test-form-control__input-hint" v-show="showHint">{{getCorrectVerb}}</span>
  </div>
  <div class="iv-test-form-control__input-btn-wrap">
    <button type="button" class="btn btn--for-input" v-on:click="toShowHint"></button>
  </div>
</div>
</template>

<script>
import global from './../global.js'

export default {
  name: 'IverbsTestFormControl',
  props: {
    correctVerb: Object,
    verbFormObj: Object,
    comparisonObj: Object,
    resetInput: Boolean,
  },

  data: function () {
    return {
      showHint: false,
      val: '',
    }
  },

  methods: {

    toShowHint() {
      if (!this.getIsError) {
        this.showHint = !this.showHint;
        return this.showHint;
      } else {
        return this.showHint;
      }
    },

    toResetCurInput(newVal, oldVal) {
      this.val = '';
      this.showHint = false;
    },
  },

  computed: {

    verbFormName() {
      return this.verbFormObj.name;
    },

    getCorrectVerb() {
      return this.correctVerb[this.verbFormObj.var];
    },

    getIsError() {
      let curVerbForm = this.verbFormObj.var;
      let curVerbFormComparison = this.comparisonObj[curVerbForm];
      if (curVerbFormComparison === 'success') {
        return true;
      }

      return false;
    },

    getDisabledInput() {
      let curVerbForm = this.verbFormObj.var;
      let curVerbFormComparison = this.comparisonObj[curVerbForm];
      if (curVerbFormComparison === 'success' && !this.resetInput) {
        return true;
      }

      if (curVerbFormComparison === 'error' && !this.resetInput) {
        return true;
      }

      return false;
    },

    controlAnswerClass() {
      let curVerbForm = this.verbFormObj.var;
      let curVerbFormComparison = this.comparisonObj[curVerbForm];
      if (curVerbFormComparison === 'success' && !this.resetInput) {
        return 'is-success';
      }

      if (curVerbFormComparison === 'error' && !this.resetInput) {
        return 'is-error';
      }

      return 'is-default';
    },
  },

  watch: {

    val: function (newVal, oldVal) {
      this.val = newVal;
      let inputRes = {
        val: this.val,
        var: this.verbFormObj.var
      };
      this.$emit('on-change-input-val', inputRes);
    },

    resetInput: function (newVal, oldVal) {
      if (newVal) {
        this.toResetCurInput();
        return true;
      } else {
        return false;
      }
    },
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.iv-test-form-control {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: vh(15);
  width: 100%;

  &__label {
    display: block;
    padding-right: vh(16);
    width: vh(180);
    text-align: right;
    font-size: vh(16);
    font-weight: 600;

    .iv-test-form-control.is-error & {
      color: darken($color-error, 10%);
      font-weight: 600;
    }

    .iv-test-form-control.is-success & {
      color: darken($color-success, 10%);
      font-weight: 600;
    }
  }

  &__input-wrap {
    position: relative;
    width: vh(350);
    overflow: hidden;
    border-top-left-radius: vh(5);
    border-bottom-left-radius: vh(5);
    z-index: 10;
  }

  &__input-hint {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: vh(16);
    background-color: $color-white;
  }

  &__input-btn-wrap {
    margin-left: vh(-6);
    z-index: 11;
  }
}

.form-input {
  display: block;
  width: 100%;
  height: vh(40);
  padding: vh(10) vh(20);
  font-size: vh(16);
  font-weight: 400;
  line-height: 1;
  background-color: #fff;
  background-clip: padding-box;
  border: vh(1) solid lighten($color-gray, 20%);
  box-shadow: inset 0 0 vh(15) lighten($color-gray, 26%);
  border-radius: vh(5);
  transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
  color: $color-black;

  &::placeholder {
    color: $color-gray;
  }

  &:focus {
    outline: none;
    border: vh(1) solid rgba($btn-bg-color, 0.7);
    box-shadow: inset 0 0 vh(12) lighten($color-primary, 20%);

    &::placeholder {
      color: rgba($color-gray, 0);
    }
  }

  &:disabled {
    background-color: lighten($color-gray, 50%);
  }

  .iv-test-form__control.is-error & {
    border: vh(1) solid $color-error;
    box-shadow: inset 0 0 vh(12) lighten($color-error, 20%)
  }

  .iv-test-form__control.is-success & {
    border: vh(1) solid $color-success;
    box-shadow: inset 0 0 vh(12) lighten($color-success, 20%)
  }
}
</style>
