<template>
<input type="text" class="form-input" v-on:input="toHandleInput($event.target.value)" v-bind:value="val">
</template>

<script>
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
