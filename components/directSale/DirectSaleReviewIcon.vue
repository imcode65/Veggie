<template lang="pug">
  .review
    i.time-icon.material-icons.icon comment
    span.ml-1(v-if="directSale") {{ directSale.metadata.numOfReviews && directSale.metadata.numOfReviews > 0 ? directSale.metadata.numOfReviews : 0 }}

</template>                               

<script>
import {mapGetters} from 'vuex'

export default {
  data(){　
    return{
    }
  },
  props: ['directSale'],
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  .review{
    position: absolute;
    bottom: 15px;
    right: 70px;
    width: 50px;
    // .icon{
    //   position: absolute;
    //   left: 0;
    //   color: #be9b69;
    // }
    // span{
    //   float: right;
    //   color: #8E8E8E
    // }
  }
</style>

