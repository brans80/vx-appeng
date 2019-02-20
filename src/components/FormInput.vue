<template>
<input type="text" class="form-input" v-on:input="toHandleInput($event.target.value)" v-bind:value="val">
</template>

<script>
// import vars from './../vars.js'
// import SomeComp from './SomeComp.vue'

export default {
  name: 'FormInput',
  props: {
    obj: Object,
    resetInput: Boolean,
  },
  data: function () {
    return {
      val: '',
    }
  },
  components: {
    // SomeComp,
  },
  methods: {
    toHandleInput(value) {
      this.val = value;
      this.$emit('on-change-input-val', {
        val: this.val,
        var: this.obj.var
      })
    },
    toResetCurInput() {
      this.val = '';
    }
  },
  computed: {
    getResetInput() {
      return ''
      // if(this.resetInput) {
      //   return ''
      // } else {
      //   return ''
      // };
    }
  },

  watch: {
    resetInput: function () {
      this.toResetCurInput();
    },
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

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
  border: vh(1) solid rgba($color-gray, 0.5);
  border-radius: vh(5);
  transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;

  &:focus {
    outline: none;
    border: vh(1) solid rgba($btn-bg-color, 0.5);
  }

  &:disabled {
    background-color: rgba($color-gray, 0.85);
  }

  .iv-test-form__control.is-error & {
    border: vh(1) solid rgba($color-red, 1);
  }
}
</style>
