<template>
<button class = "btn btn--level" v-bind:class = "{'is-active' : isActive}" v-on:click="toClick">
  {{'level: '+levelItem.level+'  _'+levelItem.name}}
</button>
</template>

<script>
export default {
  name: 'LevelBtn',
  props: {
    levelItem: Object,
  },
  data: function () {
    return {
      
    }
  },
  methods: {
    toClick() {
      this.$store.commit('changeLevel', this.levelItem);
    }

  },
  computed: {
    isActive() {
     return ( +this.$store.state.level.level === +this.levelItem.level);
    }
  },
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

@import '../scss/_functions.scss';


</style>
