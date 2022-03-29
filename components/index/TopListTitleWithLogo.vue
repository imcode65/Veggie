<template lang="pug">
  .wrapper
    div
      //- img(src="~assets/logo.png")
      img(src="~assets/directSale.jpeg")
    label {{title}}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{

    }
  },
  props:['title'],
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 500px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background: transparent;
  img{
    text-align: center;
    width: 6%;
  }
  label{
    width: 100%;
    font-family: Hiragino Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 1rem;
    // color: #BE9B69;
    color: #212529;
  }
}
@media screen and (max-width: 1023px) {
  .is-pc {
    display: none;
  }
}
</style>

