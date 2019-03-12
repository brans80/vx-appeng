<template>
<div class="popup-wrap">
  <div class="popup">
    <span class="popup__close" v-on:click="toChangeShowIvRulesPopup">&times;</span>
    <div class="popup__in">
      <IvRulesBlock></IvRulesBlock>
    </div>
  </div>
</div>
</template>

<script>
import global from './../global.js'
import IvRulesBlock from './../views/IvRulesBlock.vue'

export default {
  name: 'PopUp',
  props: {
    target: String,

  },
  data: function () {
    return {

    }
  },
  components: {
    IvRulesBlock,
  },
  methods: {
    toChangeShowIvRulesPopup() {
      console.log(this.target);
      this.$store.commit('changeShowPopup', {
        target: this.target,
        show: false
      });
    }

  },
  computed: {

  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';

.popup-wrap {
  z-index: 99999;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  background-color: rgba($color-black, 0.7);
}

.popup {
  position: relative;

  width: vh(800);
  max-height: 65%;
  padding: vh(40) vh(15);

  border-radius: vh(7);
  background: $color-white;
  text-align: left;


  &__in {
    position: relative;
    overflow-y: auto;
    max-height: vh(360);
    display: block;
  }



  &__close {
    position: absolute;
    right: vh(11);
    top: vh(10);
    line-height: 0.6;
    font-size: vh(30);
    padding: vh(4);
    cursor: pointer;
    z-index: 99999;
  }


}
</style>
