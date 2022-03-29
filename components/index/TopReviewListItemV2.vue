<template lang="pug">
  .reviewWrapper(@click="goDirectSale")
    .content(style="cursor: pointer;display: flex; flex-direction: column; justify-content: center; background-color: gray; height: 350px;") 
      ImgFirebaseLoader(:path="review.imageStoragePaths[0]" objectFit="cover" :modalDisabled="true")
      TopReviewListItemBodyV2.position-absolute.text-content.w-100(v-if="review" :review="review" :user="user" :directsalename="directsalename")
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
    width: 32%;
    box-shadow: 1px 0 4px grey;
    border-radius: 1.0rem;
    overflow: hidden;
    margin: 5px;
    .content{
      position: relative;
      img{
        width: 100%;
        height: 350px;
      }
      .text-content {
        width: 100%;
        height: 100%;
        left: 0%;
        top: 0%;
      }
    }
  }
</style>

