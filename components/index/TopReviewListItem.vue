<template lang="pug">
  .reviewWrapper(@click="goDirectSale")
    .content(style="cursor: pointer;") 
      ImgFirebaseLoader(:path="review.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      TopReviewListItemBody(v-if="review" :review="review" :user="user" :directsalename="directsalename")
    //- DirectSaleLikeBtn.like-btn(:directSale="directSale" :btnEnabled="true")
 
</template>

<script>
export default {
  props: ["review", "user", "directsalename"],
  methods: {
    goDirectSale(){
      // console.log(`/directSales/${this.review.directSaleId}`);
      this.$router.push(`/directSales/${this.review.directSaleId}`)
    }
  },
  mounted(){ 
  }
};
</script>

<style lang="scss" scoped>
  .reviewWrapper{
    position: relative;
    width: 23%;
    box-shadow: 1px 0 4px grey;
    border-radius: 1.0rem;
    overflow: hidden;
    margin: 5px;
    .content{
      img{
        width: 100%;
        height: 140px;
      }
    }
  }
</style>

