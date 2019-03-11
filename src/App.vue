<template>
<div id="app" class="app">
  <div id="nav" class="nav">
    <router-link class="nav__link" to="/">Home</router-link>
    <router-link class="nav__link" to="/IverbsTest">Irregular verbs</router-link>
  </div>
  <router-view />
</div>
</template>

<style lang="scss">
@import 'scss/_variables.scss';

@import 'scss/_functions.scss';

#app {
  // @include mobile {
  //     display: none;
  // }
  position: relative;
  display: block;
  overflow: hidden;
  min-height: 100vh;
  text-align: center;
  color: $color-black;
  background-color: $color-blue;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  padding: vh(18);
  width: 100%;
  background-color: rgba($color-gray, 0.4);

  &__link {
    display: inline-block;
    padding: vh(8) vh(16);
    font-weight: bold;
    font-size: vh(20);
    letter-spacing: 0;
    text-decoration: none;
    text-transform: uppercase;
    color: #fff;

    &.router-link-exact-active {
      color: #ff0;
    }
  }
}

.btn {
  display: inline-block;
  vertical-align: middle;
  border: vh(1) solid $btn-bg-color;
  border-radius: vh(5);
  padding: vh(10) vh(25);
  font-size: vh(16);
  line-height: 1;
  height: vh(40);
  font-weight: 600;
  text-align: center;
  color: $btn-txt-color;
  background-color: $btn-bg-color;
  cursor: pointer;
  user-select: none;

  &:hover {
      color: $btn-bg-color;
      background-color: $btn-txt-color;
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.is-active {
    background: rgba($color-bg-active-btn, 0.65);
    border-color: $color-bg-active-btn;
    pointer-events: none;
  }

  &--level {
    display: block;
    width: 100%;
  }

  &--big {
    padding: vh(13) vh(42);
    height: vh(52);
  }

  &--for-input {
    &::before {
      display: block;
      width: vh(20);
    }
  }

  .iv-test-form-control.is-default & {
    pointer-events: none;

    &::before {
      content: '?';
      color: #fff;
      font-size: vh(20);
      line-height: 1;
    }
  }

  .iv-test-form-control.is-error & {
    background: $color-error;
    border-color: $color-error;

    &::before {
      content: '×';
      color: #fff;
      font-size: vh(28);
      line-height: 0.5;
    } 

    &:hover {
      color: $color-white;
      background: lighten($color-error, 15%);
      border-color: $color-error;
    }
  }

  .iv-test-form-control.is-success & {
    background: rgba($color-success, 1);
    border-color: $color-success;
    pointer-events: none;

    &::before {
      content: '!';
      color: #fff;
      font-size: vh(24);
      line-height: 0.6;
    } 

    &:hover {
      color: $color-white;
      background: lighten($color-success, 15%);
      border-color: $color-success;
    }
  }
}

</style>
