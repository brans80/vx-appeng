<template>
<div class="home" ref='scene' data-friction-y='0'>
  <div class="home__bg" data-depth="0.1" ref='home-bg'></div>
  <div class="home__container" ref='scene2' data-friction-y='0'>
    <div class="home__emblem-wrap" ref='logo' data-depth="0.15">
      <img alt="Vue logo" src="../assets/uk-emblem.png">
    </div>
      <h2 class="home__title" ref='title' data-depth="0.27">Тесты по английскому языку
      </h2>
    </div>
  </div>
</template>

<script>
// import Parallax from 'parallax-js'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  //   components: {
  //     HelloWorld
  //   }
  mounted: function () {

    let scene = this.$refs.scene;
    var parallaxInstance = new this.$Parallax(scene);
    let scene2 = this.$refs.scene2;
    var parallaxInstance2 = new this.$Parallax(scene2);
  },

}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.home {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: $color-white;
  background-position: 0 100%;
  background-size: cover;
  background-repeat: no-repeat;

  &__bg {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    //height: 2500px;
    color: $color-white;
    background-image: url('../assets/img/bg-home.jpg');
    background-position: 0 100%;
    background-size: cover;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    width: 120%;
    height: 100vh;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba($color-black, 0.23);
    }
  }

  &__container {
    margin-top: vh(85);
    z-index: 10;
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__emblem-wrap {
    position: absolute;
    display: block;
    width: 100%;

    img {
      display: block;
      width: vh(450);
      margin: 0 auto;
    }
  }

  &__title {
    font-weight: 800;
    font-size: vh(45);
    letter-spacing: 0.02em;
    text-shadow: vh(1) vh(2) vh(28) $color-black;
    width: 100%;
    text-transform: uppercase;
    margin: vh(320) auto 0;
    position: absolute;
    color: $color-white;
  }

}
</style>
