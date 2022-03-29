<template lang="pug">
  .btn.col.d-flex.align-items-center.justify-content-center.like(
    @click="likeOrDislikeDirectSale"
  )
    i.material-icons(
      v-if="directSaleLiked" 
    ) favorite
    i.material-icons(
      v-else
    ) favorite_border
    span.ml-1 {{ numOfLikedUsers }}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      directSaleLiked: false,
      numOfLikedUsers: 0,
    }
  },
  props: ['directSale', 'btnEnabled'],
  computed: {
    ...mapGetters({
      likedDirectSalesIdList: 'currentUser/likedDirectSalesIdList',
    }),
  },
  watch: {
    likedDirectSalesIdList: {
      immediate: true,
      handler(newList, oldList){
        if(this.directSale) this.directSaleLiked = newList.includes(this.directSale.id)
      }
    }
  },
  methods: {
    initialize(){
      if (this.directSale?.metadata?.numOfLikedUsers && this.directSale?.metadata?.numOfLikedUsers > 0) {
        this.numOfLikedUsers = this.directSale?.metadata?.numOfLikedUsers
      } else {
        this.numOfLikedUsers = 0
      }
    },
    async likeOrDislikeDirectSale(){
      if(!this.btnEnabled) return
      if(!this.$checkAuthenticated()){
        return
      }
      if(this.directSaleLiked){
        await this.$store.dispatch('currentUser/likeDirectSaleCancel', this.directSale.id)
        this.numOfLikedUsers--
        return
      }
      await this.$store.dispatch('currentUser/likeDirectSale', this.directSale.id)
      this.numOfLikedUsers++
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
.like{
  width: fit-content;
  color: #E48F82;
}
</style>

