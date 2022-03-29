<template lang="pug">
  .w-100.text-center.more-btn
    .d-inline.btn(@click="goTo")
      span {{ title }}
      i.material-icons.icon keyboard_arrow_right
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{

    }
  },
  props:['title', 'handler', 'linkTo'],
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    goTo(){
      if (this.linkTo) {
        this.$router.push(this.linkTo);
      } else {
        this.handler();
      }
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .more-btn{
    text-decoration: none;
    .btn{
      padding: 10px 25px;
      color: #9c4925;
      background-color: #dfc29b;
      border: 1px solid #9c4925;
      border-radius: 25px;
      font-weight: 800;
      .icon{
        position: relative;
        top: 6px;
      }
    }
  }
</style>

