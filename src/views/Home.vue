<template>
<div class="home">
  <div class="home__container">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2 class="home__title">Тесты по английскому языку</h2>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  //   components: {
  //     HelloWorld
  //   }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.home {
  position: relative;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: $color-white;
  background-image: url('../assets/img/bg-home.jpg');
  background-position: 0 100%;
  background-size: cover;
  background-repeat: no-repeat;

  &__container {
    z-index: 10;
    display: block;
  }

  &__title {
    
    font-weight: 600;
    font-size: vw(40);
    letter-spacing: 0.05em;
    text-shadow: 1px 1px 3px $color-black;
  }

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
</style>
